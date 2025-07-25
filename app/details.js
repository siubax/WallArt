// app/details.js

import { View, Text, StyleSheet, Image, Dimensions, Pressable, Linking, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

export default function DetailsScreen() {
  const router = useRouter();
  const { photo } = useLocalSearchParams();

  // التأكد من وجود بيانات الصورة قبل المتابعة
  if (!photo) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Image data not found.</Text>
      </View>
    );
  }

  const photoData = JSON.parse(photo);

  const handleDownload = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your photo library to save the image.');
      return;
    }

    try {
      const fileUri = FileSystem.documentDirectory + `${photoData.id}.jpg`;
      const { uri } = await FileSystem.downloadAsync(photoData.src.original, fileUri);
      
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync('WallArt');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('WallArt', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      
      Alert.alert('Success!', 'Wallpaper saved to "WallArt" album in your gallery!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save the wallpaper.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoData.src.large2x }} style={styles.image} />

      {/* زر الرجوع */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </Pressable>

      {/* شريط المعلومات السفلي */}
      <View style={styles.infoBar}>
        <Pressable onPress={() => Linking.openURL(photoData.photographer_url)} style={styles.photographerInfo}>
          <Text style={styles.photographerName}>{photoData.photographer}</Text>
          <Ionicons name="link-outline" size={20} color="#ccc" style={{ marginLeft: 8 }}/>
        </Pressable>
        <Pressable onPress={handleDownload} style={styles.downloadButton}>
          <Ionicons name="download-outline" size={28} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 50,
  },
  infoBar: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photographerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photographerName: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  downloadButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 50,
  },
});