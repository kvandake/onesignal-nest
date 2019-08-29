import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface IOneSignalModuleOptions {
  appId: string;
  restApiKey: string;
}

export interface IOneSignalOptionsFactory {
  createOneSignalOptions():
    | Promise<IOneSignalModuleOptions>
    | IOneSignalModuleOptions;
}

export interface IOneSignalModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<IOneSignalOptionsFactory>;
  useClass?: Type<IOneSignalOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<IOneSignalModuleOptions> | IOneSignalModuleOptions;
  inject?: any[];
}
