import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

export default function PreferencesScreen({ navigation }: Props) {
  const [dietary, setDietary] = useState('');
  const [allergies, setAllergies] = useState('');
  const [favorites, setFavorites] = useState('');

  const handleSave = () => {
    console.log('Saving preferences:', { dietary, allergies, favorites });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        <SvgXml xml={backgroundSvg} width="100%" height="100%" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={32} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Your</Text>
            <Text style={styles.title}>Preferences</Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dietary Restrictions</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., Vegetarian, Vegan, etc."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={dietary}
                onChangeText={setDietary}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Allergies</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., Nuts, Dairy, etc."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={allergies}
                onChangeText={setAllergies}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Favorite Foods</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., Pizza, Salad, etc."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={favorites}
                onChangeText={setFavorites}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.saveButtonContainer}
            onPress={handleSave}
          >
            <LinearGradient
              colors={['#CC0033', '#CC0033']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save Preferences</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    marginLeft: -4,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 54,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    height: 56,
  },
  saveButtonContainer: {
    marginTop: 12,
    marginBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  saveButton: {
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});