import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { INVENTORY_QUERY_CLIENT } from 'apps/inventory-api-gateway/constants';
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto';
import { QUERY } from 'apps/libs/contracts/src/query/query.patterns';
import { Observable } from 'rxjs';

@Injectable()
export class InventoryQueryService {
  constructor(
    @Inject(INVENTORY_QUERY_CLIENT) private readonly client: ClientProxy,
  ) {}

  getProducts(): Observable<ProductDto[]> {
    return this.client.send<ProductDto[]>(QUERY.GET_PRODUCTS, {});
  }

  getProductBySku(sku: string): Observable<ProductDto> {
    return this.client.send<ProductDto, string>(QUERY.GET_PRODUCT_BY_SKU, sku);
  }
}
