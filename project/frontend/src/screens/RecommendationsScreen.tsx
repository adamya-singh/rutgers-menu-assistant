import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { SvgXml } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

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

type MealRecommendation = {
  id: string;
  name: string;
  locations: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
};

type Props = NativeStackScreenProps<RootStackParamList, 'Recommendations'>;

export default function RecommendationsScreen({ navigation }: Props) {
  const [recommendations, setRecommendations] = useState<MealRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();

  const sampleData: MealRecommendation[] = [
    {
      id: '1',
      name: 'Grilled Chicken Caesar',
      locations: ['Busch Dining Hall', 'Livingston Commons'],
      nutrition: {
        calories: 450,
        protein: 32,
        carbs: 25,
        fat: 15,
      },
      tags: ['High Protein', 'Gluten Free Option'],
    },
    {
      id: '2',
      name: 'Vegetarian Buddha Bowl',
      locations: ['Neilson Dining', 'The Atrium'],
      nutrition: {
        calories: 380,
        protein: 18,
        carbs: 48,
        fat: 12,
      },
      tags: ['Vegetarian', 'Vegan Option'],
    },
    {
      id: '3',
      name: 'Mediterranean Quinoa',
      locations: ['Livingston Commons'],
      nutrition: {
        calories: 420,
        protein: 15,
        carbs: 52,
        fat: 18,
      },
      tags: ['Vegetarian', 'Heart Healthy'],
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setRecommendations(sampleData);
    }, 1500);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: position.x, dy: position.y }
    ], { useNativeDriver: false }),
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dx) > width * 0.4) {
        const direction = gesture.dx > 0 ? 1 : -1;
        Animated.timing(position, {
          toValue: { x: direction * width * 1.5, y: gesture.dy },
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(prevIndex => prevIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const renderCard = (item: MealRecommendation, index: number) => {
    if (index < currentIndex) return null;
    
    const isFirst = index === currentIndex;
    const dragHandlers = isFirst ? panResponder.panHandlers : {};

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.card,
          {
            transform: isFirst ? [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: position.x.interpolate({
                inputRange: [-width / 2, 0, width / 2],
                outputRange: ['-10deg', '0deg', '10deg'],
              })},
            ] : undefined,
            zIndex: recommendations.length - index,
          },
        ]}
        {...dragHandlers}
      >
        <LinearGradient
          colors={['#CC0033', '#CC0033']}
          style={styles.cardContent}
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Available at:</Text>
            {item.locations.map((location, i) => (
              <Text key={i} style={styles.locationText}>• {location}</Text>
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Nutrition Facts:</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{item.nutrition.calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{item.nutrition.protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{item.nutrition.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{item.nutrition.fat}g</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {item.tags.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.swipeText}>Swipe to see next recommendation</Text>
        </LinearGradient>
      </Animated.View>
    );
  };

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
            <Text style={styles.title}>Recommended</Text>
            <Text style={styles.title}>For You</Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#CC0033" />
            </View>
          ) : (
            recommendations.map((item, index) => renderCard(item, index))
          )}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: width - 48,
    height: height * 0.6,
    borderRadius: 32,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 24,
    height: '100%',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginLeft: 8,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  swipeText: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 0.6,
    fontSize: 14,
  },
});