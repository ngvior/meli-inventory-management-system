import { Test, TestingModule } from '@nestjs/testing';
import { InventoryCommandController } from './inventory-command.controller';
import { InventoryCommandService } from './inventory-command.service';

describe('InventoryCommandController', () => {
  let inventoryCommandController: InventoryCommandController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InventoryCommandController],
      providers: [InventoryCommandService],
    }).compile();

    inventoryCommandController = app.get<InventoryCommandController>(InventoryCommandController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(inventoryCommandController.getHello()).toBe('Hello World!');
    });
  });
});
