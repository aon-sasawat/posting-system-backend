import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { PrismaService } from "./service/prisma/prisma.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { UsersModule } from "./users/users.module";
import { CommentsModule } from "./comments/comments.module";
import { TagsModule } from "./tags/tags.module";

@Module({
  imports: [PostsModule, UsersModule, CommentsModule, TagsModule],
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
