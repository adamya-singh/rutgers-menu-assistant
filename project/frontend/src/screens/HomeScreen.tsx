import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const theme = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#000000',
    subTextColor: isDarkMode ? '#999999' : '#666666',
    cardBackground: isDarkMode ? 'rgba(40, 40, 40, 0.9)' : '#ffffff',
    headerBg: '#CC0033',
    accentColor: '#CC0033',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContent}>
          <View style={styles.greeting}>
            <Text style={[styles.greetingText, { color: theme.textColor }]}>
              Hello, Scarlet Knight
            </Text>
            <Text style={[styles.subGreeting, { color: theme.subTextColor }]}>
              What would you like to eat today?
            </Text>
          </View>

          <View style={styles.mainCard}>
            <LinearGradient
              colors={['#CC0033', '#990026']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainCardGradient}
            >
              <View style={styles.mainCardContent}>
                <Text style={styles.mainCardTitle}>Today's Menu</Text>
                <Text style={styles.mainCardSubtitle}>Check what's cooking</Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('Menu')}
                >
                  <Text style={styles.viewButtonText}>View Menu</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: theme.cardBackground }]}
              onPress={() => navigation.navigate('Preferences')}
            >
              <View style={styles.optionContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name="heart" size={24} color="#CC0033" />
                </View>
                <Text style={[styles.optionTitle, { color: theme.textColor }]}>
                  Preferences
                </Text>
                <Text style={[styles.optionDescription, { color: theme.subTextColor }]}>
                  Set your dietary needs
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: theme.cardBackground }]}
              onPress={() => navigation.navigate('Recommendations')}
            >
              <View style={styles.optionContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name="star" size={24} color="#CC0033" />
                </View>
                <Text style={[styles.optionTitle, { color: theme.textColor }]}>
                  For You
                </Text>
                <Text style={[styles.optionDescription, { color: theme.subTextColor }]}>
                  Personalized picks
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.themeToggleContainer}>
        <View style={styles.themeToggle}>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#ffffff', true: '#CC0033' }}
            thumbColor={isDarkMode ? '#ffffff' : '#CC0033'}
            style={{ transform: [{ scale: 0.8 }] }}
          />
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={20}
            color={isDarkMode ? '#ffffff' : '#000000'}
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
  scrollView: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
  },
  mainCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#CC0033',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mainCardGradient: {
    padding: 24,
  },
  mainCardContent: {
    gap: 8,
  },
  mainCardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mainCardSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  viewButtonText: {
    color: '#CC0033',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  optionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  optionContent: {
    gap: 12,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(204, 0, 51, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
  },
  themeToggleContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
    zIndex: 100,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(40, 40, 40, 0.8)',
    borderRadius: 20,
    padding: 6,
    gap: 4,
  },
});