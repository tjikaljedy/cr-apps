import * as React from 'react';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';

import {
  Text,
  Container,
  Touchable,
  Carousel,
  Icon,
  Dialog,
} from '@src/components/elements';
import {mockStories, Story} from '@src/data/mock-stories';
import {profile} from '@src/data/mock-profile';
import styles from './styles';

//Default
type StoriesProps = {};

const Stories: React.FC<StoriesProps> = () => {
  //Default
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const {
    colors: {primary},
  } = useTheme();

  const _onAddItemPressed = (name?: string) => {
    return () => {
      navigation.navigate('AcquireScreen' as any);
    };
  };

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
          numberOfLines={1}>{`Add story`}</Text>
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
    </Container>
  );
};

export default Stories;
