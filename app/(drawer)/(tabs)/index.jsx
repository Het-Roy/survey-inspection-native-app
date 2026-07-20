import { StyleSheet, Text, View, Pressable, FlatList, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import React, { useContext } from 'react'
import { SurveyContext } from "@/contexts/SurveyProvider";
import { Ionicons } from "@expo/vector-icons";

const PRIORITY_COLOR = {
  High: '#FF4757',
  Medium: '#FFA502',
  Low: '#00D4AA',
};

const Dashboard = () => {
  const { surveyData } = useContext(SurveyContext);

  const quickActions = [
    { label: 'New Survey', icon: 'add-circle-outline', route: '/(drawer)/(tabs)/new_survey', color: '#6C63FF' },
    { label: 'History', icon: 'time-outline', route: '/(drawer)/(tabs)/history', color: '#00D4AA' },
    { label: 'Profile', icon: 'person-outline', route: '/(drawer)/(tabs)/profile', color: '#FFA502' },
  ];

  const renderSurveyItem = ({ item }) => (
    <View style={styles.surveyCard}>
      <View style={[styles.priorityDot, { backgroundColor: PRIORITY_COLOR[item.priority] || '#6C63FF' }]} />
      <View style={styles.surveyCardContent}>
        <Text style={styles.surveyCardTitle} numberOfLines={1}>{item.siteName || item.title || 'Untitled Survey'}</Text>
        <Text style={styles.surveyCardSub}>{item.clientName || item.description || 'No description'}</Text>
      </View>
      <View style={[styles.priorityBadge, { backgroundColor: (PRIORITY_COLOR[item.priority] || '#6C63FF') + '22' }]}>
        <Text style={[styles.priorityBadgeText, { color: PRIORITY_COLOR[item.priority] || '#6C63FF' }]}>
          {item.priority || 'N/A'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good day 👋</Text>
            <Text style={styles.headerTitle}>Survey Dashboard</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>RH</Text>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{surveyData.length}</Text>
            <Text style={styles.statLabel}>Total Surveys</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#FF4757' }]}>
              {surveyData.filter(s => s.priority === 'High').length}
            </Text>
            <Text style={styles.statLabel}>High Priority</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#00D4AA' }]}>
              {surveyData.filter(s => s.priority === 'Low').length}
            </Text>
            <Text style={styles.statLabel}>Low Priority</Text>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userCard}>
          <Ionicons name="person-circle-outline" size={42} color="#6C63FF" />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Roy Het Jayeshkumar</Text>
            <Text style={styles.userDetail}>SUK250054CE058</Text>
            <Text style={styles.userDetail}>BE (CE), SUK</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          {quickActions.map((action) => (
            <Pressable
              key={action.label}
              style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
              onPress={() => router.push(action.route)}
            >
              <View style={[styles.actionIconWrap, { backgroundColor: action.color + '22' }]}>
                <Ionicons name={action.icon} size={26} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Recent Surveys */}
        <Text style={styles.sectionTitle}>Recent Surveys</Text>
        {surveyData.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={48} color="#2A2A4A" />
            <Text style={styles.emptyText}>No surveys yet. Create one!</Text>
          </View>
        ) : (
          <FlatList
            data={surveyData.slice(0, 5)}
            keyExtractor={(item) => item.id}
            renderItem={renderSurveyItem}
            scrollEnabled={false}
          />
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dashboard;

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: '#A0A0C0',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  statsCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2A2A4A',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#A0A0C0',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  userInfo: {
    marginLeft: 14,
  },
  userName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  userDetail: {
    color: '#A0A0C0',
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  actionButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  actionIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  surveyCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  surveyCardContent: {
    flex: 1,
  },
  surveyCardTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 3,
  },
  surveyCardSub: {
    color: '#A0A0C0',
    fontSize: 13,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 8,
  },
  priorityBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    color: '#A0A0C0',
    fontSize: 15,
  },
});