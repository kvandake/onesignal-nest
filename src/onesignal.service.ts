import { Inject, Injectable } from '@nestjs/common';
import { OneSignalAppClient } from 'onesignal-api-client-core';
import { ONESIGNAL_MODULE_OPTIONS } from './onesignal.constants';
import { IOneSignalModuleOptions } from './interfaces';

@Injectable()
export class OneSignalService extends OneSignalAppClient {
  constructor(@Inject(ONESIGNAL_MODULE_OPTIONS) private readonly options: IOneSignalModuleOptions) {
    super(options.appId, options.restApiKey);
  }
}
// hello
