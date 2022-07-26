import { define } from 'typeorm-seeding';

import { User } from '@modules/users/users.entity';

define(User, () => {
  const user = new User();

  user.isMod = true;
  user.isVerified = true;
  user.displayProfile = false;
  user.id = process.env.ADMIN_ID;
  user.displayName = process.env.ADMIN_DISPLAY_NAME;
  user.password = process.env.ADMIN_PASSWORD;
  user.email = process.env.ADMIN_EMAIL;
  user.firstName = process.env.ADMIN_NAME;
  user.lastName = process.env.ADMIN_LASTNAME;

  return user;
});
