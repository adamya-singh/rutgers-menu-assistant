import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

const MenuScreen = () => {
  const [menu, setMenu] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement API call to fetch menu
    setLoading(false);
    setMenu(['Loading menu items...']);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Today's Menu</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#CC0033" />
        ) : (
          <View>
            {menu.map((item, index) => (
              <Text key={index} style={styles.menuItem}>
                {item}
              </Text>
            ))}
          </View>
        )}
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
    marginBottom: 20,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MenuScreen