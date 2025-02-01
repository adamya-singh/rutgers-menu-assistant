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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

export default function PreferencesScreen({ navigation }: Props) {
  const [dietary, setDietary] = useState('');
  const [allergies, setAllergies] = useState('');
  const [favorites, setFavorites] = useState('');

  const handleSave = () => {
    console.log('Saving preferences:', { dietary, allergies, favorites });
    navigation.goBack();
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBack} onPress={handleGoBack}>
            <Ionicons name="chevron-back" size={28} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Your Preferences</Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dietary Restrictions:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Vegetarian, Vegan, etc."
              placeholderTextColor="#666666"
              value={dietary}
              onChangeText={setDietary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Allergies:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Nuts, Dairy, etc."
              placeholderTextColor="#666666"
              value={allergies}
              onChangeText={setAllergies}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Favorite Foods:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Pizza, Salad, etc."
              placeholderTextColor="#666666"
              value={favorites}
              onChangeText={setFavorites}
            />
          </View>

          <TouchableOpacity onPress={handleSave}>
            <LinearGradient
              colors={['#CC0033', '#990026']}
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
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CC0033',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBack: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  saveButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});