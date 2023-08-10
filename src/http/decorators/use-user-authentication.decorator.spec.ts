import { UseUserAuthentication } from './use-user-authentication.decorator';

describe(UseUserAuthentication.name, () => {
  it('should be function', () => {
    expect(UseUserAuthentication()).toBeInstanceOf(Function);
  });
});
