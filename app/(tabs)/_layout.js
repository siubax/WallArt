// app/(tabs)/_layout.js

import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/colors';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

// ضع معرّف الوحدة الإعلانية الحقيقي الخاص بك هنا
const adUnitId = "ca-app-pub-9767437471456053/3480532627";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.primary,
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: 'Categories',
            tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={24} color={color} />,
          }}
        />
      </Tabs>
      
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAds: true,
        }}
      />
    </View>
  );
}