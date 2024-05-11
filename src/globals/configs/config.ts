// P.S. I know that it should not be here
export const CLIENT_SECRET = 'very_secret_key';

export const DATABASE_CONFIG: Record<string, string | number> = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'zakordonets',
  password: '',
  database: 'financial_assistant',
};

export enum DB_TABLE_NAMES {
  accounts = 'accounts',
  users = 'users',
  auth = 'auth',
}
