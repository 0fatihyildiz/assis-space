import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Progress } from '@modules/progress/progress.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  displayName: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified?: boolean;

  @Column({ default: false })
  isMod?: boolean;

  @Column({ default: false })
  isBanned?: boolean;

  @Column({ default: true })
  displayProfile?: boolean;

  @OneToMany(() => Progress, (progress) => progress.user)
  progress?: Progress[];

  @BeforeInsert()
  setPassword? = async function (password: string) {
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    this.password = await bcrypt.hash(password || this.password, salt);
  };
}

const userSchema = Joi.object<User>({
  displayName: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
});

export const checkUser = (data: any) => {
  return userSchema.validate(data);
};

export const normalizeUsers = (users: User[], ignoreDisplayProfile = false) => {
  const omitKeys: (keyof User)[] = ['password'];
  const optionals: (keyof User)[] = ['firstName', 'lastName', 'isMod'];
  return users.map((u) => {
    return (!u.displayProfile && !ignoreDisplayProfile
      ? omit(u, [...optionals, ...omitKeys])
      : omit(u, omitKeys)) as unknown as User;
  });
};
