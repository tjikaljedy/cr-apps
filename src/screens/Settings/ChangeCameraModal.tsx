import * as React from 'react';
import {Dialog, RadioButton} from '@src/components/elements';
import {RadioOption} from '@src/components/elements/RadioButton/RadioButton';
import {changeDefault, fetchDefault} from '@store/slices/cameraSlice';
import {useAppDispatch, useAppSelector} from '@src/redux/useRedux';
type ChangeCameraModalProps = {
  isVisible: boolean;
  hideModal: () => void;
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
  {
    label: 'Prompt',
    value: 'prompt',
  },
];

const ChangeCameraModal: React.FC<ChangeCameraModalProps> = ({
  isVisible,
  hideModal,
}) => {
  const dispatch = useAppDispatch();
  let defaultValue = useAppSelector(fetchDefault);
  const _onItemPressed = (item: RadioOption) => {
    dispatch(changeDefault(item as any));
  };

  return (
    <Dialog
      title="Change Camera Mode"
      isVisible={isVisible}
      onBackdropPress={hideModal}>
      <RadioButton
        data={cameraOptions}
        onItemPressed={_onItemPressed}
        defaultValue={defaultValue.value}
      />
    </Dialog>
  );
};

export default ChangeCameraModal;
