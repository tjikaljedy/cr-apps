const faker = require('@faker-js/faker');

export type OrderDetail = {
  id: string;
  name: string;
  totalItems: number;
  price: number;
  shippingFee: number;
  note: string;
};

export type ActivityHistory = {
  bookingId: string;
  date: string;
  restaurantName: string;
  driverId: string;
  status: string;
  from: string;
  to: string;
  orderDetail: OrderDetail;
};

export const activityHistoryDetail: ActivityHistory = {
  bookingId: faker.datatype.uuid(),
  date: new Date(faker.date.past()).toDateString(),
  driverId: faker.datatype.uuid(),
  from: `${faker.address.streetAddress()} - ${faker.address.state()} - ${faker.address.city()}`,
  to: `${faker.address.streetAddress()} - ${faker.address.state()} - ${faker.address.city()}`,
  restaurantName: faker.lorem.lines(1),
  status: 'Delivered',
  orderDetail: {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    note: faker.lorem.lines(1),
    price: faker.commerce.price(5, 60),
    shippingFee: faker.datatype.number(5),
    totalItems: faker.datatype.number(5),
  },
};

export const activityHistoryList: ActivityHistory[] = Array(10)
  .fill(0)
  .map((_) => ({
    bookingId: faker.datatype.uuid(),
    date: new Date(faker.date.past()).toDateString(),
    driverId: faker.datatype.uuid(),
    from: faker.lorem.lines(1),
    to: faker.lorem.lines(1),
    restaurantName: faker.lorem.lines(1),
    status: 'Delivered',
    orderDetail: {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      note: faker.lorem.lines(1),
      price: faker.commerce.price(5, 60),
      shippingFee: faker.datatype.number(5),
      totalItems: faker.datatype.number(5),
    },
  }));
