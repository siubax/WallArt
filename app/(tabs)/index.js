// app/(tabs)/index.js

import { View, StyleSheet, Text, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // 1. استيراد SafeAreaView
import React, { useState, useEffect } from 'react';
import { fetchCuratedPhotos, searchPhotos } from '../../api/pexels';
import ImageGrid from '../../components/ImageGrid';
import { theme } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const categories = ["Trending", "Nature", "Wallpapers", "Travel", "Food", "Animals"];

export default function HomeScreen() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Trending");

  useEffect(() => {
    fetchData(1, true);
  }, [selectedCategory]);

  const fetchData = async (pageNum = 1, isNewCategory = false) => {
    setLoading(true);
    let data;
    if (selectedCategory === "Trending") {
      data = await fetchCuratedPhotos(pageNum);
    } else {
      data = await searchPhotos(selectedCategory, pageNum);
    }

    if (data && data.photos) {
      if (isNewCategory) {
        setPhotos(data.photos);
      } else {
        setPhotos(prevPhotos => [...prevPhotos, ...data.photos]);
      }
      setPage(pageNum);
    }
    setLoading(false);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };
  
  const handleLoadMore = () => {
    fetchData(page + 1);
  };

  const renderFooter = () => (
    loading && photos.length > 0 ? <ActivityIndicator size="large" color={theme.text} style={{ marginVertical: 20 }} /> : null
  );

  const HeaderComponent = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Discover</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleCategoryPress(item)} style={[styles.chip, selectedCategory === item && {backgroundColor: theme.primary}]}>
            <Text style={[styles.chipText, selectedCategory === item && styles.selectedChipText]}>{item}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.chipsContainer}
      />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{selectedCategory}</Text>
        <Ionicons name="arrow-forward" size={24} color={theme.text} />
      </View>
    </View>
  );

  return (
    // 2. استخدام SafeAreaView كمكون رئيسي
    <SafeAreaView style={styles.container}>
      <ImageGrid 
        photos={photos} 
        isLoading={loading && photos.length === 0}
        onEndReached={handleLoadMore} 
        ListFooterComponent={renderFooter}
        ListHeaderComponent={<HeaderComponent />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.text,
    fontFamily: 'Cairo-Bold',
    marginTop: 10, // هامش إضافي بسيط
  },
  chipsContainer: {
    paddingVertical: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.card,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    color: theme.text,
    fontFamily: 'Cairo-Regular'
  },
  selectedChipText: {
    color: 'white', // لون النص عند الاختيار
    fontFamily: 'Cairo-Bold'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    fontFamily: 'Cairo-Bold'
  },
});