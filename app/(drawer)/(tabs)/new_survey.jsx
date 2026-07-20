import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { SurveyContext } from '@/contexts/SurveyProvider';
import { Ionicons } from '@expo/vector-icons';

const NewSurvey = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [submitted, setSubmitted] = useState(false);
  const { addSurvey } = useContext(SurveyContext);

  const handlePress = () => {
    if (!title.trim()) return;
    addSurvey({ 
      siteName: title, 
      notes: description,
      clientName: "N/A",
      location: "N/A",
      contact: "N/A",
      priority: priority,
      photo: "No Photo",
      date: new Date().toISOString(),
    });
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.headerIconWrap}>
            <Ionicons name="add-circle" size={28} color="#6C63FF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>New Survey</Text>
            <Text style={styles.headerSub}>Fill in the details below</Text>
          </View>
        </View>

        {submitted && (
          <View style={styles.successBanner}>
            <Ionicons name="checkmark-circle" size={20} color="#00D4AA" />
            <Text style={styles.successText}>Survey created successfully!</Text>
          </View>
        )}

        <View style={styles.card}>

          <Text style={styles.fieldLabel}>Survey Title <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="document-text-outline" size={18} color="#6C63FF" style={styles.inputIcon} />
            <TextInput
              placeholder="e.g. Site Inspection - ABC Corp"
              placeholderTextColor="#4A4A6A"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <Text style={styles.fieldLabel}>Description</Text>
          <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
            <TextInput
              placeholder="Describe the survey scope, special instructions..."
              placeholderTextColor="#4A4A6A"
              style={[styles.input, styles.textArea]}
              multiline
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </View>
          
          <Text style={styles.fieldLabel}>Priority</Text>
          <View style={styles.priorityRow}>
            {['High', 'Medium', 'Low'].map((p) => (
              <Pressable
                key={p}
                style={[
                  styles.priorityBtn,
                  priority === p && styles.priorityBtnActive,
                  priority === p && p === 'High' && { borderColor: '#FF4757', backgroundColor: '#FF475722' },
                  priority === p && p === 'Medium' && { borderColor: '#FFA502', backgroundColor: '#FFA50222' },
                  priority === p && p === 'Low' && { borderColor: '#00D4AA', backgroundColor: '#00D4AA22' }
                ]}
                onPress={() => setPriority(p)}
              >
                <Text style={[
                  styles.priorityBtnText,
                  priority === p && p === 'High' && { color: '#FF4757' },
                  priority === p && p === 'Medium' && { color: '#FFA502' },
                  priority === p && p === 'Low' && { color: '#00D4AA' }
                ]}>{p}</Text>
              </Pressable>
            ))}
          </View>

        </View>

        <View style={styles.tipCard}>
          <Ionicons name="information-circle-outline" size={18} color="#FFA502" />
          <Text style={styles.tipText}>Make sure to include the site name and key inspection points in the description.</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.submitBtn, pressed && styles.submitBtnPressed, !title.trim() && styles.submitBtnDisabled]}
          onPress={handlePress}
          disabled={!title.trim()}
        >
          <Ionicons name="send" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.submitBtnText}>Create Survey</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default NewSurvey;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 14,
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
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 13,
    color: '#A0A0C0',
    marginTop: 2,
  },
  successBanner: {
    backgroundColor: '#00D4AA22',
    borderWidth: 1,
    borderColor: '#00D4AA55',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  successText: {
    color: '#00D4AA',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    marginBottom: 16,
  },
  fieldLabel: {
    color: '#A0A0C0',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  required: {
    color: '#FF4757',
  },
  inputWrapper: {
    backgroundColor: '#0F0F1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: 14,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  tipCard: {
    backgroundColor: '#FFA50212',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFA50233',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 24,
  },
  tipText: {
    color: '#FFA502',
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  submitBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  submitBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  submitBtnDisabled: {
    backgroundColor: '#2A2A4A',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    backgroundColor: '#0F0F1A',
    alignItems: 'center',
  },
  priorityBtnActive: {
    borderWidth: 1.5,
  },
  priorityBtnText: {
    color: '#A0A0C0',
    fontWeight: '600',
    fontSize: 14,
  },
});