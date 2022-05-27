import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@src/hooks';
import {Carousel, Section, Card} from '@src/components/elements';
import {Dimensions} from 'react-native';
import {mockPlaces, Place} from '@src/data/mock-places';
import PlaceCardInfo from '@src/components/common/PlaceCardInfo';

type PopularPlacesProps = {};

const PopularPlaces: React.FC<PopularPlacesProps> = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const _onButtonActionPressed = () => {
    navigation.navigate(
      'PlaceListScreen' as any,
      {title: 'Popular Near You'} as any,
    );
  };

  const _onPlaceItemPressed = () => {
    navigation.navigate('PlaceDetailsScreen' as any);
  };

  return (
    <Section
      title="Popular Near You"
      titleColor={colors.text}
      actionButtonText="View more"
      onButtonActionPressed={_onButtonActionPressed}>
      <Carousel
        data={mockPlaces}
        hasParallaxImages
        itemWidth={Dimensions.get('window').width - 50}
        renderContent={(item: Place, index, parallaxProps) => {
          const {image, title, subTitle} = item;
          return (
            <Card
              coverImage={image}
              title={title}
              subTitle={subTitle}
              parallaxProps={parallaxProps}
              onPress={_onPlaceItemPressed}>
              <PlaceCardInfo data={item} />
            </Card>
          );
        }}
      />
    </Section>
  );
};

export default PopularPlaces;
