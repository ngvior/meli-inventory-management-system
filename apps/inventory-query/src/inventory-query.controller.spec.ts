import { Test, TestingModule } from '@nestjs/testing';
import { InventoryQueryController } from './inventory-query.controller';
import { InventoryQueryService } from './inventory-query.service';

describe('InventoryQueryController', () => {
  let inventoryQueryController: InventoryQueryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InventoryQueryController],
      providers: [InventoryQueryService],
    }).compile();

    inventoryQueryController = app.get<InventoryQueryController>(InventoryQueryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(inventoryQueryController.getHello()).toBe('Hello World!');
    });
  });
});
