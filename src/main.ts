import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;

  try {
    await app.listen(port);
    console.log(`NestJS server started successfully on http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Server failed to start. Check your configuration or code:', error.message);
  }
}
bootstrap();
