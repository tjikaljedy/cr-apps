import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between'
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerRightContainer: {
    paddingRight: 10,
  },
  locationIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
