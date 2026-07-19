import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

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
      <View style={styles.center}>
        <Button
          title="Grant Permission"
          onPress={requestPermission}
        />
      </View>
    );
  }

  const takePhoto = async () => {
    if (!CameraRef.current) return;

    try {
      setLoading(true);

      const result = await CameraRef.current.takePictureAsync();

      if (result) {
        setPreview(result.uri);
      }
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

  const handleFlip = () => {
    setFacing(facing === "back" ? "front" : "back");
  };

  const handleFlash = () => {
    setFlash(flash === "off" ? "on" : "off");
  };

  const savePhoto = () => {
    setPhotos((prev) => [
      ...prev,
      {
        uri: preview,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    setPreview(null);
  };

  const retakePhoto = () => {
    setPreview(null);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // ---------------- PREVIEW SCREEN ----------------
  if (preview) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: preview }}
          style={styles.camera}
          resizeMode="contain"
        />

        <Button
          title="Retake"
          onPress={retakePhoto}
        />

        <Button
          title="Use Photo"
          onPress={savePhoto}
        />
      </View>
    );
  }

  // ---------------- CAMERA SCREEN ----------------
  return (
    <View style={styles.container}>
      <CameraView
        ref={CameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash}
      />

      <Text style={styles.flashText}>
        Flash : {flash.toUpperCase()}
      </Text>

      <Button
        title="Flip Camera"
        onPress={handleFlip}
      />

      <Button
        title="Toggle Flash"
        onPress={handleFlash}
      />

      <Button
        title="Click Picture"
        onPress={takePhoto}
      />

      <Button
        title="Reset Camera"
        onPress={resetCamera}
      />

      <View style={styles.imageContainer}>
        {photos.map((item, index) => (
          <View key={index}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
            />
            <Text>{item.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  camera: {
    flex: 1,
  },

  flashText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },

  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },

  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
});