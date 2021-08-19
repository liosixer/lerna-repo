/*
 * @Author: liosixer
 * @Date: 2021-08-19 15:37:49
 * @LastEditTime: 2021-08-19 15:40:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lerna-repo\packages\hermos-graphql-center\src\schema\fields\author.ts
 */

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  // posts:
}
