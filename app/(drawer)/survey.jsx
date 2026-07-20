import React, { useContext } from "react";
import { Alert, Pressable, Text, View, ScrollView, StyleSheet } from "react-native";
import { SurveyContext } from "../../contexts/SurveyProvider";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIORITY_COLOR = {
  High: '#FF4757',
  Medium: '#FFA502',
  Low: '#00D4AA',
};

const SurveyPreview = ({ navigation }) => {
  const { surveyData } = useContext(SurveyContext);
  const survey = surveyData[0];

  if (!survey) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Ionicons name="document-outline" size={64} color="#2A2A4A" />
          <Text style={styles.emptyTitle}>No Survey Found</Text>
          <Text style={styles.emptyText}>Please create a survey first.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const priorityColor = PRIORITY_COLOR[survey.priority] || '#6C63FF';

  const fields = [
    { icon: 'business-outline', label: 'Site Name', value: survey.siteName },
    { icon: 'calendar-outline', label: 'Date', value: survey.date ? new Date(survey.date).toLocaleDateString() : 'N/A' },
    { icon: 'person-outline', label: 'Client Name', value: survey.clientName },
    { icon: 'call-outline', label: 'Contact', value: survey.contact },
    { icon: 'location-outline', label: 'Location', value: survey.location },
    { icon: 'alert-circle-outline', label: 'Priority', value: survey.priority, color: priorityColor },
    { icon: 'document-text-outline', label: 'Notes', value: survey.notes },
    { icon: 'camera-outline', label: 'Photo', value: survey.photo },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '22' }]}>
            <Text style={[styles.priorityBadgeText, { color: priorityColor }]}>
              {survey.priority} Priority
            </Text>
          </View>
          <Text style={styles.surveyTitle}>{survey.siteName}</Text>
          <Text style={styles.surveyClient}>Client: {survey.clientName}</Text>
        </View>

        <View style={styles.card}>
          {fields.map((field, index) => (
            <View key={index} style={[styles.fieldRow, index < fields.length - 1 && styles.fieldRowBorder]}>
              <View style={styles.fieldIconWrap}>
                <Ionicons name={field.icon} size={18} color={field.color || '#6C63FF'} />
              </View>
              <View style={styles.fieldContent}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text style={[styles.fieldValue, field.color && { color: field.color }]}>
                  {field.value || '—'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionRow}>
          <Pressable
            style={({ pressed }) => [styles.editBtn, pressed && styles.btnPressed]}
            onPress={() => navigation?.goBack()}
          >
            <Ionicons name="create-outline" size={18} color="#6C63FF" />
            <Text style={styles.editBtnText}>Edit Survey</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.submitBtn, pressed && styles.btnPressed]}
            onPress={() => Alert.alert("Success", "Survey Submitted Successfully!")}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
            <Text style={styles.submitBtnText}>Submit</Text>
          </Pressable>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurveyPreview;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  emptyText: {
    color: '#A0A0C0',
    fontSize: 14,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  surveyTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  surveyClient: {
    color: '#A0A0C0',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    overflow: 'hidden',
    marginBottom: 20,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  fieldRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A4A',
  },
  fieldIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#6C63FF22',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    color: '#A0A0C0',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  fieldValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#6C63FF55',
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  editBtnText: {
    color: '#6C63FF',
    fontWeight: '700',
    fontSize: 15,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
});