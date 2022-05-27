import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PermissionContext from '@src/context/permission-context';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Text, Icon, Container, Section, Button} from '@src/components/elements';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import {CONTENT_SPACING, SAFE_AREA_PADDING} from '@src/constants';
import {PERMISSIONS_VALUES, PERMISSION_MSG} from '@src/constants/types';
type PermissionCameraProps = {};

const _PermissionCamera: React.FC<PermissionCameraProps> = () => {
  const {request, statuses, isPass} = React.useContext(PermissionContext);
  if (isPass) {
    return null;
  }
  const [isShow, setIsShow] = React.useState(isPass ? -1 : 1);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['53%', '53%'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        style={{backgroundColor: 'black'}}
        opacity={0.5}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        pressBehavior={'none'}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isShow}
      style={styles.permissionsContainer}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}>
      <Container style={styles.permissionsSection}>
        <Section title="You need to grant the following accessbility permissions.">
          <ScrollView>
            {PERMISSIONS_VALUES.map((item, index) => {
              const value = PERMISSIONS_VALUES[index];
              const message = PERMISSION_MSG[index];
              const status =
                statuses[value] === 'granted' ? 'check-circle' : 'ban';

              return (
                <ListRowItem
                  containerStyle={{backgroundColor: 'white'}}
                  key={`${index}`}
                  title={message.title}
                  leftIcon={
                    <Icon
                      name={message.icon}
                      size={18}
                      style={{color: '#333333'}}
                    />
                  }
                  rightIcon={
                    <Icon
                      name={status}
                      size={18}
                      color={status === 'check-circle' ? 'green' : 'red'}
                    />
                  }
                  onPress={() => {
                    request(value);
                  }}
                />
              );
            })}
          </ScrollView>
          <Container style={styles.buttonContainer}>
            <Button childrenContainerStyle={styles.addToBasketButton}>
              <Text style={styles.addToBasketButtonText}>Back</Text>
            </Button>
          </Container>
        </Section>
      </Container>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  permissionsSection: {
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
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

export const PermissionCamera = React.memo(_PermissionCamera);
