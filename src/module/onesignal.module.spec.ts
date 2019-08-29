import { Test } from '@nestjs/testing';
import { OneSignalModule } from './onesignal.module';
import { IOneSignalModuleOptions, IOneSignalOptionsFactory } from './interfaces';
import { OneSignalService } from './onesignal.service';
import { Injectable, Module } from '@nestjs/common';

const defaultOptions = {
  appId: 'appId',
  restApiKey: 'restApiKey',
} as IOneSignalModuleOptions;

@Injectable()
class OneSignalConfigService implements IOneSignalOptionsFactory {
  public createOneSignalOptions(): Promise<IOneSignalModuleOptions> | IOneSignalModuleOptions {
    return defaultOptions;
  }
}

// tslint:disable-next-line
@Module({
  providers: [OneSignalConfigService],
  exports: [OneSignalConfigService],
})
class OneSignalConfigModule {

}

describe('OneSignalModule', () => {
  describe('forRoot', () => {
    it('should be defined', async () => {
      const module = await Test.createTestingModule({
        imports: [OneSignalModule.forRoot(defaultOptions)],
      }).compile();
      expect(module).toBeDefined();
      expect(module.get<OneSignalService>(OneSignalService)).toBeDefined();
    });
  });
  describe('forRootAsync', () => {
    it('should be defined (factory) - useFactory', async () => {
      const module = await Test.createTestingModule({
        imports: [
          OneSignalModule.forRootAsync({
            useFactory: () => {
              return defaultOptions;
            },
          }),
        ],
      }).compile();
      expect(module).toBeDefined();
      expect(module.get<OneSignalService>(OneSignalService)).toBeDefined();
    });
    it('should be defined (factory)(inject)', async () => {
      const module = await Test.createTestingModule({
        imports: [
          OneSignalModule.forRootAsync({
            imports: [OneSignalConfigModule],
            useFactory: (oneSignalConfigService: OneSignalConfigService) => {
              return oneSignalConfigService.createOneSignalOptions();
            },
            inject: [OneSignalConfigService],
          }),
        ],
        providers: [OneSignalConfigService],
      }).compile();
      expect(module).toBeDefined();
      expect(module.get<OneSignalService>(OneSignalService)).toBeDefined();
    });
    it('should be defined (useClass)', async () => {
      const module = await Test.createTestingModule({
        imports: [
          OneSignalModule.forRootAsync({
            useClass: OneSignalConfigService,
          }),
        ],
      }).compile();
      expect(module).toBeDefined();
      expect(module.get<OneSignalService>(OneSignalService)).toBeDefined();
    });
    it('should be defined (factory) - useExisting', async () => {
      const module = await Test.createTestingModule({
        imports: [
          OneSignalModule.forRootAsync({
            imports: [OneSignalConfigModule],
            useExisting: OneSignalConfigService,
          }),
        ],
      }).compile();
      expect(module).toBeDefined();
      expect(module.get<OneSignalService>(OneSignalService)).toBeDefined();
    });
  });
});
