import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Container, Section, Button} from '@src/components/elements';
import {CONTENT_SPACING, SAFE_AREA_PADDING} from '@src/constants';
import {useAppSelector} from '@src/redux/useRedux';
import {checkedArt} from '@src/redux/slices/artSlice';

type SnapDetailProps = {};

const SnapDetail: React.FC<SnapDetailProps> = () => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['28%', '28%'], []);
  const checkedItem = useAppSelector(checkedArt);

  const handleSheetChanges = React.useCallback((index: number) => {}, []);

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.1}
        pressBehavior={'close'}
      />
    ),
    [],
  );

  React.useEffect(() => {
    console.log('>>> hrere');
    bottomSheetRef.current?.expand();
  }, [checkedItem]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      style={styles.snapDetailContainer}
      snapPoints={snapPoints}
      backgroundStyle={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}>
      <Container style={styles.snapDetailSection}>
        <Section titleColor={'white'} title={'<title>'}></Section>
      </Container>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  snapDetailContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  snapDetailSection: {
    padding: 10,
    backgroundColor: '#00000000',
  },
  buttonContainer: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  addToBasketButton: {
    alignItems: 'center',
    width: '100%',
  },
  addToBasketButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 2,
    color: 'white',
  },
});

export default SnapDetail;
