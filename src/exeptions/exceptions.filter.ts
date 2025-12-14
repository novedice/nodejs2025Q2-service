import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const date = new Date().toISOString();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;

      if (status >= 500) {
        this.loggingService.error(
          `${date} ${req.method} ${req.url} → ${status} | ${message}`,
        );
      } else {
        this.loggingService.warn(
          `${date} ${req.method} ${req.url} → ${status} | ${message}`,
        );
      }
    } else {
      this.loggingService.fatal(
        `${date} ${req.method} ${req.url} → 500 | ${(exception as Error)?.stack}`,
      );
    }

    res.status(status).json({
      statusCode: status,
      message,
      date,
      path: req.url,
    });
  }
}
