import { Controller, Get } from '@nestjs/common'
import { InventoryApiGatewayService } from './inventory-api-gateway.service'

@Controller()
export class InventoryApiGatewayController {
  constructor(
    private readonly inventoryApiGatewayService: InventoryApiGatewayService,
  ) {}

  @Get()
  getHello(): string {
    return this.inventoryApiGatewayService.getHello();
  }
}
