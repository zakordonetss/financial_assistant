import { DataSource } from 'typeorm';
import { entities } from '../entities';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'zakordonets',
  password: '',
  database: 'financial_assistant',
  entities,
});

export default AppDataSource;
