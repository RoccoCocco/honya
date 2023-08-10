import { Test } from '@nestjs/testing';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from '@/usecase';

const AuthenticationServiceMock = {
  verify: jest.fn(),
};

const getRequest = jest.fn();
const ExecutionContextMock = {
  switchToHttp() {
    return { getRequest };
  },
} as unknown as ExecutionContext;

describe(AuthenticationGuard.name, () => {
  let service: AuthenticationGuard;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: AuthenticationServiceMock },
        AuthenticationGuard,
      ],
    }).compile();

    service = moduleRef.get<AuthenticationGuard>(AuthenticationGuard);
  });

  describe('canActivate', () => {
    it('should throw if no auth header', async () => {
      getRequest.mockReturnValueOnce({ headers: {} });
      await expect(() =>
        service.canActivate(ExecutionContextMock),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw if not bearer', async () => {
      getRequest.mockReturnValueOnce({
        headers: { authorization: 'NotBearer ..' },
      });
      await expect(() =>
        service.canActivate(ExecutionContextMock),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw if verification fails', async () => {
      AuthenticationServiceMock.verify.mockRejectedValueOnce(new Error());
      getRequest.mockReturnValueOnce({
        headers: { authorization: 'Bearer ...' },
      });
      await expect(() =>
        service.canActivate(ExecutionContextMock),
      ).rejects.toThrowError(UnauthorizedException);
      expect(AuthenticationServiceMock.verify).toHaveBeenCalled();
    });

    it('should allow and assign to request', async () => {
      const verifyMockData = { dummy: true };
      const requestMockData = {
        headers: { authorization: 'Bearer ...' },
      };

      getRequest.mockReturnValueOnce(requestMockData);
      AuthenticationServiceMock.verify.mockResolvedValueOnce(verifyMockData);

      expect(await service.canActivate(ExecutionContextMock)).toBe(true);
      expect(AuthenticationServiceMock.verify).toHaveBeenCalled();
      expect(requestMockData).toStrictEqual({
        ...requestMockData,
        user: verifyMockData,
      });
    });
  });
});
