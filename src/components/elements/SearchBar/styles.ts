import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 5,
  },
  searchRightIcon: {
    marginLeft: 10,
  },
  searchContainerShadow: {
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.02,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
