import React from 'react';
import { View, Switch, StyleSheet, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <View style={styles.themeToggleContainer}>
      <Pressable style={styles.themeToggle} onPress={toggleTheme}>
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
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ThemeToggle;