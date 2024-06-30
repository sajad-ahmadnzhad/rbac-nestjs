import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]) , JwtModule],
  controllers: [AuthController],
  providers: [AuthService , JwtService],
})
export class AuthModule {}
