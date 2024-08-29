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

  async findAll(collectionName?: string, tag?: string) {
    let collectionIdArray = [];

    if (collectionName) {
      const collectionIds = await this.prisma.blogCollections.findMany({
        where: {
          name: collectionName,
        },
        select: {
          id: true,
        },
      });

      collectionIdArray = collectionIds.map((collection) => collection.id);
    }

    const where: any = {};

    if (collectionIdArray.length > 0) {
      where.collectionId = {
        in: collectionIdArray,
      };
    }

    if (tag) {
      where.tags = {
        some: {
          name: tag,
        },
      };
    }

    const blogs = await this.prisma.blogs.findMany({
      where: where,
      include: {
        collection: true,
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
