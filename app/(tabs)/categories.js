// app/(tabs)/categories.js

import { View, Text, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { name: 'Nature', icon: 'leaf', colors: ['#27ae60', '#2ecc71'] },
  { name: 'Technology', icon: 'hardware-chip', colors: ['#3498db', '#5dade2'] },
  { name: 'Animals', icon: 'paw', colors: ['#e67e22', '#f39c12'] },
  { name: 'Food', icon: 'fast-food', colors: ['#16a085', '#1abc9c'] },
  { name: 'Cars', icon: 'car-sport', colors: ['#c0392b', '#e74c3c'] },
  { name: 'City', icon: 'business', colors: ['#8e44ad', '#9b59b6'] },
  { name: 'Sports', icon: 'basketball', colors: ['#f1c40f', '#f39c12'] },
  { name: 'Fashion', icon: 'shirt', colors: ['#d35400', '#e67e22'] },
  { name: 'Music', icon: 'musical-notes', colors: ['#2980b9', '#3498db'] },
  { name: 'Travel', icon: 'airplane', colors: ['#1abc9c', '#16a085'] },
];

const { width } = Dimensions.get('window');
const itemContainerSize = width / 2;
const itemSize = itemContainerSize - 32;

export default function CategoriesScreen() {
  const renderCategoryItem = ({ item }) => (
    <Link href={{ pathname: '/search', params: { query: item.name } }} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.categoryContainer, { transform: [{ scale: pressed ? 0.95 : 1 }] }]}>
            <LinearGradient
              colors={item.colors}
              style={[styles.categoryItem, { width: itemSize, height: itemSize }]}
            >
              <Ionicons name={item.icon} size={itemSize * 0.4} color="white" />
              <Text style={styles.categoryText}>{item.name}</Text>
            </LinearGradient>
          </View>
        )}
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  list: {
    padding: 8,
  },
  categoryContainer: {
    width: itemContainerSize,
    height: itemContainerSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    marginTop: 5,
  },
});