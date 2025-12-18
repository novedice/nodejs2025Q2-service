import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { readFile } from 'node:fs/promises';
import * as YAML from 'yaml';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());
  app.useLogger(app.get(LoggingService));
  const docPath = path.resolve(process.cwd(), './doc/api.yaml');
  const readF = await readFile(docPath, 'utf-8');
  const doc = YAML.parse(readF);
  SwaggerModule.setup('doc', app, doc as OpenAPIObject);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
