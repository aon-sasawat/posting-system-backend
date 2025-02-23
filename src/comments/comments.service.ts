import { PrismaService } from "@/service/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Comment } from "@prisma/client";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Comment): Promise<Comment> {
    return await this.prisma.comment.create({ data });
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    return await this.prisma.comment.findMany({ where: { postId } });
  }
}
