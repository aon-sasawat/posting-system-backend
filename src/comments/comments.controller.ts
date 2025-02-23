import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Comment as CommentModel } from "@prisma/client";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() data: CommentModel): Promise<CommentModel> {
    return await this.commentsService.create(data);
  }

  @Get(":postId")
  async findByPostId(@Param("postId") postId: string): Promise<CommentModel[]> {
    return await this.commentsService.findByPostId(postId);
  }
}
