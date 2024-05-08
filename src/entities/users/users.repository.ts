import AppDataSource from 'src/dataSource/dataSource';
import { User } from './entities/user.entity';

const usersRepository = AppDataSource.getRepository(User);
export default usersRepository;
