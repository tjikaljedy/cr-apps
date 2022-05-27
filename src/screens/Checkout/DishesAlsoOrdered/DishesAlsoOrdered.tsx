import * as React from 'react';
import {Section, Carousel, Container} from '@src/components/elements';
import {mockDishDetails, DishSection} from '@src/data/mock-places';
import {Dimensions} from 'react-native';
import {useTheme} from '@src/hooks';
import DishItem from '@src/components/common/DishItem';
import styles from './styles';

type DishesAlsoOrderedProps = {};

const DishesAlsoOrdered: React.FC<DishesAlsoOrderedProps> = () => {
  const {colors} = useTheme();
  return (
    <Section title="People also ordered" titleColor={colors.text}>
      <Container style={styles.carouselContainer}>
        <Carousel
          data={mockDishDetails.sideDishes || []}
          itemWidth={Dimensions.get('window').width - 50}
          renderContent={(dishSection: DishSection) => {
            const dishes = dishSection.data[0];
            return <DishItem data={dishes} />;
          }}
        />
      </Container>
    </Section>
  );
};

export default DishesAlsoOrdered;
