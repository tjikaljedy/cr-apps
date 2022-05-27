import * as React from 'react';
import {savedAddresses, Address} from '@src/data/mock-address';
import List from '@src/components/elements/List/List';
import {Icon, Divider} from '@src/components/elements';
import ListRowItem, {
  ListRowItemProps,
} from '@src/components/elements/List/ListRowItem';
import {useNavigation} from '@react-navigation/native';
import {I18nManager} from 'react-native';
import {useTheme} from '@src/hooks';

type ChangeAddressProps = {};
const chevronIconName = I18nManager.isRTL ? 'chevron-left' : 'chevron-right';

const savedPlaceListItem: ListRowItemProps = {
  id: '1',
  title: 'Saved Places',
  subTitle: 'Select a delivery address easily',
  leftIcon: <Icon name="bookmark" size={16} />,
  rightIcon: <Icon name={chevronIconName} size={16} />,
};

const useCurrentLocationListItem: ListRowItemProps = {
  id: '1',
  title: 'Use Current Location',
  subTitle: '588 Blanda Square - Virginia',
  leftIcon: <Icon name="crosshairs" size={16} />,
};

const ChangeAddress: React.FC<ChangeAddressProps> = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const _prepareListData = (addresses: Address[]) => {
    return addresses.map((item) => {
      const {id, description, name} = item;
      return {
        id,
        title: name,
        titleColor: colors.text,
        subTitleColor: colors.primary,
        subTitle: description,
        rightIcon: <Icon name="bookmark" size={16} />,
      };
    });
  };

  const _savedPlaceListItemPressed = () => {
    navigation.navigate('SavedAddressesScreen' as any);
  };

  const _renderListHeader = () => {
    return (
      <>
        <ListRowItem
          titleColor={colors.text}
          subTitleColor={colors.primary}
          {...savedPlaceListItem}
          onPress={_savedPlaceListItemPressed}
        />
        <Divider />
        <ListRowItem
          titleColor={colors.text}
          subTitleColor={colors.primary}
          {...useCurrentLocationListItem}
        />
        <Divider />
      </>
    );
  };

  return (
    <List
      data={_prepareListData(savedAddresses)}
      ListHeaderComponent={_renderListHeader()}
    />
  );
};

export default ChangeAddress;
