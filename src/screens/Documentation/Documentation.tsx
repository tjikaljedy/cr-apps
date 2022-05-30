import {Text} from '@src/components/elements';
import * as React from 'react';
import {I18nManager} from 'react-native';
import {SafeAreaView} from 'react-native';
import styles from './styles';

type DocumentationProps = {};

const Documentation: React.FC<DocumentationProps> = () => {
  return (
    <SafeAreaView style={styles.root}>
      {I18nManager.isRTL && (
        <Text isPrimary isBold style={styles.title}>
          Sorry, we haven't supported RTL layout for this page yet. Please
          disable RTL layout in the Settings screen and check again.
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Documentation;
