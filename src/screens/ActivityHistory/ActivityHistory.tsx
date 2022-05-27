import * as React from 'react';
import {View, Image} from 'react-native';
import {List} from '@src/components/elements';
import {activityHistoryList} from '@src/data/mock-activity-history';
import styles from './styles';
import {formatCurrency} from '@src/utils/number-formatter';
import {ListRowItemProps} from '@src/components/elements/List/ListRowItem';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@src/hooks';
type ActivityHistoryProps = {};

const ActivityHistory: React.FC<ActivityHistoryProps> = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const data: ListRowItemProps[] = activityHistoryList.map((item) => {
    const {
      restaurantName,
      date,
      orderDetail: {totalItems, price},
      bookingId,
    } = item;
    return {
      id: bookingId,
      title: restaurantName,
      titleColor: colors.text,
      subTitleColor: colors.primary,
      subTitle: `${totalItems} items | ${formatCurrency(totalItems * price)}`,
      note: date,
      onPress: () => navigation.navigate('ActivityHistoryDetailScreen' as any),
      leftIcon: (
        <Image
          source={{uri: `https://picsum.photos/148`}}
          style={styles.listItemImage}
        />
      ),
    };
  });
  return (
    <View style={styles.root}>
      <List data={data} />
    </View>
  );
};

export default ActivityHistory;
