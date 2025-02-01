import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type PreferencesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Preferences'>;
};

const PreferencesScreen = ({ navigation }: PreferencesScreenProps) => {
  const [preferences, setPreferences] = useState({
    dietary: '',
    allergies: '',
    favorites: '',
  });

  const savePreferences = () => {
    // TODO: Implement saving preferences
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Preferences</Text>

        <Text style={styles.label}>Dietary Restrictions:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Vegetarian, Vegan, etc."
          value={preferences.dietary}
          onChangeText={(text) => setPreferences({ ...preferences, dietary: text })}
        />

        <Text style={styles.label}>Allergies:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Nuts, Dairy, etc."
          value={preferences.allergies}
          onChangeText={(text) => setPreferences({ ...preferences, allergies: text })}
        />

        <Text style={styles.label}>Favorite Foods:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Pizza, Salad, etc."
          value={preferences.favorites}
          onChangeText={(text) => setPreferences({ ...preferences, favorites: text })}
        />

        <TouchableOpacity style={styles.button} onPress={savePreferences}>
          <Text style={styles.buttonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#CC0033',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default PreferencesScreen