import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { SurveyContext } from '../../../contexts/SurveyProvider'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIORITY_COLOR = {
  High: '#FF4757',
  Medium: '#FFA502',
  Low: '#00D4AA',
};

const PRIORITY_ICON = {
  High: 'alert-circle',
  Medium: 'warning',
  Low: 'checkmark-circle',
};

const History = () => {
  const { surveyData } = useContext(SurveyContext);

  const priorityWeight = { High: 3, Medium: 2, Low: 1 };
  const sortedData = [...surveyData].sort((a, b) => {
      const pA = priorityWeight[a.priority] || 0;
      const pB = priorityWeight[b.priority] || 0;
      if (pA !== pB) {
          return pB - pA;
      }
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
  });

  const renderItem = ({ item, index }) => {
    const priorityColor = PRIORITY_COLOR[item.priority] || '#6C63FF';
    const priorityIcon = PRIORITY_ICON[item.priority] || 'help-circle';
    return (
      <View style={styles.card}>
        <View style={[styles.cardAccent, { backgroundColor: priorityColor }]} />
        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIndex}>#{String(index + 1).padStart(2, '0')}</Text>
            <View style={[styles.priorityChip, { backgroundColor: priorityColor + '22' }]}>
              <Ionicons name={priorityIcon} size={12} color={priorityColor} />
              <Text style={[styles.priorityChipText, { color: priorityColor }]}>{item.priority || 'N/A'}</Text>
            </View>
          </View>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.siteName || item.title || 'Untitled Survey'}</Text>
          <Text style={styles.cardSub} numberOfLines={2}>
            {item.clientName || item.description || 'No details available'}
            {item.date && `\nDate: ${new Date(item.date).toLocaleDateString()}`}
          </Text>
          {item.location && (
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={13} color="#A0A0C0" />
              <Text style={styles.metaText}>{item.location}</Text>
            </View>
          )}
          {item.contact && (
            <View style={styles.metaRow}>
              <Ionicons name="call-outline" size={13} color="#A0A0C0" />
              <Text style={styles.metaText}>{item.contact}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="time" size={26} color="#6C63FF" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Survey History</Text>
            <Text style={styles.headerSub}>{surveyData.length} surveys recorded</Text>
          </View>
        </View>

        {surveyData.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color="#2A2A4A" />
            <Text style={styles.emptyTitle}>No History Yet</Text>
            <Text style={styles.emptyText}>Surveys you create will appear here.</Text>
          </View>
        ) : (
          <FlatList
            data={sortedData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default History;

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 13,
    color: '#A0A0C0',
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  cardAccent: {
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardBody: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardIndex: {
    color: '#4A4A6A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  priorityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  priorityChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSub: {
    color: '#A0A0C0',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  metaText: {
    color: '#A0A0C0',
    fontSize: 12,
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
});