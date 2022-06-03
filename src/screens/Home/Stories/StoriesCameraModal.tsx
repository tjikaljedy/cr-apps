import * as React from 'react';
import {Dialog, RadioButton} from '@src/components/elements';
import {RadioOption} from '@src/components/elements/RadioButton/RadioButton';

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
