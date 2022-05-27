import * as React from 'react';
import Container from '../Container';
import TextField from '../TextField';
import styles from './styles';
import Icon from '@src/components/elements/Icon';
import {useTheme} from '@src/hooks';

type SearchBarProps = {
  leftIconSize?: number;
  leftIconName?: string;
  rightIconSize?: number;
  rightIconName?: string;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  leftIconName,
  placeholder,
  rightIconName,
  leftIconSize,
  rightIconSize,
}) => {
  const {
    colors: {card},
  } = useTheme();
  return (
    <Container style={[styles.searchContainer, {backgroundColor: card}]}>
      <TextField
        leftIcon={leftIconName}
        leftIconSize={leftIconSize}
        placeholder={placeholder}
      />
      {rightIconName && (
        <Icon
          name={rightIconName}
          size={rightIconSize}
          isPrimary
          useIonicons
          style={[styles.searchRightIcon]}
        />
      )}
    </Container>
  );
};

SearchBar.defaultProps = {
  leftIconName: 'search',
  placeholder: 'Search',
  leftIconSize: 14,
  rightIconSize: 24,
};

export default SearchBar;
