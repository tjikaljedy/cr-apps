import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Section, Card, Text} from '@src/components/elements';
import {Dimensions} from 'react-native';
import {useTheme} from '@src/hooks';
import {mockPlaces, Place} from '@src/data/mock-places';

type PopularDishesProps = {};

const PopularDishes: React.FC<PopularDishesProps> = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const _onButtonActionPressed = () => {
    navigation.navigate(
      'PlaceListScreen' as any,
      {title: "What's Popular Here"} as any,
    );
  };

  const _onPlaceItemPressed = () => {
    navigation.navigate('DishDetailsModal' as any);
  };

  return (
    <Section
      title="What's Popular Here"
      titleColor={colors.text}
      actionButtonText="View more"
      onButtonActionPressed={_onButtonActionPressed}>
      <Carousel
        data={mockPlaces}
        itemWidth={Dimensions.get('window').width / 2 - 15}
        renderContent={(item: Place, _, parallaxProps) => {
          const {image, title, subTitle} = item;
          return (
            <Card
              coverImage={image}
              isSmallCover
              title={title}
              subTitle={subTitle}
              parallaxProps={parallaxProps}
              onPress={_onPlaceItemPressed}>
              <Text isPrimary isBold>
                $14.4
              </Text>
            </Card>
          );
        }}
      />
    </Section>
  );
};

export default PopularDishes;
