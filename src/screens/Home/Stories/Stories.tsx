import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';

import {
  Text,
  Container,
  Touchable,
  Carousel,
  Icon,
  Dialog,
} from '@src/components/elements';
import {useTheme} from '@src/hooks';
import {fetchDefault} from '@store/slices/cameraSlice';
import {useAppSelector} from '@src/redux/useRedux';
import {mockStories, Story} from '@src/data/mock-stories';
import {profile} from '@src/data/mock-profile';
import styles from './styles';
import StoriesCameraModal from './StoriesCameraModal';

//Default
type StoriesProps = {};

const Stories: React.FC<StoriesProps> = () => {
  const navigation = useNavigation();
  const defaultValue = useAppSelector(fetchDefault);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const {
    colors: {primary},
  } = useTheme();

  const _hideModal = () => {
    setIsModalVisible(false);
  };

  const _onCameraSelectMode = React.useCallback((item: any) => {
    setIsModalVisible(false);

    return item.value === 'ar'
      ? navigation.navigate('AcquireARScreen' as any)
      : navigation.navigate('AcquireScreen' as any);
  }, []);

  const _onAddItemPressed = React.useCallback(
    (name?: string) => {
      return () =>
        defaultValue.value === 'prompt'
          ? setIsModalVisible(true)
          : _onCameraSelectMode(defaultValue);
    },
    [defaultValue],
  );

  const _renderProfileStory = () => {
    return (
      <Container style={[styles.storiesItemProfile]}>
        <Image
          style={[styles.storiesImage, {borderColor: primary}]}
          source={profile.avatar}
        />
      </Container>
    );
  };

  const _renderContentStory = (stories: Story) => {
    const {id, name, email, phone, avatar, coverPhoto} = stories;
    return (
      <Container style={styles.storiesItemContainer}>
        <Touchable onPress={_onAddItemPressed(name)}>
          <Image
            style={[styles.storiesImage, {borderColor: primary}]}
            source={avatar}
          />
        </Touchable>
        <Text style={styles.storiesTitle} numberOfLines={1}>
          {name}
        </Text>
      </Container>
    );
  };

  return (
    <Container style={styles.storiesContainer}>
      <Container style={styles.storiesAddItemContainer}>
        <Touchable onPress={_onAddItemPressed()}>
          <Container style={[styles.storiesAddItem, {borderColor: primary}]}>
            <Icon
              name={'add-outline'}
              solid
              size={36}
              useIonicons
              style={[styles.storiesAddItemIcon, {color: primary}]}
            />
          </Container>
        </Touchable>
        <Text
          style={styles.storiesAddItemTitle}
          numberOfLines={1}>{`Add Stories`}</Text>
      </Container>
      <Container style={styles.storiesItemOthers}>
        <Carousel
          data={mockStories}
          renderContent={_renderContentStory}
          itemWidth={80}
          enableSnap={false}
          hasPagination={false}
        />
      </Container>
      <StoriesCameraModal
        isVisible={isModalVisible}
        hideModal={_hideModal}
        onItemPressed={_onCameraSelectMode}
      />
    </Container>
  );
};

export default Stories;
