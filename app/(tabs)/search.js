// app/(tabs)/search.js

import { StyleSheet, TextInput, Text, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { searchPhotos } from '../../api/pexels';
import { Ionicons } from '@expo/vector-icons';
import ImageGrid from '../../components/ImageGrid';

export default function SearchScreen() {
  const params = useLocalSearchParams(); 
  
  const [query, setQuery] = useState(params.query || '');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (params.query) {
      handleSearch(params.query);
    }
  }, [params.query]);

  const handleSearch = async (newQuery) => {
    const q = newQuery.trim();
    if (!q) return;
    setQuery(q);
    setIsSearching(true);
    setResults([]);
    const data = await searchPhotos(q, 1);
    if (data && data.photos) {
      setResults(data.photos);
      setPage(1);
    }
    setIsSearching(false);
  };

  const handleLoadMore = async () => {
    if (loadingMore || results.length === 0) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const data = await searchPhotos(query, nextPage);
    if (data && data.photos) {
      setResults(prevResults => [...prevResults, ...data.photos]);
      setPage(nextPage);
    }
    setLoadingMore(false);
  };

  const renderFooter = () => (
    loadingMore ? <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} /> : null
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for photos..."
          placeholderTextColor="#888"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => handleSearch(query)}
        />
      </View>
      
      {isSearching ? (
        <View style={{flex: 1, backgroundColor: '#121212'}}>
          <ImageGrid isLoading={true} photos={[]} />
        </View>
      ) : results.length > 0 ? (
        <ImageGrid 
          photos={results} 
          onEndReached={handleLoadMore} 
          ListFooterComponent={renderFooter}
        />
      ) : (
         <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Find your next wallpaper.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 12,
    fontFamily: 'Cairo-Regular',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
  },
});