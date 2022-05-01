import { Test, TestingModule } from '@nestjs/testing';
import { ShippingServiceController } from './shipping-service.controller';
import { ShippingServiceService } from './shipping-service.service';

describe('ShippingServiceController', () => {
  let shippingServiceController: ShippingServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShippingServiceController],
      providers: [ShippingServiceService],
    }).compile();

    shippingServiceController = app.get<ShippingServiceController>(
      ShippingServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shippingServiceController.getHello()).toBe('Hello World!');
    });
  });
});
