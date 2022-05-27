import * as React from 'react';
import {useTheme} from '@src/hooks';
import {TextField, List, Divider} from '@src/components/elements';
import {View} from 'react-native';
import {savedAddresses, Address} from '@src/data/mock-address';
import styles from './styles';

type AddAddressProps = {};

const AddAddress: React.FC<AddAddressProps> = () => {
  const {colors} = useTheme();

  const _prepareListData = (addresses: Address[]) => {
    return addresses.map((item) => {
      const {id, description, name} = item;
      return {
        id,
        title: name,
        titleColor: colors.text,
        subTitleColor: colors.primary,
        subTitle: description,
      };
    });
  };

  const _renderListHeader = () => {
    return (
      <>
        <View style={styles.searchTextFieldContainer}>
          <TextField placeholder="Enter Address" leftIcon="map-marker-alt" />
        </View>
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

export default AddAddress;
