import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Dialog, RadioButton} from '@src/components/elements';
import {RadioOption} from '@src/components/elements/RadioButton/RadioButton';
import {useTheme} from '@src/hooks';
import {changeTheme, setDefaultTheme} from '@store/slices/themeSlice';

type ChangeAppearanceModalProps = {
  isVisible: boolean;
  hideModal: () => void;
};

const appearanceOptions: RadioOption[] = [
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Light',
    value: 'light',
  },
];

const ChangeAppearanceModal: React.FC<ChangeAppearanceModalProps> = ({
  isVisible,
  hideModal,
}) => {
  const {theme, useSystemTheme} = useTheme();
  const dispatch = useDispatch();
  let defaultValue = theme;
  if (useSystemTheme) {
    defaultValue = 'system';
  }

  const _onItemPressed = (item: RadioOption) => {
    const selectedTheme = item.value;
    if (selectedTheme !== 'system') {
      dispatch(
        changeTheme({theme: selectedTheme as any, useSystemTheme: false}),
      );
    } else {
      dispatch(setDefaultTheme({theme: 'no-preference', useSystemTheme: true}));
    }
  };

  return (
    <Dialog
      title="Change Appearance"
      isVisible={isVisible}
      onBackdropPress={hideModal}>
      <RadioButton
        data={appearanceOptions}
        onItemPressed={_onItemPressed}
        defaultValue={defaultValue}
      />
    </Dialog>
  );
};

export default ChangeAppearanceModal;
