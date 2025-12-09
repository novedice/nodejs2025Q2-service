import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { decodedToken } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(req: Request) {
    console.log('req url', req.url);
    if (req.url.startsWith('/auth')) {
      return true;
    }
    console.log('request:', req.body, req.headers);
    const authHead = req.headers['authorization'];
    if (!authHead)
      throw new UnauthorizedException(
        'Authorization header in the request is absent',
      );
    const bearer = authHead.split(' ')[0];
    const token = authHead.split(' ')[1];
    if (bearer !== 'Bearer') throw new UnauthorizedException('Invalid scheme');
    if (!token)
      throw new UnauthorizedException(
        'Authorization header in the request is invalid',
      );
    try {
      const verification = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
      ) as unknown as decodedToken;
      console.log('verification:', verification);
      if (verification.exp * 1000 < Date.now())
        throw new UnauthorizedException('Token is expired');
      return true;
    } catch {
      throw new UnauthorizedException('JWT token is invalid');
    }
  }
  // }
}
