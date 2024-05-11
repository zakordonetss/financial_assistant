import { User } from 'src/entities';

class GlobalsService {
  public user: User;
}
export const globalsService = new GlobalsService();
