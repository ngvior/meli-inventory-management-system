import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto'
import { RpcExceptionTranslatorInterceptor } from 'apps/libs/interceptors/exception-translator.interceptor'
import { Observable } from 'rxjs'
import { InventoryQueryService } from './inventory-query.service'

@Controller('inventory-query')
@UseInterceptors(RpcExceptionTranslatorInterceptor)
export class InventoryQueryController {
  constructor(private readonly inventoryQueryService: InventoryQueryService) {}

  @Get('products')
  getProducts(): Observable<ProductDto[]> {
    return this.inventoryQueryService.getProducts();
  }

  @Get('products/:sku')
  getProductById(@Param('sku') sku: string): Observable<ProductDto> {
    return this.inventoryQueryService.getProductBySku(sku);
  }
}
