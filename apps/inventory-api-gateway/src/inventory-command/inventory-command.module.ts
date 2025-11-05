import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { INVENTORY_COMMAND_CLIENT } from 'apps/inventory-api-gateway/constants';
import { InventoryCommandController } from './inventory-command.controller';
import { InventoryCommandService } from './inventory-command.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: INVENTORY_COMMAND_CLIENT,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('COMMAND_PORT', 3001),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [InventoryCommandController],
  providers: [InventoryCommandService],
})
export class InventoryCommandModule {}
