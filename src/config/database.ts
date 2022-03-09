import { Dialect } from 'sequelize/types';

export const config = {
    type: process.env.DB_TYPE,
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    logging: process.env.DB_LOGGING === 'true',
    entities: process.env.DB_ENTITIES.split(','),
    models: [],
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
};
