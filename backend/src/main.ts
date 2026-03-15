import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

const PORT = process.env.PORT || 4000;
const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  `http://localhost:${process.env.FRONTEND_PORT || 3000}`;
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret';
const MAX_AGE = 60 * 60 * 1000; // 1 hour

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    }),
  );

  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
  });

  await app.listen(PORT);
}

bootstrap();
