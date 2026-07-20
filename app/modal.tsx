import { Link } from 'expo-router';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Ionicons name="information-circle" size={52} color="#6C63FF" />
        </View>
        <Text style={styles.title}>Modal Screen</Text>
        <Text style={styles.sub}>This is a demonstration modal for the Survey & Inspection App.</Text>

        <View style={styles.infoCard}>
          <Ionicons name="construct-outline" size={20} color="#FFA502" />
          <Text style={styles.infoText}>Use modals for confirmations, alerts, and supplementary information.</Text>
        </View>

        <Link href="../" dismissTo asChild>
          <Pressable style={({ pressed }) => [styles.backBtn, pressed && styles.btnPressed]}>
            <Ionicons name="arrow-back-outline" size={18} color="#FFFFFF" />
            <Text style={styles.backBtnText}>Go Back</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    gap: 16,
  },
  iconWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#6C63FF22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  sub: {
    color: '#A0A0C0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: '#FFA50212',
    borderWidth: 1,
    borderColor: '#FFA50233',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    width: '100%',
    marginTop: 8,
  },
  infoText: {
    color: '#FFA502',
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  backBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    width: '100%',
    justifyContent: 'center',
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
});
