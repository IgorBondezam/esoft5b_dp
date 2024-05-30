import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class MultiplyValueMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        req.body.value *= 1.25;
        next();
    }
}
