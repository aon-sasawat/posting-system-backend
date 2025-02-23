import { Controller, Get } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { Tag as TagModel } from "@prisma/client";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAll(): Promise<TagModel[]> {
    return await this.tagsService.findAll();
  }
}
