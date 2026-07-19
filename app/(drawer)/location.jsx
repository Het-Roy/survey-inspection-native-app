import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";

const LocationScreen = () => {
  const [location, setLocation] = useState(null);

  // Get / Refresh Location
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required."
      );
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLocation(currentLocation.coords);
  };

  // Copy Location
  const copyLocation = async () => {
    if (!location) {
      Alert.alert("No Location", "Please get your location first.");
      return;
    }

    const text = `Latitude: ${location.latitude}
Longitude: ${location.longitude}`;

    await Clipboard.setStringAsync(text);

    Alert.alert("Success", "Location copied to clipboard.");
  };

  return (
    <View>
      <Text>Location</Text>

      <Pressable onPress={getLocation}>
        <Text>Get / Refresh Location</Text>
      </Pressable>

      {location && (
        <View>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          <Text>Accuracy: {location.accuracy} meters</Text>

          <Pressable onPress={copyLocation}>
            <Text>Copy Location</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({});