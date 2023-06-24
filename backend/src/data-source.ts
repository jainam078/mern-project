import { DataSource } from 'typeorm';
import { Sum } from './entities/sum.entity';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'nestjs',
	synchronize: true,
	logging: true,
	entities: [Sum],
	subscribers: [],
	migrations: [],
});
