import { PrismaService } from "@/service/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async auth(data: User): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { username: data.username } });
    if (user) return user;
    return await this.prisma.user.create({ data });
  }
}
