import * as React from 'react';
import {Dialog, RadioButton} from '@src/components/elements';
import {RadioOption} from '@src/components/elements/RadioButton/RadioButton';

type ChangeLanguageModalProps = {
  isVisible: boolean;
  hideModal: () => void;
};

const languageOptions: RadioOption[] = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Indonesian',
    value: 'id',
  },
  {
    label: 'Hindi',
    value: 'hi-in',
  },
];

const ChangeLanguageModal: React.FC<ChangeLanguageModalProps> = ({
  isVisible,
  hideModal,
}) => {
  const _onItemPressed = (item: RadioOption) => {
    console.log('_onItemPressed -> item', item);
  };

  return (
    <Dialog
      title="Change Language"
      isVisible={isVisible}
      onBackdropPress={hideModal}>
      <RadioButton data={languageOptions} onItemPressed={_onItemPressed} />
    </Dialog>
  );
};

export default ChangeLanguageModal;
