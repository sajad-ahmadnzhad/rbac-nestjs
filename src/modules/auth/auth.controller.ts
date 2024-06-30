import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, success } = await this.authService.signup(
      createUserDto
    );
    res.cookie("accessToken", accessToken);
    return { message: success };
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authService.remove(+id);
  }
}
