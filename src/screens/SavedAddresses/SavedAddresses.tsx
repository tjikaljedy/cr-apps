import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@src/hooks';
import {Container, Section, Divider, Icon} from '@src/components/elements';
import {ScrollView} from 'react-native-gesture-handler';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import {favoriteAddresses} from '@src/data/mock-address';
import styles from './styles';
import {View} from 'react-native';

type SavedAddressesProps = {};

const SavedAddresses: React.FC<SavedAddressesProps> = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const _addAddressItemPressed = () => {
    navigation.navigate('AddAddressScreen' as any);
  };

  return (
    <ScrollView>
      <Section title="Favorites" titleColor={colors.text}>
        <Container style={styles.container}>
          {favoriteAddresses.map((item, index) => {
            const {id, name, description, isHome, isWork} = item;
            let leftIcon;
            if (isHome) {
              leftIcon = <Icon name="home" size={16} />;
            } else if (isWork) {
              leftIcon = <Icon name="briefcase" size={16} />;
            }
            return (
              <View key={index}>
                <ListRowItem
                  id={id}
                  title={name}
                  titleColor={colors.text}
                  subTitle={description}
                  subTitleColor={colors.primary}
                  leftIcon={leftIcon}
                />
                <Divider />
              </View>
            );
          })}
          <ListRowItem
            title="Add an Address"
            subTitle="Save your favourite places"
            titleColor={colors.text}
            subTitleColor={colors.primary}
            onPress={_addAddressItemPressed}
          />
        </Container>
      </Section>
    </ScrollView>
  );
};

export default SavedAddresses;
