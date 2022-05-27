import * as React from 'react';
import {Section, Icon, Divider} from '@src/components/elements';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import {Switch} from 'react-native';
import {useTheme} from '@src/hooks';
type LinkedAccountsProps = {};

const LinkedAccounts: React.FC<LinkedAccountsProps> = () => {
  const {colors} = useTheme();
  const [isGoogleAccountLinked, setIsGoogleAccountLinked] =
    React.useState(false);
  const [isFacebookAccountLinked, setIsFacebookAccountLinked] =
    React.useState(true);
  const [isAppleAccountLinked, setIsAppleAccountLinked] = React.useState(false);

  return (
    <Section title="Linked Accounts" titleColor={colors.text}>
      <ListRowItem
        title="Google"
        titleColor={colors.text}
        leftIcon={<Icon name="google" size={18} />}
        rightIcon={
          <Switch
            value={isGoogleAccountLinked}
            onValueChange={(value) => setIsGoogleAccountLinked(value)}
          />
        }
      />
      <Divider />
      <ListRowItem
        title="Facebook"
        titleColor={colors.text}
        leftIcon={<Icon name="facebook" size={18} />}
        rightIcon={
          <Switch
            value={isFacebookAccountLinked}
            onValueChange={(value) => setIsFacebookAccountLinked(value)}
          />
        }
      />
      <Divider />
      <ListRowItem
        title="Apple"
        titleColor={colors.text}
        leftIcon={<Icon name="apple" size={18} />}
        rightIcon={
          <Switch
            value={isAppleAccountLinked}
            onValueChange={(value) => setIsAppleAccountLinked(value)}
          />
        }
      />
    </Section>
  );
};

export default LinkedAccounts;
