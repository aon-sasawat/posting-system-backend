import { PrismaService } from "@/service/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Tag } from "@prisma/client";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Tag[]> {
    return await this.prisma.tag.findMany();
  }
}
