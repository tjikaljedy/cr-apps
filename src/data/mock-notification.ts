const faker = require('@faker-js/faker');

export type Notification = {
  id: string;
  title: string;
  subTitle: string;
};

export const notifications: Notification[] = Array(15)
  .fill(0)
  .map((_) => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(4),
    subTitle: faker.lorem.sentence(5),
  }));
