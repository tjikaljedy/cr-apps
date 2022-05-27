import * as React from 'react';
import {FlatList, FlatListProps, ListRenderItem} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import Divider from '../Divider';
import {useTheme} from '@src/hooks';
import ListRowItem, {ListRowItemProps} from './ListRowItem';
import styles from './styles';

interface OwnProps {
  data: ListRowItemProps[];
}

type ListProps = OwnProps & Partial<FlatListProps<any>>;

const List: React.FC<ListProps> = ({data, renderItem, ...rest}) => {
  const {colors} = useTheme();
  const listRef = React.useRef(null);

  useScrollToTop(listRef);

  const _renderDefaultItem: ListRenderItem<ListRowItemProps> = ({item}) => {
    return <ListRowItem {...item} />;
  };

  return (
    <FlatList
      {...rest}
      ref={listRef}
      keyExtractor={(item, index) => `${item.id} - ${index}`}
      data={data}
      contentContainerStyle={[
        {
          backgroundColor: colors.card,
        },
        styles.contentContainer,
      ]}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem || _renderDefaultItem}
    />
  );
};

export default List;
