import { ConflictException, Injectable, forwardRef } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: [
        {
          username: createUserDto.username,
        },
        {
          email: createUserDto.email,
        },
      ],
    });

    if (user) {
      throw new ConflictException(
        "User with this username or email already registered"
      );
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    const accessToken = this.jwtService.sign(
      { userId: newUser.id },
      { secret: process.env.JWT_SECRET as string }
    );

    await this.userRepository.save(newUser)

    return {
      accessToken,
      success: "signup success",
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
