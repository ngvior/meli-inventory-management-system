import { Body, Controller, Post, UseInterceptors } from '@nestjs/common'
import { CreateOrderDto } from 'apps/libs/contracts/src/command/create-order.dto'
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto'
import { RpcExceptionTranslatorInterceptor } from 'apps/libs/interceptors/exception-translator.interceptor'
import { Observable } from 'rxjs'
import { InventoryCommandService } from './inventory-command.service'

@Controller('inventory-command')
@UseInterceptors(RpcExceptionTranslatorInterceptor)
export class InventoryCommandController {
  constructor(
    private readonly inventoryCommandService: InventoryCommandService,
  ) {}

  @Post('order')
  createOrder(@Body() order: CreateOrderDto): Observable<ProductDto> {
    return this.inventoryCommandService.createOrder(order);
  }
}
