import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PedantsTypeController } from './controllers/pedants-type/pedants-type.controller';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [PedantsTypeController],
})
export class AppModule {}
