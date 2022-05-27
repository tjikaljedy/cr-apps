import * as React from 'react';
import { Image } from 'react-native';
import { Carousel, Container, Text } from '@src/components/elements';
import {
  mockCampaigns,
  Campaign,
} from '@src/data/mock-campaigns';
import styles from './styles';

type MerchantCampaignsProps = {};

const MerchantCampaigns: React.FC<MerchantCampaignsProps> = () => {
  const _renderContent = (campaign: Campaign) => {
    const { id, image, title, subTitle, backgroundColor } = campaign;
    return (
      <Container
        key={id}
        style={[styles.campaignItem, { backgroundColor: backgroundColor }]}>
        <Image source={image} style={styles.campaignImage} />
        <Container style={styles.campaignTitleContainer}>
          <Text style={styles.campaignTitle}>{title}</Text>
          <Text style={styles.campaignSubTitle}>{subTitle}</Text>
        </Container>
        <Container />
      </Container>
    );
  };

  return (
    <Container style={styles.merchantCampaignContainer}>
      <Carousel
        data={mockCampaigns}
        renderContent={_renderContent}
        itemWidth={275}
        enableSnap={false}
      />
    </Container>
  );
};

export default MerchantCampaigns;
