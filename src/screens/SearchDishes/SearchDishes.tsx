import * as React from 'react';
import {
  Button,
  Container,
  Icon,
  SearchBar,
  Text,
} from '@src/components/elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SectionList, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import DishItem from '@src/components/common/DishItem';
import {useTheme} from '@src/hooks';
import {mockPlaceDetails} from '@src/data/mock-places';

type SearchDishesProps = {};

const SearchDishes: React.FC<SearchDishesProps> = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const onCloseButtonClick = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <Container style={styles.searchBarContainer}>
        <View style={styles.closeIconContainer}>
          <Button isTransparent onPress={onCloseButtonClick}>
            <Icon useIonicons name="close" size={20} />
          </Button>
        </View>
        <View style={styles.searchBarIconContainer}>
          <SearchBar placeholder="Search a dish name" />
        </View>
      </Container>
      <SectionList
        style={{
          backgroundColor: colors.background,
        }}
        sections={mockPlaceDetails.dishSection || []}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => (
          <Container
            style={[styles.separator, {backgroundColor: colors.border}]}
          />
        )}
        renderSectionHeader={({section}) => (
          <View
            style={{
              backgroundColor: colors.background,
            }}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({item}) => {
          return <DishItem data={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default SearchDishes;
