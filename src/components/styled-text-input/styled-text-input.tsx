import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { emptyFn } from '../../config/general';
import { formatSize } from '../../styles/format-size';
import { useColors } from '../../styles/use-colors';
import { IconNameEnum } from '../icon/icon-name.enum';
import { TouchableIcon } from '../icon/touchable-icon/touchable-icon';
import { useStyledTextInputStyles } from './styled-text-input.styles';

export interface StyledTextInputProps extends Omit<TextInputProps, 'style'> {
  isError?: boolean;
  isShowCleanButton?: boolean;
  isPasswordInput?: boolean;
}

export const StyledTextInput = forwardRef<TextInput, StyledTextInputProps>(
  (
    {
      onChangeText = emptyFn,
      isShowCleanButton = false,
      isError = false,
      isPasswordInput = false,
      value,
      multiline,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const styles = useStyledTextInputStyles();
    const colors = useColors();

    return (
      <View style={styles.view}>
        <TextInput
          ref={ref}
          style={[
            multiline ? styles.multiline : styles.regular,
            isError && styles.error,
            secureTextEntry && styles.passwordFontSize,
            isPasswordInput && styles.passwordPadding
          ]}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          placeholderTextColor={colors.gray3}
          selectionColor={colors.orange}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        {isShowCleanButton && !!value && (
          <TouchableIcon
            size={formatSize(16)}
            name={IconNameEnum.XCircle}
            style={styles.cleanButton}
            onPress={() => onChangeText('')}
          />
        )}
      </View>
    );
  }
);
