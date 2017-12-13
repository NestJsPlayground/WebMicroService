import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthModule } from './health/health.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { ConsulModule } from './consul/consul.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { TwitterModule } from './web/web.module';

@Module({
  controllers: [
    AppController
  ],
  components: [],
  modules: [
    HealthModule,
    LoggerModule,
    TwitterModule,
    ConsulModule
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware)
      .forRoutes( { path: '*', method: RequestMethod.ALL });

    consumer.apply(AuthMiddleware).forRoutes(
      { path: '/web', method: RequestMethod.POST }
    );
  }
}
