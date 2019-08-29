import { Provider } from '@nestjs/common';
import { IOneSignalModuleOptions } from './interfaces';
import { ONESIGNAL_MODULE_OPTIONS } from './onesignal.constants';

export function createOneSignalProvider(options: IOneSignalModuleOptions): Provider[] {
  return [
    {
      provide: ONESIGNAL_MODULE_OPTIONS,
      useValue: options || {},
    },
  ];
}
