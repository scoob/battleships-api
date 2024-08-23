import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // log request
    Logger.log(`___Request___`);
    Logger.log(`Method: ${req.method}`);
    Logger.log(`Path: ${req.path}`);
    Logger.log(`Host: ${req.hostname}`);
    Logger.log(`IP: ${req.ip}`);
    Logger.log(`User-Agent: ${req.get('user-agent')}`);
    Logger.log(`Body: ${JSON.stringify(req.body)}`);
    Logger.log(`Query: ${JSON.stringify(req.query)}`);
    Logger.log(`Params: ${JSON.stringify(req.params)}`);
    Logger.log(`Headers: ${JSON.stringify(req.headers)}`);
    Logger.log(`___End Request`);

    // log response
    res.on('finish', () => {
      Logger.log(`___Response___`);
      Logger.log(`Status: ${res.statusCode}`);
      Logger.log(`Response: ${res.statusMessage}`);
      Logger.log(`___End Response___`);
    });
    next();
  }
}
