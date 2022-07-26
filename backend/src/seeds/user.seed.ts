import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '@modules/users/users.entity';

export default class CreatePets implements Seeder {
  public async run(factory: Factory): Promise<any> {
    console.log('here seed');
    await factory(User)().create();
  }
}
