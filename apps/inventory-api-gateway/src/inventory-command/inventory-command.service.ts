import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { INVENTORY_COMMAND_CLIENT } from 'apps/inventory-api-gateway/constants'
import { COMMAND } from 'apps/libs/contracts/src/command/command.patterns'
import { CreateOrderDto } from 'apps/libs/contracts/src/command/create-order.dto'
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto'
import { Observable } from 'rxjs/internal/Observable'

@Injectable()
export class InventoryCommandService {
  constructor(
    @Inject(INVENTORY_COMMAND_CLIENT) private readonly client: ClientProxy,
  ) {}

  createOrder(order: CreateOrderDto): Observable<ProductDto> {
    return this.client.send<ProductDto, CreateOrderDto>(
      COMMAND.CREATE_ORDER,
      order,
    );
  }
}
