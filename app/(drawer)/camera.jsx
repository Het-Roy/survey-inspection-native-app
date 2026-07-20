import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Camera = () => {
  const CameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState(null);
  const [flash, setFlash] = useState("off");

  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.permissionScreen}>
          <View style={styles.permissionIconWrap}>
            <Ionicons name="camera-outline" size={56} color="#6C63FF" />
          </View>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionSub}>Grant permission to take photos for your surveys.</Text>
          <Pressable
            style={({ pressed }) => [styles.permissionBtn, pressed && styles.btnPressed]}
            onPress={requestPermission}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
            <Text style={styles.permissionBtnText}>Grant Permission</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const takePhoto = async () => {
    if (!CameraRef.current) return;
    try {
      setLoading(true);
      const result = await CameraRef.current.takePictureAsync();
      if (result) setPreview(result.uri);
    } catch (error) {
      console.log("Camera Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetCamera = () => {
    setPreview(null);
    setPhotos([]);
  };

  const handleFlip = () => setFacing(facing === "back" ? "front" : "back");
  const handleFlash = () => setFlash(flash === "off" ? "on" : "off");
  const savePhoto = () => {
    setPhotos((prev) => [...prev, { uri: preview, time: new Date().toLocaleTimeString() }]);
    setPreview(null);
  };
  const retakePhoto = () => setPreview(null);

  if (loading) {
    return (
      <View style={styles.safeArea}>
        <View style={styles.loadingScreen}>
          <Ionicons name="camera" size={48} color="#6C63FF" />
          <Text style={styles.loadingText}>Capturing...</Text>
        </View>
      </View>
    );
  }

  if (preview) {
    return (
      <View style={styles.safeArea}>
        <Image source={{ uri: preview }} style={styles.previewImage} resizeMode="cover" />
        <View style={styles.previewOverlay}>
          <Text style={styles.previewTitle}>Preview Photo</Text>
          <View style={styles.previewBtnRow}>
            <Pressable style={({ pressed }) => [styles.previewBtn, styles.retakeBtn, pressed && styles.btnPressed]} onPress={retakePhoto}>
              <Ionicons name="refresh-outline" size={18} color="#FFFFFF" />
              <Text style={styles.previewBtnText}>Retake</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.previewBtn, styles.useBtn, pressed && styles.btnPressed]} onPress={savePhoto}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
              <Text style={styles.previewBtnText}>Use Photo</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <CameraView ref={CameraRef} style={styles.camera} facing={facing} flash={flash}>
        <View style={styles.topOverlay}>
          <View style={styles.flashBadge}>
            <Ionicons name={flash === 'on' ? 'flash' : 'flash-off'} size={16} color={flash === 'on' ? '#FFA502' : '#FFFFFF'} />
            <Text style={styles.flashBadgeText}>Flash {flash.toUpperCase()}</Text>
          </View>
        </View>
      </CameraView>

      <View style={styles.controlsBar}>
        <Pressable style={({ pressed }) => [styles.controlBtn, pressed && styles.btnPressed]} onPress={handleFlash}>
          <Ionicons name={flash === 'on' ? 'flash' : 'flash-off'} size={22} color={flash === 'on' ? '#FFA502' : '#FFFFFF'} />
        </Pressable>

        <Pressable style={({ pressed }) => [styles.shutterBtn, pressed && styles.shutterBtnPressed]} onPress={takePhoto}>
          <View style={styles.shutterInner} />
        </Pressable>

        <Pressable style={({ pressed }) => [styles.controlBtn, pressed && styles.btnPressed]} onPress={handleFlip}>
          <Ionicons name="camera-reverse-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      {photos.length > 0 && (
        <View style={styles.galleryContainer}>
          <View style={styles.galleryHeader}>
            <Text style={styles.galleryTitle}>Captured Photos ({photos.length})</Text>
            <Pressable onPress={resetCamera}>
              <Text style={styles.clearText}>Clear All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryScroll}>
            {photos.map((item, index) => (
              <View key={index} style={styles.thumbnailWrap}>
                <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                <Text style={styles.thumbnailTime}>{item.time}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  // Permission Screen
  permissionScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 16,
  },
  permissionIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6C63FF22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  permissionSub: {
    color: '#A0A0C0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  permissionBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  permissionBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  // Loading
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: '#A0A0C0',
    fontSize: 16,
  },
  // Camera
  camera: {
    flex: 1,
  },
  topOverlay: {
    padding: 20,
    alignItems: 'center',
  },
  flashBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  flashBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#0F0F1A',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  controlBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#2A2A4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  shutterBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  // Preview
  previewImage: {
    flex: 1,
  },
  previewOverlay: {
    backgroundColor: '#0F0F1A',
    padding: 20,
    gap: 16,
  },
  previewTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  previewBtnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  previewBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  retakeBtn: {
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  useBtn: {
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  previewBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  // Gallery
  galleryContainer: {
    backgroundColor: '#0F0F1A',
    borderTopWidth: 1,
    borderTopColor: '#2A2A4A',
    paddingTop: 12,
    paddingBottom: 8,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  galleryTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  clearText: {
    color: '#FF4757',
    fontSize: 13,
    fontWeight: '600',
  },
  galleryScroll: {
    paddingHorizontal: 16,
    gap: 10,
  },
  thumbnailWrap: {
    alignItems: 'center',
    gap: 4,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  thumbnailTime: {
    color: '#A0A0C0',
    fontSize: 10,
  },
});