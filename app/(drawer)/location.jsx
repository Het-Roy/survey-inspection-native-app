import React, { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      setLoading(false);
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation(currentLocation.coords);
    setLoading(false);
  };

  const copyLocation = async () => {
    if (!location) {
      Alert.alert("No Location", "Please get your location first.");
      return;
    }
    const text = `Latitude: ${location.latitude.toFixed(6)}\nLongitude: ${location.longitude.toFixed(6)}`;
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert("Copied!", "Location coordinates copied to clipboard.");
  };

  const coordFields = location
    ? [
        { label: 'Latitude', value: location.latitude.toFixed(6), icon: 'navigate-outline', color: '#6C63FF' },
        { label: 'Longitude', value: location.longitude.toFixed(6), icon: 'compass-outline', color: '#00D4AA' },
        { label: 'Accuracy', value: `± ${location.accuracy?.toFixed(1) || 'N/A'} m`, icon: 'radio-button-on-outline', color: '#FFA502' },
        { label: 'Altitude', value: location.altitude != null ? `${location.altitude.toFixed(1)} m` : 'N/A', icon: 'trending-up-outline', color: '#FF4757' },
      ]
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconWrap}>
            <Ionicons name="location" size={26} color="#6C63FF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Location</Text>
            <Text style={styles.headerSub}>Get GPS coordinates</Text>
          </View>
        </View>

        <View style={styles.mapCard}>
          <Ionicons name="map-outline" size={48} color={location ? '#6C63FF' : '#2A2A4A'} />
          {location ? (
            <>
              <Text style={styles.coordText}>{location.latitude.toFixed(4)}° N</Text>
              <Text style={styles.coordSub}>{location.longitude.toFixed(4)}° E</Text>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>GPS Active</Text>
              </View>
            </>
          ) : (
            <Text style={styles.noLocationText}>Tap below to get your current location</Text>
          )}
        </View>

        {location && (
          <>
            <Text style={styles.sectionLabel}>COORDINATES</Text>
            <View style={styles.coordCard}>
              {coordFields.map((field, index) => (
                <View key={index} style={[styles.coordRow, index < coordFields.length - 1 && styles.coordRowBorder]}>
                  <View style={[styles.coordIconWrap, { backgroundColor: field.color + '22' }]}>
                    <Ionicons name={field.icon} size={18} color={field.color} />
                  </View>
                  <View style={styles.coordContent}>
                    <Text style={styles.coordLabel}>{field.label}</Text>
                    <Text style={[styles.coordValue, { color: field.color }]}>{field.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [styles.actionBtn, styles.getBtn, pressed && styles.btnPressed, loading && styles.btnDisabled]}
            onPress={getLocation}
            disabled={loading}
          >
            <Ionicons name={loading ? 'hourglass-outline' : 'locate-outline'} size={18} color="#FFFFFF" />
            <Text style={styles.getBtnText}>{loading ? 'Fetching...' : location ? 'Refresh' : 'Get Location'}</Text>
          </Pressable>

          {location && (
            <Pressable
              style={({ pressed }) => [styles.actionBtn, styles.copyBtn, pressed && styles.btnPressed, copied && styles.copiedBtn]}
              onPress={copyLocation}
            >
              <Ionicons name={copied ? 'checkmark-circle' : 'copy-outline'} size={18} color={copied ? '#00D4AA' : '#6C63FF'} />
              <Text style={[styles.copyBtnText, copied && { color: '#00D4AA' }]}>{copied ? 'Copied!' : 'Copy'}</Text>
            </Pressable>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6C63FF22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  headerSub: {
    color: '#A0A0C0',
    fontSize: 13,
    marginTop: 2,
  },
  mapCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
    minHeight: 180,
    justifyContent: 'center',
  },
  coordText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  coordSub: {
    color: '#A0A0C0',
    fontSize: 18,
    fontWeight: '600',
  },
  noLocationText: {
    color: '#A0A0C0',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#00D4AA22',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D4AA',
  },
  liveText: {
    color: '#00D4AA',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionLabel: {
    color: '#A0A0C0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  coordCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    overflow: 'hidden',
    marginBottom: 24,
  },
  coordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  coordRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A4A',
  },
  coordIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  coordContent: {
    flex: 1,
  },
  coordLabel: {
    color: '#A0A0C0',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  coordValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  getBtn: {
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  getBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  copyBtn: {
    backgroundColor: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#6C63FF44',
  },
  copyBtnText: {
    color: '#6C63FF',
    fontWeight: '700',
    fontSize: 15,
  },
  copiedBtn: {
    borderColor: '#00D4AA44',
    backgroundColor: '#00D4AA11',
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  btnDisabled: {
    opacity: 0.6,
  },
});