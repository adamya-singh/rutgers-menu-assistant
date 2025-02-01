import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type DiningHall = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: readonly [string, string];
  description: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

export default function MenuScreen({ navigation }: Props) {
  const diningHalls: DiningHall[] = [
    {
      id: 'busch',
      name: 'Busch',
      icon: 'restaurant-outline',
      colors: ['#CC0033', '#800020'] as const,
      description: 'Dining Commons',
    },
    {
      id: 'livingston',
      name: 'Livingston',
      icon: 'nutrition-outline',
      colors: ['#990026', '#4D0013'] as const,
      description: 'Dining Commons',
    },
    {
      id: 'neilson',
      name: 'Neilson',
      icon: 'cafe-outline',
      colors: ['#800020', '#330000'] as const,
      description: 'Dining Hall',
    },
    {
      id: 'atrium',
      name: 'The Atrium',
      icon: 'fast-food-outline',
      colors: ['#660019', '#1A0000'] as const,
      description: 'Food Court',
    },
  ];

  const handleDiningHallPress = (diningHall: DiningHall) => {
    console.log(`Selected ${diningHall.name}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>What's On the Menu?</Text>
          </View>
        </View>
        
        <View style={styles.cardsContainer}>
          {diningHalls.map((hall) => (
            <TouchableOpacity
              key={hall.id}
              style={styles.card}
              onPress={() => handleDiningHallPress(hall)}
            >
              <LinearGradient
                colors={hall.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0.8 }}
                style={styles.cardContent}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={hall.icon} size={28} color="#ffffff" />
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.cardTitle}>{hall.name}</Text>
                    <Text style={styles.cardSubtitle}>{hall.description}</Text>
                  </View>
                </View>
                <View style={styles.cardAction}>
                  <Text style={styles.viewText}>View Menu</Text>
                  <Ionicons name="chevron-forward" size={20} color="#ffffff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    backgroundColor: '#000000',
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
  cardsContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  card: {
    height: '22%',
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
});