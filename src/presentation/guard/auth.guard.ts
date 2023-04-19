import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_SECRET } from 'src/config/environments/authentication';
import { Request } from 'express';
import { Authorized } from './authorized';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  requirements: string[] = [];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    this.requirements = this.reflector.get(
      'requirements',
      context.getHandler(),
    );

    let roles: string[] = [];

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: TOKEN_SECRET,
      });

      request.authorized = new Authorized({
        id: Number(payload.sub),
        roles: payload.roles,
      });

      roles = payload.roles;
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    if (
      this.requirements.length &&
      roles.every((role) =>
        this.requirements.every((required) => required !== role),
      )
    ) {
      throw new HttpException(
        'Permissão invalida para este recurso.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
