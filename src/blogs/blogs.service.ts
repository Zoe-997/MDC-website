import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  async findAll() {
    const blogs = await this.prisma.blogs.findMany();

    return {
      data: blogs,
      total: blogs.length,
    };
  }

  async findAllFilter(collection?: string, tag?: string) {
    const conditions = [];

    if (collection) {
      conditions.push({
        collection: {
          name: collection,
        },
      });
    }

    if (tag) {
      conditions.push({
        tags: {
          some: {
            name: tag,
          },
        },
      });
    }

    const blogs = await this.prisma.blogs.findMany({
      where: {
        AND: conditions,
      },
    });

    return {
      data: blogs,
      total: blogs.length,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} blog`;
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: string) {
    return `This action removes a #${id} blog`;
  }
}
