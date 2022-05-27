import {ImageSourcePropType} from 'react-native';
const faker = require('@faker-js/faker');

export type Story = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: ImageSourcePropType;
  coverPhoto: ImageSourcePropType;
};

export const mockStories: Story[] = [
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    avatar: {uri: `https://picsum.photos/200`},
    coverPhoto: {uri: 'https://picsum.photos/1012'},
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    avatar: {uri: 'https://picsum.photos/100'},
    coverPhoto: {uri: 'https://picsum.photos/1012'},
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    avatar: {uri: 'https://picsum.photos/101'},
    coverPhoto: {uri: 'https://picsum.photos/1012'},
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    avatar: {uri: 'https://picsum.photos/102'},
    coverPhoto: {uri: 'https://picsum.photos/1012'},
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    avatar: {uri: 'https://picsum.photos/201'},
    coverPhoto: {uri: 'https://picsum.photos/1012'},
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    avatar: {uri: 'https://picsum.photos/203'},
    coverPhoto: {uri: 'https://picsum.photos/1012'},
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    avatar: {uri: 'https://picsum.photos/204'},
    coverPhoto: {uri: 'https://picsum.photos/1012'},
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    avatar: {uri: 'https://picsum.photos/205'},
    coverPhoto: {uri: 'https://picsum.photos/1012'},
  },
];
