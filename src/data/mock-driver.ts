import { ImageSourcePropType } from 'react-native';

const faker = require('@faker-js/faker');

export type Driver = {
  id: string;
  name: string;
  ratings: string;
  averageRating: string;
  avatar: ImageSourcePropType;
};

export const driver: Driver = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  ratings: '144',
  averageRating: '4.6',
  avatar: { uri: `https://picsum.photos/208` },
};
