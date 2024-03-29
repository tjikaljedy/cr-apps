import * as React from 'react';
import {useFocusEffect, useScrollToTop} from '@react-navigation/native';
import {ScrollView, InteractionManager} from 'react-native';
import {SafeAreaView} from 'react-native';
import {LoadingIndicator} from '@src/components/elements';
import PopularPlaces from './PopularPlaces';
import RecommendedPlaces from './RecommendedPlaces';
import MerchantCampaigns from './MerchantCampaigns';
import Stories from './Stories';
import HotDeals from './HotDeals';
import RemarkablePlaces from './RemarkablePlaces';
import AppReviewModal from '@src/components/common/AppReviewModal';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [isNavigationTransitionFinished, setIsNavigationTransitionFinished] =
    React.useState(false);
  const scrollViewRef = React.useRef(null);
  useScrollToTop(scrollViewRef);
  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setIsNavigationTransitionFinished(true);
      });
      return () => task.cancel();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView ref={scrollViewRef} stickyHeaderIndices={[0]}>
        <Stories />
        {isNavigationTransitionFinished ? (
          <>
            <PopularPlaces />
            <MerchantCampaigns />
            <RecommendedPlaces />
            <HotDeals />
            <RemarkablePlaces />
          </>
        ) : (
          <LoadingIndicator size="large" hasMargin />
        )}
      </ScrollView>
      <AppReviewModal daysBeforeReminding={1} />
    </SafeAreaView>
  );
};

export default Home;
