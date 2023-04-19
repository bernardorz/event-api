import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Authorized } from './authorized';
import { Request } from './request';

export const ROLES_KEY = 'roles';

export type ROLE_INITIAL = 'MANAGER' | 'ADM' | 'USER';

export const Authorize = (requirements: string[]) =>
  SetMetadata('requirements', requirements);

export const Session = createParamDecorator(
  (data: unknown, context: ExecutionContext): Authorized | undefined => {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    return request.authorized;
  },
);
