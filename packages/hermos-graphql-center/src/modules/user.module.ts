/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
      GraphQLModule.forRoot({
        debug: false,
        include: [

        ]
      }),
    ],
    controllers: [],
    providers: [],
})
export class UserModule {}
