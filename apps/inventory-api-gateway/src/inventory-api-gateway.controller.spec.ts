import { Test, TestingModule } from '@nestjs/testing';
import { InventoryApiGatewayController } from './inventory-api-gateway.controller';
import { InventoryApiGatewayService } from './inventory-api-gateway.service';

describe('InventoryApiGatewayController', () => {
  let inventoryApiGatewayController: InventoryApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InventoryApiGatewayController],
      providers: [InventoryApiGatewayService],
    }).compile();

    inventoryApiGatewayController = app.get<InventoryApiGatewayController>(InventoryApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(inventoryApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
