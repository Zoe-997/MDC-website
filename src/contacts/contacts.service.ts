import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  create(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }

  async findAll() {
    const contacts = await this.prisma.contacts.findMany();
    console.log('contact: ', contacts);

    return {
      data: contacts,
      total: contacts.length,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} contact`;
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: string) {
    return `This action removes a #${id} contact`;
  }
}
