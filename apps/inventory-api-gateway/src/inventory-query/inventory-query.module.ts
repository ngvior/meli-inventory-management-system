import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { INVENTORY_QUERY_CLIENT } from 'apps/inventory-api-gateway/constants'
import { InventoryQueryController } from './inventory-query.controller'
import { InventoryQueryService } from './inventory-query.service'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: INVENTORY_QUERY_CLIENT,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('QUERY_PORT', 3002),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [InventoryQueryController],
  providers: [InventoryQueryService],
})
export class InventoryQueryModule {}
