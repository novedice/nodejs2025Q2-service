import { Injectable } from '@nestjs/common';
import fs from 'node:fs';

@Injectable()
export class LoggingService {
  private loggingFile = 'logs/app.log';
  private logLevel = process.env.LOG_LEVEL ?? 'INFO';

  private writeLog(message: string) {
    fs.appendFile(this.loggingFile, message, 'utf8', (err) => {
      if (err) console.log(err);
    });
  }
}
