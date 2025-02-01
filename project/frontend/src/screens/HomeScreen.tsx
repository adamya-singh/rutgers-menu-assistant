import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RU Menu Assistant</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>View Today's Menu</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Preferences')}>
        <Text style={styles.buttonText}>Set Preferences</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Recommendations')}>
        <Text style={styles.buttonText}>Get Recommendations</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#CC0033',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#CC0033',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default HomeScreen