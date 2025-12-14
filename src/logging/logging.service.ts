import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { incrementFilename } from 'src/utils/incrementFilename';

@Injectable()
export class LoggingService implements LoggerService {
  constructor() {
    this.initLoggingFile();
  }

  private loggingFile = 'applogs.txt';
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
    await fs.appendFile(
      path.resolve('logs', this.loggingFile),
      message,
      'utf8',
    );
    try {
      const stat = await fs.stat(path.resolve('logs', this.loggingFile));
      if (stat.size / 1024 > Number(process.env.FILE_SIZE)) {
        await this.fileRotation();
      }
    } catch {}
  }

  private async fileRotation() {
    this.loggingFile = incrementFilename(this.loggingFile);
    fs.appendFile(path.resolve('logs', this.loggingFile), '', 'utf8');
  }

  private async initLoggingFile() {
    await fs.mkdir(path.resolve('logs'), { recursive: true });

    const files = await fs.readdir(path.resolve('logs'));

    const logFiles = files.sort((a, b) => {
      const na = Number(a.match(/\d+/)?.[0] ?? 0);
      const nb = Number(b.match(/\d+/)?.[0] ?? 0);
      return na - nb;
    });

    this.loggingFile =
      logFiles.length > 0 ? logFiles[logFiles.length - 1] : 'applogs.txt';
  }
}
