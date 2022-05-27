import * as React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useTheme} from '@src/hooks';
import {List, Button, Text} from '@src/components/elements';
import {orderHistoryList} from '@src/data/mock-order-history';
import {ListRowItemProps} from '@src/components/elements/List/ListRowItem';

type OrderHistoryProps = {};

const OrderHistory: React.FC<OrderHistoryProps> = () => {
  const {colors} = useTheme();
  const data: ListRowItemProps[] = orderHistoryList.map((item) => {
    const {id, date, name, totalItems, totalPrice} = item;
    return {
      id,
      title: name,
      titleColor: colors.text,
      subTitle: `${totalItems} items | ${totalPrice}`,
      subTitleColor: colors.primary,
      note: date,
      rightContainerStyle: styles.rightItemContainerStyle,
      rightIcon: (
        <Button isTransparent>
          <Text isBold isPrimary>
            Reorder
          </Text>
        </Button>
      ),
    };
  });
  return (
    <View style={styles.root}>
      <List data={data} />
    </View>
  );
};

export default OrderHistory;
