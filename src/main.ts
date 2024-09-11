import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configs } from './core/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(configs.PORT);
}
bootstrap();
