import { ImageSourcePropType } from 'react-native';

const faker = require('@faker-js/faker');

export type Dish = {
  id: string;
  title: string;
  description: string;
  price: string;
  image?: ImageSourcePropType;
  coverImage?: ImageSourcePropType;
  sideDishes?: DishSection[];
};

export type DishSection = {
  title: string;
  data: Dish[];
};

export type Place = {
  id: string;
  title: string;
  coverImage?: ImageSourcePropType;
  image: ImageSourcePropType;
  subTitle: string;
  distance: number;
  time: number;
  rating: number;
  dishSection?: DishSection[];
};

export type RemarkablePlaceTab = {
  [name: string]: Place[];
};

export const mockDishDetails: Dish = {
  id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  description: faker.lorem.lines(3),
  price: faker.commerce.price(5, 60),
  coverImage: { uri: `https://picsum.photos/706` },
  sideDishes: [
    {
      title: 'Cake',
      data: Array(5)
        .fill(0)
        .map((_) => ({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price(2, 10),
          image: { uri: `https://picsum.photos/701` },
        })),
    },
    {
      title: 'Drink',
      data: Array(3)
        .fill(0)
        .map((_) => ({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price(2, 10),
          image: { uri: `https://picsum.photos/704` },
        })),
    },
    {
      title: 'Salad',
      data: Array(6)
        .fill(0)
        .map((_) => ({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price(2, 10),
          image: { uri: `https://picsum.photos/707` },
        })),
    },
  ],
};

export const mockPlaceDetails: Place = {
  id: '1',
  title: 'Neapolitan pizza, Italy. Neapolitan pizza',
  coverImage: { uri: `https://picsum.photos/806` },
  image: { uri: `https://picsum.photos/406` },
  subTitle: 'Western, Spaghetti',
  distance: 75,
  time: 90,
  rating: 4,
  dishSection: [
    {
      title: 'Burgers',
      data: Array(3)
        .fill(0)
        .map((_) => ({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price(5, 60),
          image: { uri: `https://picsum.photos/701` },
        })),
    },
    {
      title: 'Pizza',
      data: Array(3)
        .fill(0)
        .map((_) => ({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price(5, 60),
          image: { uri: `https://picsum.photos/201` },
        })),
    },
    {
      title: 'Sushi and rolls',
      data: Array(4)
        .fill(0)
        .map((_) => ({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price(5, 60),
          image: { uri: `https://picsum.photos/301` },
        })),
    },
    {
      title: 'Pasta',
      data: Array(4)
        .fill(0)
        .map((_) => ({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price(5, 60),
          image: { uri: `https://picsum.photos/401` },
        })),
    },
    {
      title: 'Dessert',
      data: Array(6)
        .fill(0)
        .map((_) => ({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price(5, 60),
          image: { uri: `https://picsum.photos/202` },
        })),
    },
  ],
};

export const mockPlaceList: Place[] = Array(10)
  .fill(0)
  .map((_) => {
    const image = { uri: `https://picsum.photos/501` };
    return {
      id: faker.datatype.uuid(),
      title: faker.commerce.department(),
      image,
      subTitle: faker.lorem.lines(2),
      distance: 75,
      time: 90,
      rating: 4,
    };
  });

export const mockPlaces: Place[] = Array(3)
  .fill(0)
  .map((_) => {
    const image = { uri: `https://picsum.photos/502` };
    return {
      id: faker.datatype.uuid(),
      title: faker.commerce.department(),
      image,
      subTitle: faker.lorem.lines(2),
      distance: 75,
      time: 90,
      rating: 4,
    };
  });

export const mockRemarkablePlace: RemarkablePlaceTab = {
  featured: [
    {
      id: faker.datatype.uuid(),
      title: 'Neapolitan pizza, Spaghetti - Italy',
      image: { uri: `https://picsum.photos/503` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Banh mi - Saigon - 200 Bui Thi Xuan',
      image: { uri: `https://picsum.photos/504` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Moules frites, Belgium - United State',
      image: { uri: `https://picsum.photos/505` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Spaghetti - Italy',
      image: { uri: `https://picsum.photos/506` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Banh mi - Saigon',
      image: { uri: `https://picsum.photos/507` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'KFC - United State',
      image: { uri: `https://picsum.photos/508` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Khachapuri, Georgia',
      image: { uri: `https://picsum.photos/411` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Banh mi - Saigon',
      image: { uri: `https://picsum.photos/412` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'KFC - United State',
      image: { uri: `https://picsum.photos/413` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
  newest: [
    {
      id: faker.datatype.uuid(),
      title: 'Spaghetti - Italy',
      image: { uri: `https://picsum.photos/414` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Banh mi - Saigon',
      image: { uri: `https://picsum.photos/415` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'KFC - United State',
      image: { uri: `https://picsum.photos/416` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Haggis, neeps and tatties, Scotland',
      image: { uri: `https://picsum.photos/417` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Banh mi - Saigon',
      image: { uri: `https://picsum.photos/418` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'KFC - United State',
      image: { uri: `https://picsum.photos/419` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Neapolitan pizza, Spaghetti - Italy',
      image: { uri: `https://picsum.photos/420` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Haggis, neeps and tatties, Scotland',
      image: { uri: `https://picsum.photos/421` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'KFC - United State',
      image: { uri: `https://picsum.photos/422` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
  trending: [
    {
      id: faker.datatype.uuid(),
      title: 'Spaghetti  - Italy',
      image: { uri: `https://picsum.photos/611` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Banh mi - Saigon',
      image: { uri: `https://picsum.photos/612` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Gumbo, Louisiana, US - United State',
      image: { uri: `https://picsum.photos/613` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Spaghetti - Italy',
      image: { uri: `https://picsum.photos/614` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Banh mi - Saigon',
      image: { uri: `https://picsum.photos/615` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'KFC - United State',
      image: { uri: `https://picsum.photos/616` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Jollof rice, West Africa',
      image: { uri: `https://picsum.photos/617` },
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: faker.datatype.uuid(),
      title: 'Singapore noodles, Hong Kong',
      image: { uri: `https://picsum.photos/111` },
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: faker.datatype.uuid(),
      title: 'KFC - United State',
      image: { uri: `https://picsum.photos/112` },
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
};
