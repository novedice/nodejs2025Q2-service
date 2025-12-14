import { Injectable, LoggerService } from '@nestjs/common';
// import { PathLike } from 'fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
// import { incrementFilename } from 'src/utils/incrementFilename';

@Injectable()
export class LoggingService implements LoggerService {
  private loggingFileInit = 'applogs.txt';
  private loggingFile = this.loggingFileInit;
  private logIndex = 0;
  private logLevel = process.env.LOG_LEVEL ?? 'log';

  async log(message: string) {
    if (this.shouldWrite('log')) await this.writeLog(message);
  }

  async debug(message: string) {
    if (this.shouldWrite('debug')) await this.writeLog(message);
  }

  async warn(message: string) {
    if (this.shouldWrite('warn')) await this.writeLog(message);
  }

  async error(message: string) {
    if (this.shouldWrite('error')) await this.writeLog(message);
  }

  async fatal(message: string) {
    if (this.shouldWrite('fatal')) await this.writeLog(message);
  }

  async verbose(message: string) {
    if (this.shouldWrite('verbose')) await this.writeLog(message);
  }

  private shouldWrite(level: string) {
    const levels = ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'];
    const index = levels.findIndex((l) => l === this.logLevel.toLowerCase());
    if (levels.findIndex((l) => l === level) >= index) return true;
    return false;
  }

  private async writeLog(message: string) {
    await fs.mkdir(path.resolve('logs'), { recursive: true });
    await fs.appendFile(
      path.resolve('logs', this.loggingFile),
      message,
      'utf8',
    );
    try {
      const stat = await fs.stat(path.resolve('logs', this.loggingFile));
      if (stat.size / 1024 > Number(process.env.FILE_SIZE))
        await this.fileRotation();
    } catch {}
    // await this.fileRotation(path.resolve('logs', this.loggingFile));
  }

  private async fileRotation() {
    this.logIndex += 1;
    const [name, ext] = this.loggingFileInit.split('.');
    this.loggingFile = `${name}${this.logIndex}.${ext}`;
    // console.log('stat:', size);
    // this.loggingFile = incrementFilename(this.loggingFile);
  }
}
