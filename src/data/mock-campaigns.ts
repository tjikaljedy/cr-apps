import { ImageSourcePropType } from 'react-native';

export type Campaign = {
  id: string;
  title: string;
  subTitle: string;
  image: ImageSourcePropType;
  backgroundColor: string;
};

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Enter LUCNCHBOX50',
    subTitle: '50% Off | 11:00PM - 2:00PM',
    image: { uri: `https://picsum.photos/118` },
    backgroundColor: '#FB6930',
  },
  {
    id: '2',
    title: 'Enter FREESHIP10',
    subTitle: 'FREESHIP in District 10',
    image: { uri: `https://picsum.photos/114` },
    backgroundColor: '#75CCD3',
  },
  {
    id: '3',
    title: 'Enter FREEBREAKFAST',
    subTitle: 'FREE | 6:00AM - 10:00AM',
    image: { uri: `https://picsum.photos/112` },
    backgroundColor: '#FB6930',
  },
  {
    id: '4',
    title: 'Enter HAPPYMEAL',
    subTitle: '70% Off | 1:00PM - 3:00PM',
    image: { uri: `https://picsum.photos/117` },
    backgroundColor: '#28BBC7',
  },
];
