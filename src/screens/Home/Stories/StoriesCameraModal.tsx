import * as React from 'react';
import {PlatformColor} from 'react-native';
import {Dialog, RadioButton} from '@src/components/elements';

import {RadioOption} from '@src/components/elements/RadioButton/RadioButton';
import {fetchDefault} from '@store/slices/cameraSlice';
import {useAppSelector} from '@src/redux/useRedux';

type StoriesCameraModalProps = {
  isVisible: boolean;
  hideModal: () => void;
  onModalHide?: (item: any) => void;
  onItemPressed: (item: any) => void;
};

const cameraOptions: RadioOption[] = [
  {
    label: 'Device',
    value: 'device',
  },
  {
    label: 'AR',
    value: 'ar',
  },
];

const StoriesCameraMoodal: React.FC<StoriesCameraModalProps> = ({
  isVisible,
  hideModal,
  onModalHide,
  onItemPressed,
}) => {
  const defaultValue = useAppSelector(fetchDefault);

  React.useEffect(() => {
    isVisible = defaultValue.value === 'prompt';
  }, [isVisible]);

  return (
    <Dialog
      hideModalContentWhileAnimating={true}
      title="Pick Camera Mode"
      isVisible={isVisible}
      onModalHide={onModalHide as never}
      onBackdropPress={hideModal}>
      <RadioButton data={cameraOptions} onItemPressed={onItemPressed} />
    </Dialog>
  );
};

export default StoriesCameraMoodal;
