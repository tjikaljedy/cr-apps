import { ImageSourcePropType } from 'react-native';

const faker = require('@faker-js/faker');

export type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: ImageSourcePropType;
  coverPhoto: ImageSourcePropType;
};

export const profile: Profile = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  avatar: { uri: 'https://picsum.photos/1005' },
  coverPhoto: { uri: 'https://picsum.photos/1012' },
};
