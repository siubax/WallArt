// components/ImageGrid.js

import { StyleSheet, FlatList, Dimensions, Pressable, View } from 'react-native';
import React, { useEffect } from 'react';
import { Link } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import SkeletonItem from './SkeletonItem';
import { theme } from '../constants/colors';

const { width } = Dimensions.get('window');
const imageSize = width / 2;
const ITEM_HEIGHT = imageSize * 1.5;

const ImageCell = React.memo(({ item }) => {
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Link href={{ pathname: "/details", params: { photo: JSON.stringify(item) } }} asChild>
      <Pressable>
        <View style={styles.imageContainer}>
          <Animated.Image source={{ uri: item.src.portrait }} style={[styles.image, animatedStyle]} />
        </View>
      </Pressable>
    </Link>
  );
});

// إضافة ListHeaderComponent إلى الخصائص (props)
const ImageGrid = ({ photos, isLoading, ListHeaderComponent, onEndReached, ListFooterComponent, onRefresh, refreshing }) => {
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * Math.floor(index / 2),
    index,
  });

  const renderItem = ({ item }) => <ImageCell item={item} />;

  if (isLoading) {
    return (
        <FlatList
          data={[...Array(8)]}
          renderItem={() => <SkeletonItem />}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{backgroundColor: theme.background}}
          ListHeaderComponent={ListHeaderComponent} // تمرير الهيدر هنا أيضًا
      />
    );
  }

  return (
    <FlatList
      data={photos}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      numColumns={2}
      ListHeaderComponent={ListHeaderComponent} // تمرير الهيدر هنا
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooterComponent}
      onRefresh={onRefresh}
      refreshing={refreshing}
      initialNumToRender={10}
      windowSize={10}
      getItemLayout={getItemLayout}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
  },
  imageContainer: {
    width: imageSize,
    height: ITEM_HEIGHT,
    padding: 8, // زيادة الهامش قليلًا
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18, // زيادة دائرية الحواف
  },
});

export default ImageGrid;