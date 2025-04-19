/* eslint-disable */
export class UserSevice {
  @logResult
  updateUser(): string {
    const result = 'test';
    return result;
  }
}

function logResult(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    console.log('Updated user result', result);
    return result;
  };

  return descriptor;
}

const user = new UserSevice();
user.updateUser();
