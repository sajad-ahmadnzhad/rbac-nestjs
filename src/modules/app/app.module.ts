import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModule } from "../post/post.module";
import { ArticleModule } from "../article/article.module";
import * as path from "path";
import { AuthModule } from "../auth/auth.module";
import { Post } from "../post/entities/post.entity";
import { User } from "../auth/entities/user.entity";
import { Article } from "../article/entities/article.entity";
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(process.cwd(), `${process.env.NODE_ENV}.env`),
    }),

    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Post, Article, User],
      synchronize: !!+(process.env.DATABASE_SYNCHRONIZE as string),
    }),

    PostModule,
    ArticleModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
  controllers: [],
})
export class AppModule {}
