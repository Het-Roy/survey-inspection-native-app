import { Text, View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const infoRows = [
  { icon: 'person-outline', label: 'Full Name', value: 'Roy Het Jayeshkumar' },
  { icon: 'card-outline', label: 'Student ID', value: 'SUK250054CE058' },
  { icon: 'school-outline', label: 'Program', value: 'BE (Computer Engineering)' },
  { icon: 'business-outline', label: 'Institute', value: 'Swaminarayan University' },
];

const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>RH</Text>
            </View>
          </View>
          <Text style={styles.profileName}>Roy Het Jayeshkumar</Text>
          <View style={styles.roleBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#6C63FF" />
            <Text style={styles.roleText}>Survey Inspector</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Surveys</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Personal Info</Text>
        <View style={styles.card}>
          {infoRows.map((row, index) => (
            <View key={index} style={[styles.infoRow, index < infoRows.length - 1 && styles.infoRowBorder]}>
              <View style={styles.infoIconWrap}>
                <Ionicons name={row.icon} size={18} color="#6C63FF" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{row.label}</Text>
                <Text style={styles.infoValue}>{row.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 28,
  },
  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#6C63FF',
    padding: 3,
    marginBottom: 14,
  },
  avatar: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#6C63FF22',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#6C63FF44',
  },
  roleText: {
    color: '#6C63FF',
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2A2A4A',
  },
  statValue: {
    color: '#6C63FF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: '#A0A0C0',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A4A',
  },
  infoIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#6C63FF22',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: '#A0A0C0',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
});