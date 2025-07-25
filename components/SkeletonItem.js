// components/SkeletonItem.js

import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const imageSize = width / 2;
const ITEM_HEIGHT = imageSize * 1.5;

const SkeletonItem = () => {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.ease }),
      -1, // -1 means infinite loop
      true // true means it will reverse the animation
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.skeleton, animatedStyle]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    width: imageSize,
    height: ITEM_HEIGHT,
    padding: 2,
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    margin: 2,
  },
});

export default SkeletonItem;