import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, Switch, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [gpsTracking, setGpsTracking] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        { icon: 'notifications-outline', label: 'Push Notifications', toggle: true, value: notifications, setter: setNotifications, color: '#6C63FF' },
        { icon: 'moon-outline', label: 'Dark Mode', toggle: true, value: darkMode, setter: setDarkMode, color: '#FFA502' },
        { icon: 'location-outline', label: 'GPS Tracking', toggle: true, value: gpsTracking, setter: setGpsTracking, color: '#00D4AA' },
        { icon: 'save-outline', label: 'Auto-Save Surveys', toggle: true, value: autoSave, setter: setAutoSave, color: '#FF4757' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Edit Profile', onPress: () => Alert.alert('Coming soon'), color: '#6C63FF' },
        { icon: 'lock-closed-outline', label: 'Change Password', onPress: () => Alert.alert('Coming soon'), color: '#00D4AA' },
        { icon: 'shield-outline', label: 'Privacy Policy', onPress: () => Alert.alert('Coming soon'), color: '#FFA502' },
      ],
    },
    {
      title: 'App',
      items: [
        { icon: 'information-circle-outline', label: 'About', value: 'v1.0.0', color: '#6C63FF' },
        { icon: 'star-outline', label: 'Rate App', onPress: () => Alert.alert('Thank you!', 'We appreciate your support.'), color: '#FFA502' },
        { icon: 'bug-outline', label: 'Report a Bug', onPress: () => Alert.alert('Bug Report', 'Bug reporting coming soon.'), color: '#FF4757' },
        { icon: 'log-out-outline', label: 'Log Out', onPress: () => Alert.alert('Log Out', 'Are you sure?', [{ text: 'Cancel' }, { text: 'Log Out', style: 'destructive' }]), color: '#FF4757', danger: true },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSub}>App preferences & configuration</Text>
        </View>

        {/* Profile Mini Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>RH</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Roy Het Jayeshkumar</Text>
            <Text style={styles.profileId}>SUK250054CE058</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={22} color="#00D4AA" />
          </View>
        </View>

        {/* Setting Sections */}
        {settingSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.title.toUpperCase()}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    styles.settingRow,
                    index < section.items.length - 1 && styles.settingRowBorder,
                    !item.toggle && pressed && styles.rowPressed,
                  ]}
                  onPress={item.onPress}
                  disabled={item.toggle || !item.onPress}
                >
                  <View style={[styles.settingIconWrap, { backgroundColor: item.color + '22' }]}>
                    <Ionicons name={item.icon} size={18} color={item.color} />
                  </View>
                  <Text style={[styles.settingLabel, item.danger && styles.dangerText]}>{item.label}</Text>
                  <View style={styles.settingRight}>
                    {item.toggle ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.setter}
                        trackColor={{ false: '#2A2A4A', true: item.color + '66' }}
                        thumbColor={item.value ? item.color : '#4A4A6A'}
                      />
                    ) : item.value ? (
                      <Text style={styles.settingValue}>{item.value}</Text>
                    ) : (
                      <Ionicons name="chevron-forward" size={16} color="#4A4A6A" />
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.footerText}>Survey & Inspection App • v1.0.0</Text>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

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
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  headerSub: {
    color: '#A0A0C0',
    fontSize: 14,
    marginTop: 4,
  },
  profileCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  profileInitials: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 3,
  },
  profileId: {
    color: '#A0A0C0',
    fontSize: 13,
  },
  verifiedBadge: {
    padding: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#A0A0C0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A4A',
  },
  rowPressed: {
    backgroundColor: '#2A2A4A',
  },
  settingIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  dangerText: {
    color: '#FF4757',
  },
  settingRight: {
    alignItems: 'flex-end',
  },
  settingValue: {
    color: '#A0A0C0',
    fontSize: 14,
  },
  footerText: {
    color: '#4A4A6A',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
});
