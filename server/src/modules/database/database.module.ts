import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DAO_LIST } from './dao';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        console.log(
          'Connecting to: ',
          configService.get('DB_HOST'),
          configService.get('DB_USERNAME'),
        );
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DATABASE_NAME', 'server'),
          entities: [`${__dirname}/entities/*.entity.ts`],
          autoLoadEntities: true,
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [...DAO_LIST],
  exports: [TypeOrmModule, ...DAO_LIST],
})
export default class DatabaseModule {}
