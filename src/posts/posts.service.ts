import { PrismaService } from "@/service/prisma/prisma.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Post } from "@prisma/client";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        user: true,
        tag: true,
        comments: true,
      },
    });
  }

  async findOne(id: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        tag: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!post) throw new HttpException("Post not found", HttpStatus.NOT_FOUND);

    return post;
  }

  async findByUserId(userId: string): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { userId },
      include: {
        user: true,
        tag: true,
        comments: true,
      },
    });
  }

  async create(data: Post): Promise<Post> {
    return await this.prisma.post.create({ data });
  }

  async update(id: string, data: Post): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new HttpException("Post not found", HttpStatus.NOT_FOUND);

    return await this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new HttpException("Post not found", HttpStatus.NOT_FOUND);

    await this.prisma.post.delete({ where: { id } });
    return { deleted: true };
  }
}
