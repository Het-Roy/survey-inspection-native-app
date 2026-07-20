import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';



function CustomDrawerContent(props) {
  return (
    <View style={drawerStyles.drawerContainer}>
      {/* Header */}
      <SafeAreaView style={drawerStyles.drawerHeader}>
        <View style={drawerStyles.drawerAvatarWrap}>
          <View style={drawerStyles.drawerAvatar}>
            <Text style={drawerStyles.drawerAvatarText}>RH</Text>
          </View>
          <View style={drawerStyles.drawerBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#00D4AA" />
          </View>
        </View>
        <Text style={drawerStyles.drawerName}>Roy Het Jayeshkumar</Text>
        <Text style={drawerStyles.drawerRole}>Survey Inspector</Text>
        <View style={drawerStyles.drawerDivider} />
      </SafeAreaView>

      {/* Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={drawerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={drawerStyles.drawerFooter}>
        <Text style={drawerStyles.footerText}>Survey & Inspection App</Text>
        <Text style={drawerStyles.footerVersion}>v1.0.0</Text>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#0F0F1A', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0 },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700', fontSize: 18, color: '#FFFFFF' },
        drawerStyle: { backgroundColor: '#0F0F1A', width: 280, borderRightWidth: 1, borderRightColor: '#2A2A4A' },
        drawerActiveTintColor: '#6C63FF',
        drawerInactiveTintColor: '#A0A0C0',
        drawerActiveBackgroundColor: '#6C63FF22',
        drawerLabelStyle: { fontSize: 15, fontWeight: '600', marginLeft: -8 },
        drawerItemStyle: { borderRadius: 12, marginHorizontal: 8, marginVertical: 2 },
        headerBackground: () => <View style={{ flex: 1, backgroundColor: '#0F0F1A' }} />,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Dashboard',
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="survey"
        options={{
          title: 'Survey Preview',
          drawerLabel: 'Survey Preview',
          drawerIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="survey_history"
        options={{
          title: 'Survey History',
          drawerLabel: 'Survey History',
          drawerIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="camera"
        options={{
          title: 'Camera',
          drawerLabel: 'Camera',
          drawerIcon: ({ color, size }) => <Ionicons name="camera-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          drawerLabel: 'Contacts',
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="location"
        options={{
          title: 'Location',
          drawerLabel: 'Location',
          drawerIcon: ({ color, size }) => <Ionicons name="location-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="clipboard"
        options={{
          title: 'Clipboard',
          drawerLabel: 'Clipboard',
          drawerIcon: ({ color, size }) => <Ionicons name="clipboard-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const drawerStyles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  drawerHeader: {
    padding: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  drawerAvatarWrap: {
    position: 'relative',
    marginBottom: 14,
  },
  drawerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#6C63FF55',
  },
  drawerAvatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 24,
  },
  drawerBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0F0F1A',
    borderRadius: 10,
  },
  drawerName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 4,
  },
  drawerRole: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#2A2A4A',
    width: '100%',
  },
  scrollContent: {
    paddingTop: 8,
  },
  drawerFooter: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2A2A4A',
  },
  footerText: {
    color: '#4A4A6A',
    fontSize: 12,
    marginBottom: 2,
  },
  footerVersion: {
    color: '#2A2A4A',
    fontSize: 11,
  },
});