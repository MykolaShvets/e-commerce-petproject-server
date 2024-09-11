import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { configs } from './core/configs';

const dbconfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: configs.DB_HOST,
  port: configs.DB_PORT,
  username: configs.DB_USER,
  password: configs.DB_PASSWORD,
  database: configs.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default dbconfig;
