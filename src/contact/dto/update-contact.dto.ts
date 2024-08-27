import { PartialType } from '@nestjs/mapped-types';
import { ContactDto } from './contact.dto';

export class UpdateContactDto extends PartialType(ContactDto) {}
