import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User as UserModel } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("auth")
  async auth(@Body() data: UserModel): Promise<UserModel> {
    return await this.usersService.auth(data);
  }
}
