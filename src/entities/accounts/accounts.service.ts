import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { globalsService } from 'src/globals/services/globals.service';
import { Repository } from 'typeorm';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly _accountsRepository: Repository<Account>,
  ) {}
  public async create(createAccountDto: CreateAccountDto) {
    const { user } = globalsService;
    const account = new Account({ user, ...createAccountDto });
    return this._accountsRepository.save(account);
  }

  public async findAll(): Promise<Account[]> {
    return this._accountsRepository.find();
  }

  public async findOne(id: number): Promise<Account> {
    return this._accountsRepository.findOne({ where: { id } });
  }

  public async update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
