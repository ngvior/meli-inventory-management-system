import { NotFoundException } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto';
import * as fs from 'fs';
import * as path from 'path';

export class InventoryRepository {
  private readonly filePath = path.join(
    process.cwd(),
    'apps',
    'db',
    'inventory.json',
  );

  public findAll(): ProductDto[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  public findBySku(sku: string): ProductDto {
    const records = this.findAll();
    const product = records.find((r) => r.sku === sku);
    if (!product)
          throw new RpcException(new NotFoundException('Product not found'));
    return product;
  }
  public updateProduct(updatedRecord: ProductDto): ProductDto {
    let records = this.findAll();
    const recordIndex = records.findIndex((r) => r.sku === updatedRecord.sku);
    if (recordIndex === -1) {
      throw new Error(
        `SKU ${updatedRecord.sku} no encontrado para actualización.`,
      );
    }
    records[recordIndex] = updatedRecord;
    this.writeInventory(records);

    return updatedRecord;
  }
  private writeInventory(records: ProductDto[]): void {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(records, null, 2),
        'utf-8',
      );
    } catch (e) {
      console.error('Error al escribir el archivo de inventario:', e);
      throw new Error('Error de persistencia de datos.');
    }
  }
}
