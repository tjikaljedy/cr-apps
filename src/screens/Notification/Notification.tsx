import * as React from 'react';
import {I18nManager, ScrollView, View, Text} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import {Icon, Divider} from '@src/components/elements';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import {useTheme} from '@src/hooks';
import {notifications, Notification} from '@src/data/mock-notification';
import styles from './styles';

type NotificationScreenProps = {};

const NotificationScreen: React.FC<NotificationScreenProps> = () => {
  const chevronIconName = I18nManager.isRTL ? 'chevron-left' : 'chevron-right';
  const {colors} = useTheme();
  const scrollViewRef = React.useRef(null);

  useScrollToTop(scrollViewRef);

  return (
    <ScrollView ref={scrollViewRef}>
      {notifications.map((item: Notification) => {
        return (
          <View key={item.id}>
            <ListRowItem
              titleColor={colors.text}
              subTitleColor={colors.primary}
              leftIcon={
                <View
                  style={[
                    {backgroundColor: colors.primary},
                    styles.notificationIconContainer,
                  ]}>
                  <Icon name="envelope" solid color="white" />
                </View>
              }
              rightIcon={<Icon name={chevronIconName} />}
              {...item}
            />
            <Divider />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default NotificationScreen;
