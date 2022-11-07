import { Injectable } from '@nestjs/common';
import { Currency } from './currency.entity';
import { CurrencyRepository } from './currency.repository';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency..dto';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async findBySymbol(symbol: string): Promise<Currency> {
    return this.currencyRepository.findOneBy({ symbol });
  }

  async create(body: CreateCurrencyDto): Promise<Currency> {
    const currency = await this.currencyRepository.save(
      {
        ...this.currencyRepository.create({ name: body.name, symbol: body.symbol }),
      },
      { reload: true },
    );

    return currency;
  }

  async update(id: number, body: UpdateCurrencyDto): Promise<Currency> {
    await this.currencyRepository.update({ id }, body);

    return this.currencyRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.currencyRepository.softDelete({ id });
  }

  async isCurrencyExist(id: number): Promise<boolean> {
    const currency = await this.currencyRepository.findOne({ where: { id } });

    return currency !== null;
  }
}
