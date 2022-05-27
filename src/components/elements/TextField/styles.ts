import { I18nManager, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 45,
  },
  leftIcon: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: I18nManager.isRTL ? 10 : 0,
  },
  textField: {
    flex: 1,
    paddingLeft: 12,
    borderRadius: 10,
    height: 45,
  },
});
