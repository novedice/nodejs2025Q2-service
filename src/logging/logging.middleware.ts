import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, body, query, headers } = req;
    const startDate = new Date().toISOString();
    res.on('finish', () => {
      if (
        res.statusCode.toString().startsWith('4') ||
        res.statusCode.toString().startsWith('5')
      ) {
        this.loggingService.error(`${startDate} ERROR HTTP ${method} ${baseUrl}
headers=${JSON.stringify(headers)} 
body=${JSON.stringify(body)} 
${query ? JSON.stringify(query) : ''}
${new Date().toISOString()} ERROR Response ${res.statusCode} ${baseUrl} ${res.statusMessage}
          `);
      } else {
        this.loggingService.log(`${startDate} LOG HTTP ${method} ${baseUrl} 
headers=${JSON.stringify(headers)} 
body=${JSON.stringify(body)} 
${query ? JSON.stringify(query) : ''}
${new Date().toISOString()} LOG Response ${res.statusCode} ${baseUrl}`);
      }
    });
    next();
  }
}
