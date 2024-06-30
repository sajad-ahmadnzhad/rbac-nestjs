import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const {PORT = 4000} = process.env
  await app.listen(PORT);
}
bootstrap();
