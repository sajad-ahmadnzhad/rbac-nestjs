import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModule } from "../post/post.module";
import { ArticleModule } from "../article/article.module";
import * as path from "path";
import { AuthModule } from "../auth/auth.module";

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
      entities: [],
      synchronize: !!+(process.env.DATABASE_SYNCHRONIZE as string),
    }),
    PostModule,
    ArticleModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
