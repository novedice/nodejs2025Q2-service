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
    const status = exception.getStatus();
    const message = exception.message;
    const date = new Date().toISOString();

    if (exception instanceof HttpException) {
      this.loggingService.error(
        `${date} ${req.method} ${req.url} → ${status} | ${exception.message}`,
      );
    }

    if (!(exception instanceof HttpException)) {
      this.loggingService.fatal((exception as Error).stack ?? '');
    }

    res.status(status).json({
      statusCode: status,
      message,
      date,
      path: req.url,
    });
  }
}
