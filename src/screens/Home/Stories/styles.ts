import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  storiesContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10
  },
  storiesAddItem: {
    borderRadius: 1,
    borderWidth: 3,
    borderStyle: 'dotted',
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    marginLeft: 15,
    height: 57,
    width: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storiesAddItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  storiesAddItemIcon: {
    alignSelf: 'center',
    marginLeft: 2
  },
  storiesAddItemTitle: {
    fontSize: 9,
    marginTop: 2,
    marginLeft: 15
  },
  storiesItemContainer: {
    flexShrink: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: "center"
  },
  storiesItemProfile: {
    padding: 10,
  },
  storiesItemOthers: {
    marginLeft: 10,
    marginTop: 0
  },
  storiesImage: {
    height: 57,
    width: 57,
    borderWidth: 1.5,
    borderRadius: 9,
  },
  storiesTitle: {
    alignSelf: 'center',
    fontSize: 9,
    marginTop: 2,
  },
  storiesModal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  }
});
