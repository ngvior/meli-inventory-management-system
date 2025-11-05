import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto'
import { QUERY } from 'apps/libs/contracts/src/query/query.patterns'
import { InventoryQueryService } from './inventory-query.service'

@Controller()
export class InventoryQueryController {
  constructor(private readonly inventoryQueryService: InventoryQueryService) {}

  @MessagePattern(QUERY.GET_PRODUCTS)
  getProducts(): ProductDto[] {
    return this.inventoryQueryService.getProducts();
  }

  @MessagePattern(QUERY.GET_PRODUCT_BY_SKU)
  getProductById(sku: string): ProductDto {
    console.log(sku);
    return this.inventoryQueryService.getProductBySku(sku);
  }
}
