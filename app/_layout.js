// app/_layout.js

import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

// هذا يمنع شاشة البداية من الاختفاء تلقائيًا قبل تحميل الخطوط
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Cairo-Regular': require('../assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Bold': require('../assets/fonts/Cairo-Bold.ttf'),
  });

  useEffect(() => {
    // إخفاء شاشة البداية بعد تحميل الخطوط أو في حال حدوث خطأ
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // عدم عرض أي شيء حتى يتم تحميل الخطوط
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}