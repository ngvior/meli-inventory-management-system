import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InventoryRepository } from 'apps/db/inventory.repository';
import { CreateOrderDto } from 'apps/libs/contracts/src/command/create-order.dto';
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto';

@Injectable()
export class InventoryCommandService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  createOrder(order: CreateOrderDto): ProductDto {
    const product = this.inventoryRepository.findBySku(order.sku);
    if (product.stock < order.wantedQuantity)
      throw new RpcException(new NotFoundException('Insufficient stock'));
    if (product.version !== order.version)
      throw new RpcException(
        new ConflictException('Version mismatch. Try again.'),
      );
    product.stock -= order.wantedQuantity;
    product.version += 1;
    this.inventoryRepository.updateProduct(product);
    return product;
  }
}
