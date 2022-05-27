import * as React from 'react';
import {ScrollView, Image} from 'react-native';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import {activityHistoryDetail} from '@src/data/mock-activity-history';
import {Divider, Container, Icon, Button, Text} from '@src/components/elements';
import {useTheme} from '@src/hooks';
import StepIndicator from 'react-native-step-indicator';
import {StepIndicatorStyles} from 'react-native-step-indicator/lib/typescript/src/types';
import OrderSummary from './OrderSummary';
import styles from './styles';

type ActivityHistoryDetailProps = {};

const ActivityHistoryDetail: React.FC<ActivityHistoryDetailProps> = () => {
  const {colors} = useTheme();

  const labels = [activityHistoryDetail.from, activityHistoryDetail.to];

  const stepIndicatorStyles: StepIndicatorStyles = {
    currentStepIndicatorSize: 35,
    stepStrokeCurrentColor: colors.background,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.secondary,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: colors.background,
    stepIndicatorCurrentColor: colors.background,
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: colors.text,
    stepIndicatorLabelFinishedColor: 'white',
    stepIndicatorLabelUnFinishedColor: colors.text,
    labelColor: colors.text,
    labelAlign: 'flex-start',
    currentStepLabelColor: colors.text,
    separatorStrokeWidth: 2,
  };

  const renderLabel = (params: {position: number; stepStatus: string}) => {
    const {position} = params;
    switch (position) {
      case 0:
        return <Icon name="utensils" isPrimary />;
      case 1:
        return <Icon name="map-marker-alt" isPrimary />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <ListRowItem
        title={activityHistoryDetail.restaurantName}
        titleColor={colors.text}
        note={`Booking ID: ${activityHistoryDetail.bookingId}`}
        subTitle={`Status: ${activityHistoryDetail.status}`}
        subTitleColor={colors.primary}
        leftIcon={
          <Image
            source={{uri: 'https://picsum.photos/1005'}}
            style={styles.icon}
          />
        }
      />
      <Divider />
      <Container style={styles.locationTrackingContainer}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          labels={labels}
          direction="vertical"
          stepCount={2}
          renderStepIndicator={renderLabel}
        />
      </Container>
      <Divider />
      <OrderSummary orderDetail={activityHistoryDetail.orderDetail} />
      <Container style={styles.footer}>
        <Button isFullWidth>
          <Text isWhite>Contact Us</Text>
        </Button>
      </Container>
    </ScrollView>
  );
};

export default ActivityHistoryDetail;
