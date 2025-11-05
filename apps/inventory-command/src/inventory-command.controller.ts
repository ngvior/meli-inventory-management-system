import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { COMMAND } from 'apps/libs/contracts/src/command/command.patterns'
import { CreateOrderDto } from 'apps/libs/contracts/src/command/create-order.dto'
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto'
import { InventoryCommandService } from './inventory-command.service'

@Controller()
export class InventoryCommandController {
  constructor(
    private readonly inventoryCommandService: InventoryCommandService,
  ) {}

  @MessagePattern(COMMAND.CREATE_ORDER)
  createOrder(@Payload() order: CreateOrderDto): ProductDto {
    return this.inventoryCommandService.createOrder(order);
  }
}
