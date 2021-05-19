import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { Animated, View } from 'react-native';

import { EventFn } from '../../config/general';
import { useAnimationRef } from '../../hooks/use-animation-ref.hook';
import { useLayoutWidth } from '../../hooks/use-layout-width.hook';
import { tileMargin, useSegmentedControlStyles } from './segmented-control.styles';

export interface SegmentedControlProps<T> {
  selectedIndex: number;
  values: T[];
  width?: number;
  onChange: EventFn<number>;
}

interface Props<T> extends SegmentedControlProps<T> {
  renderValue: SegmentedControlValueComponent<T>;
}

export type SegmentedControlValueComponent<T> = FC<{
  item: T;
  isSelected: boolean;
}>;

export const SegmentedControl = <T extends unknown>({
  selectedIndex,
  values,
  renderValue,
  width,
  onChange
}: PropsWithChildren<Props<T>>) => {
  const styles = useSegmentedControlStyles();
  const translateX = useAnimationRef();
  const { layoutWidth, handleLayout } = useLayoutWidth();

  const tileWidth = (layoutWidth - 2 * tileMargin) / (values.length || 1);

  useEffect(
    () =>
      Animated.spring(translateX, {
        toValue: selectedIndex * tileWidth,
        stiffness: 150,
        damping: 20,
        mass: 1,
        useNativeDriver: true
      }).start(),
    [selectedIndex, tileWidth]
  );

  return (
    <View style={[styles.container, { width }]} onLayout={handleLayout}>
      <Animated.View style={[styles.tile, { width: tileWidth, transform: [{ translateX }] }]} />

      {values.map((item, index) => (
        <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => onChange(index)}>
          {renderValue({ item, isSelected: index === selectedIndex })}
        </TouchableOpacity>
      ))}
    </View>
  );
};