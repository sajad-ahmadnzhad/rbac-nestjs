import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { User } from "../../modules/auth/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    const accessToken = req.headers.authorization;

    if (!accessToken) return false;

    const token = accessToken.split("Bearer ")[1];

    let jwtPayload: { id: number } | null = null;

    try {
      jwtPayload = this.jwtService.verify<{ id: number }>(token as string, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    const user = await this.userRepository.findOneBy({ id: jwtPayload.id });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    req.user = user;

    return true;
  }
}
