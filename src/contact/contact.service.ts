import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Contact, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
} from 'src/model/contact.model';
import { ContactValidation } from './contact.validation';

@Injectable()
export class ContactService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(
      `ContactService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateContactRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: {
        ...createRequest,
        ...{ username: user.username },
      },
    });

    return this.toContactResponse(contact);
  }

  private toContactResponse(contact: Contact): ContactResponse {
    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    };
  }

  private async checkContactMustExists(
    username: string,
    contactId: number,
  ): Promise<Contact> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: username,
        id: contactId,
      },
    });

    if (!contact) {
      throw new HttpException('Contact is not found', 404);
    }

    return contact;
  }

  async get(user: User, contactId: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExists(user.username, contactId);
    return this.toContactResponse(contact);
  }

  async update(
    user: User,
    request: UpdateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(
      `ContactService.update(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );

    const updateRequest = this.validationService.validate(
      ContactValidation.UPDATE,
      request,
    );
    let contact = await this.checkContactMustExists(
      user.username,
      updateRequest.id,
    );

    contact = await this.prismaService.contact.update({
      where: {
        id: contact.id,
        username: contact.username,
      },
      data: updateRequest,
    });

    return this.toContactResponse(contact);
  }

  async remove(user: User, contactId: number): Promise<ContactResponse> {
    await this.checkContactMustExists(user.username, contactId);

    const contact = await this.prismaService.contact.delete({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    return this.toContactResponse(contact);
  }
}