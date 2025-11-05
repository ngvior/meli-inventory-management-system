import { Module } from '@nestjs/common'
import { InventoryRepository } from 'apps/db/inventory.repository'
import { InventoryQueryController } from './inventory-query.controller'
import { InventoryQueryService } from './inventory-query.service'

@Module({
  imports: [],
  controllers: [InventoryQueryController],
  providers: [InventoryQueryService, InventoryRepository],
})
export class InventoryQueryModule {}
