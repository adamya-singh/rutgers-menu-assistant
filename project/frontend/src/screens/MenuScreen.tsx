import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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
      colors: ['#CC0033', '#CC0033'] as const,
      description: 'Dining Commons',
    },
    {
      id: 'livingston',
      name: 'Livingston',
      icon: 'nutrition-outline',
      colors: ['#CC0033', '#CC0033'] as const,
      description: 'Dining Commons',
    },
    {
      id: 'neilson',
      name: 'Neilson',
      icon: 'cafe-outline',
      colors: ['#CC0033', '#CC0033'] as const,
      description: 'Dining Hall',
    },
    {
      id: 'atrium',
      name: 'The Atrium',
      icon: 'fast-food-outline',
      colors: ['#CC0033', '#CC0033'] as const,
      description: 'Food Court',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        <SvgXml xml={backgroundSvg} width="100%" height="100%" />
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={32} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>What's On the</Text>
            <Text style={styles.title}>Menu?</Text>
          </View>
        </View>
        
        <View style={styles.cardsContainer}>
          {diningHalls.map((hall) => (
            <TouchableOpacity
              key={hall.id}
              style={styles.card}
              onPress={() => navigation.navigate('DiningHallMenu', { 
                diningHallId: hall.id,
                diningHallName: hall.name 
              })}
            >
              <LinearGradient
                colors={hall.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardContent}
              >
                <View style={styles.cardLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={hall.icon} size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{hall.name}</Text>
                    <Text style={styles.cardSubtitle}>{hall.description}</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Menu</Text>
                  <Ionicons name="chevron-forward" size={20} color="#CC0033" />
                </TouchableOpacity>
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
    marginBottom: 20,
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
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  card: {
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 16,
    height: 100,
  },
  cardContent: {
    paddingHorizontal: 28,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 24,
    gap: 4,
    width: 120,
    justifyContent: 'center',
  },
  viewButtonText: {
    color: '#CC0033',
    fontSize: 15,
    fontWeight: '600',
  },
});