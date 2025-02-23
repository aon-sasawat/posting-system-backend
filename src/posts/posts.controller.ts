import { Controller, Get, Post, Patch, Delete, Body, Param } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Post as PostModel } from "@prisma/client";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostModel[]> {
    return await this.postsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<PostModel | null> {
    return await this.postsService.findOne(id);
  }

  @Get("user/:userId")
  async findByUserId(@Param("userId") userId: string): Promise<PostModel[]> {
    return await this.postsService.findByUserId(userId);
  }

  @Post()
  async create(@Body() data: PostModel): Promise<PostModel> {
    return await this.postsService.create(data);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() data: PostModel): Promise<PostModel> {
    return await this.postsService.update(id, data);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<{ deleted: boolean }> {
    return await this.postsService.remove(id);
  }
}
