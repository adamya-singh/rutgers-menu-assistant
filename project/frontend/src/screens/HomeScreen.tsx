import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Switch,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Background gradient circles SVG
const backgroundSvg = `
<svg viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#CC0033;stop-opacity:0.2"/>
      <stop offset="100%" style="stop-color:#990026;stop-opacity:0.1"/>
    </linearGradient>
  </defs>
  <circle cx="350" cy="150" r="200" fill="url(#gradientRed)" opacity="0.4"/>
  <circle cx="50" cy="400" r="250" fill="url(#gradientRed)" opacity="0.3"/>
  <circle cx="300" cy="700" r="180" fill="url(#gradientRed)" opacity="0.2"/>
</svg>`;

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = {
    backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    textColor: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    cardBackground: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    secondaryText: isDarkMode ? '#CCCCCC' : '#666666',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      <View style={styles.backgroundContainer}>
        <SvgXml xml={backgroundSvg} width="100%" height="100%" />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.textColor }]}>RU Dining</Text>
          <TouchableOpacity style={[styles.dashboardButton, { backgroundColor: isDarkMode ? 'rgba(204, 0, 51, 0.1)' : 'rgba(204, 0, 51, 0.1)' }]}>
            <Text style={styles.dashboardText}>Dashboard</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.textColor }]}>Find and</Text>
            <Text style={[styles.title, { color: theme.textColor }]}>explore</Text>
            <Text style={[styles.title, { color: theme.textColor }]}>dining at</Text>
            <Text style={[styles.title, styles.highlight]}>Rutgers</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Learn')}
            >
              <Text style={styles.secondaryButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: theme.cardBackground }]}
              onPress={() => navigation.navigate('Preferences')}
            >
              <Ionicons name="heart" size={28} color="#CC0033" />
              <Text style={[styles.actionText, { color: theme.textColor }]}>Preferences</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigation.navigate('Recommendations')}
            >
              <Ionicons name="star" size={28} color="#CC0033" />
              <Text style={[styles.actionText, { color: theme.textColor }]}>For You</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.themeToggleContainer}>
        <View style={styles.themeToggle}>
          <Switch
            value={isDarkMode}
            onValueChange={(val) => setIsDarkMode(val)}
            trackColor={{ false: '#666666', true: '#CC0033' }}
            thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
            style={{ transform: [{ scale: 0.8 }] }}
          />
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={20}
            color="#FFFFFF"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dashboardButton: {
    backgroundColor: 'rgba(204, 0, 51, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  dashboardText: {
    color: '#CC0033',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
  },
  titleContainer: {
    width: '100%',
    marginBottom: 48,
  },
  title: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 62,
  },
  highlight: {
    color: '#CC0033',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#CC0033',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(204, 0, 51, 0.3)',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#CC0033',
    fontSize: 18,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    gap: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  themeToggleContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(40, 40, 40, 0.8)',
    borderRadius: 20,
    padding: 8,
    gap: 8,
  },
});