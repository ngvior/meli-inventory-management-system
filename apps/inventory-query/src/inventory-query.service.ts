import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InventoryRepository } from 'apps/db/inventory.repository';
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto';

@Injectable()
export class InventoryQueryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  getProducts(): ProductDto[] {
    return this.inventoryRepository.findAll();
  }

  getProductBySku(sku: string): ProductDto {
    const product = this.inventoryRepository.findBySku(sku);
    return product;
  }
}
