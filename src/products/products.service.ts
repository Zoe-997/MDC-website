import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.products.create({
      data: createProductDto,
    });
    return product;
  }

  async findAll() {
    const products = await this.prisma.products.findMany();
    return {
      products: products,
      total: products.length,
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) throw new Error('Product not found');

    return this.prisma.products.update({
      where: {
        id: id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    const product = await this.prisma.products.delete({
      where: {
        id: id,
      },
    });

    return `Product ${product.id} has been remove`;
  }
}
