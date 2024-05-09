import { Auth } from './auth/entities/auth.entity';
import { User } from './users/entities/user.entity';

// register entity in typeOrm here
export const entities = [Auth, User];

// for more comfortable import
export * from './auth/entities/auth.entity';
export * from './users/entities/user.entity';
