import * as React from 'react';
import {
  Switch,
  View,
  ScrollView,
  Linking,
  I18nManager,
  Alert,
} from 'react-native';
import {Text, Icon, Divider, Section} from '@src/components/elements';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import styles from './styles';
import ChangeAppearanceModal from './ChangeAppearanceModal';
import ChangeLanguageModal from './ChangeLanguageModal';
import ChangeCameraModal from './ChangeCameraModal';
import {useTheme} from '@src/hooks';
import {fetchDefault} from '@store/slices/cameraSlice';
import {useAppSelector} from '@src/redux/useRedux';
import {getStoreURL} from '@src/utils/store-info';

type SettingsProps = {};

const Settings: React.FC<SettingsProps> = () => {
  const {theme, colors, useSystemTheme} = useTheme();
  const [enableRTL, setEnableRTL] = React.useState(false);
  const [isAppearanceModalVisible, setIsAppearanceModalVisible] =
    React.useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] =
    React.useState(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = React.useState(false);
  const defaultCamera = useAppSelector(fetchDefault);

  React.useEffect(() => {
    setEnableRTL(I18nManager.isRTL);
  }, []);

  const _hideAppearanceModal = () => {
    setIsAppearanceModalVisible(false);
  };

  const _hideLanguageModal = () => {
    setIsLanguageModalVisible(false);
  };
  const _hideCameraModal = () => {
    setIsCameraModalVisible(false);
  };

  const chevronIconName = I18nManager.isRTL ? 'chevron-left' : 'chevron-right';

  const _renderAppSettingsSection = () => {
    return (
      <Section title="App Settings" titleColor={colors.primary}>
        <ListRowItem
          title="Appearance"
          titleColor={colors.text}
          onPress={() => setIsAppearanceModalVisible(true)}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Text style={styles.settingOptionText}>
                {useSystemTheme ? 'System' : theme}
              </Text>
              <Icon name={chevronIconName} />
            </View>
          }
        />
        <Divider />
        <ListRowItem
          title="RTL Layout"
          titleColor={colors.text}
          rightIcon={
            <Switch
              value={enableRTL}
              onValueChange={() => {
                setEnableRTL(!enableRTL);
                I18nManager.forceRTL(!enableRTL);
                Alert.alert(
                  'Reload this page',
                  'Please reload this page to change the UI direction! ',
                );
              }}
            />
          }
        />
        <Divider />
        <ListRowItem
          title="Language"
          titleColor={colors.text}
          onPress={() => setIsLanguageModalVisible(true)}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Text style={styles.settingOptionText}>English</Text>
              <Icon name={chevronIconName} />
            </View>
          }
        />
        <Divider />
        <ListRowItem
          title="Camera Mode"
          titleColor={colors.text}
          onPress={() => setIsCameraModalVisible(true)}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Text style={styles.settingOptionTextUpper}>
                {defaultCamera.label}
              </Text>
              <Icon name={chevronIconName} />
            </View>
          }
        />
      </Section>
    );
  };

  const _renderMoreInformationSection = () => {
    return (
      <Section title="More Information" titleColor={colors.primary}>
        <ListRowItem
          title="About Us"
          titleColor={colors.text}
          onPress={() => Linking.openURL(getStoreURL())}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Icon name={chevronIconName} />
            </View>
          }
        />
        <Divider />
        <ListRowItem
          title="Rate The App"
          titleColor={colors.text}
          onPress={() => Linking.openURL(getStoreURL())}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Icon name={chevronIconName} />
            </View>
          }
        />
        <Divider />
        <ListRowItem
          title="Follow Us On Facebook"
          titleColor={colors.text}
          onPress={() => Linking.openURL(getStoreURL())}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Icon name={chevronIconName} />
            </View>
          }
        />
        <Divider />
        <ListRowItem
          title="Follow Us On Instagram"
          titleColor={colors.text}
          onPress={() => Linking.openURL(getStoreURL())}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Icon name={chevronIconName} />
            </View>
          }
        />
        <Divider />
        <ListRowItem
          title="Visit Our Website"
          titleColor={colors.text}
          onPress={() => Linking.openURL(getStoreURL())}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Icon name={chevronIconName} />
            </View>
          }
        />
        <Divider />
        <ListRowItem
          title="Contact Us"
          titleColor={colors.text}
          onPress={() => Linking.openURL(getStoreURL())}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Icon name={chevronIconName} />
            </View>
          }
        />
      </Section>
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        {_renderAppSettingsSection()}
        {_renderMoreInformationSection()}
      </ScrollView>
      <ChangeAppearanceModal
        isVisible={isAppearanceModalVisible}
        hideModal={_hideAppearanceModal}
      />
      <ChangeLanguageModal
        isVisible={isLanguageModalVisible}
        hideModal={_hideLanguageModal}
      />
      <ChangeCameraModal
        isVisible={isCameraModalVisible}
        hideModal={_hideCameraModal}
      />
    </View>
  );
};

export default Settings;
