import { Test, TestingModule } from '@nestjs/testing';
import { BillingServiceController } from './billing-service.controller';
import { BillingServiceService } from './billing-service.service';

describe('BillingServiceController', () => {
  let billingServiceController: BillingServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingServiceController],
      providers: [BillingServiceService],
    }).compile();

    billingServiceController = app.get<BillingServiceController>(
      BillingServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingServiceController.getHello()).toBe('Hello World!');
    });
  });
});
