import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { PrismaService } from "./service/prisma/prisma.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./interceptors/response.interceptor";

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
