import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from './../../services/base-service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { regexSearchQuery } from './../../helpers/search-query';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { FileDto } from 'src/utils/dto/file.dto';
import { getFileUserDetails } from './helpers/users';
import { createVendor } from 'src/services/aws/cognito';

@Injectable()
export class UserService extends BaseService<UserRepository, QueryUserDto, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository, 'user');
  }

  async findAllAndSearch(query: QueryUserDto): Promise<{ data: any; message: string }> {
    const searchFields = ['email', 'firstName', 'lastName'];
    const filter = query.search ? regexSearchQuery(searchFields, query.search, query) : query;

    const users = await this.userRepository.paginate(filter);
    if (!users || users.length < 1) throw new NotFoundException(`users not found`);

    return { data: users, message: `users successfully fetched` };
  }

  async export(): Promise<any> {
    const vendors = await this.userRepository.find({});

    const data = vendors.map((vendor) => {
      return {
        firstName: vendor.firstName,
        lastName: vendor.firstName,
        email: vendor.email,
      };
    });

    const rows = [];
    data.forEach((application) => rows.push(Object.values(application)));

    const book = new Workbook();
    const sheet = book.addWorksheet('Application Sheet');

    rows.unshift(Object.keys(data[0]));
    sheet.addRows(rows);

    return await saveTempFile(book, 'Application Sheet');
  }

  async migrate(filePayload: FileDto): Promise<{ data: any; message: string }> {
    try {
      const { file } = filePayload;
      const users: any[] = getFileUserDetails(file);

      const userCreationPromises = users.map((user) => {
        const { firstName, lastName, email } = user;

        return createVendor({ email, firstName, lastName });
      });

      await Promise.all(userCreationPromises);

      return { data: null, message: 'Migrated sent successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
