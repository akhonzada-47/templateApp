import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (!request.user) {
    throw new InternalServerErrorException(
      'GetUser decorator cannot be used in public routes',
    );
  }
  return request.user;
});
