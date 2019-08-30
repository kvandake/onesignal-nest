# OneSignal API Client for NestJS
[![npm version](https://badge.fury.io/js/onesignal-api-client-nest.svg)](https://badge.fury.io/js/onesignal-api-client-nest)

OneSignal API wrapper for the Server Rest API made to work with the [Nest]((https://github.com/nestjs/nest)) framework.

## Getting Started

Npm 
```sh
$ npm install onesignal-api-client-nest
```
Yarn
```sh
$ yarn add onesignal-api-client-nest
```

## Using the Module

```typescript
// Inside of your module imports
@Module({
  imports: [
    OneSignalModule.forRoot({
      appId: 'appId',
      restApiKey: 'restApiKey',
    })
  ]
})

// Or async
@Module({
  imports: [
    OneSignalModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          appId: configService.get('ONESIGNAL_APP_ID'),
          restApiKey: configService.get('ONESIGNAL_REST_API_KEY'),
        };
      },
      inject: [ConfigService],
    ),
  ],
})
```

## Using in the Service

In your service class you can inject the service like so and then use it in any function as you would any other service.

```typescript
import { NotificationBySegmentBuilder } from 'onesignal-api-client-core';

@Injectable()
export class MyService {

  constructor(private readonly oneSignalService: OneSignalService) {}

  async viewNotifications() {
   return await this.oneSignalService.viewNotifications();
  }
  
  async createNotification(message: string) {
    const input = new NotificationBySegmentBuilder()
         .setIncludedSegments(['Active Users', 'Inactive Users'])
         .notification() // .email()
         .setContents({ en: message })
         .build();
      
    await this.oneSignalService.createNotification(input);
  }
}
```

## Documentation
All documentation for this wrapper comes from the [OneSignal API client](https://github.com/kvandake/onesignal), if there are any typos, please let me know or open a PR to fix it.

## Support
If any bugs are found in the API wrapper, please open an issue on GitHub, or a Pull Request if you want to fix it yourself!
Please be as explicit as possible and provide a minimum reproducing repository if at all possible, as it helps track down what went wrong.

## License
MIT
