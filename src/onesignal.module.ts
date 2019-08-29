import { DynamicModule, Module, Provider } from '@nestjs/common';
import { IOneSignalModuleAsyncOptions, IOneSignalModuleOptions, IOneSignalOptionsFactory } from './interfaces';
import { ONESIGNAL_MODULE_OPTIONS } from './onesignal.constants';
import { createOneSignalProvider } from './onesignal.provider';
import { OneSignalService } from './onesignal.service';

@Module({
  providers: [OneSignalService],
  exports: [OneSignalService],
})
export class OneSignalModule {
  public static forRoot(options: IOneSignalModuleOptions): DynamicModule {
    return {
      module: OneSignalModule,
      providers: createOneSignalProvider(options),
    };
  }

  public static forRootAsync(options: IOneSignalModuleAsyncOptions): DynamicModule {
    return {
      module: OneSignalModule,
      imports: options.imports || [],
      providers: this.createAsyncProvider(options),
    };
  }

  private static createAsyncProvider(options: IOneSignalModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ] as any;
  }

  private static createAsyncOptionsProvider(options: IOneSignalModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: ONESIGNAL_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: ONESIGNAL_MODULE_OPTIONS,
      useFactory: async (optionsFactory: IOneSignalOptionsFactory) => await optionsFactory.createOneSignalOptions(),
      inject: [options.useExisting || options.useClass],
    } as any;
  }
}
