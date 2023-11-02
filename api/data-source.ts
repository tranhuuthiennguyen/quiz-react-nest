import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { config } from 'dotenv'

config()

const configService = new ConfigService()

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: 'quiz',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  entities: ["src/**/*.entity.ts"],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}']
}

export const dataSource = new DataSource(options)