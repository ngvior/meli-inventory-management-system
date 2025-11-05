import { Injectable } from '@nestjs/common'

@Injectable()
export class InventoryApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
