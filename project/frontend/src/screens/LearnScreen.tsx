import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { SvgXml } from 'react-native-svg';

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

type Props = NativeStackScreenProps<RootStackParamList, 'Learn'>;

const DiningHallInfo = [
  {
    name: 'Busch Dining Commons',
    location: 'Busch Campus',
    mapLink: 'https://maps.app.goo.gl/FC6eCZQAnhejVkFDA',
    hours: {
      weekday: '7:00am – 9:00pm',
      weekend: '9:30am – 8:00pm',
      takeout: {
        breakfast: 'Weekdays, 7:00am – 11:00am',
        lunch: 'Weekdays, 11:00am – 4:00pm',
        dinner: 'Monday to Thursday, 5:00pm – 11:00pm'
      }
    }
  },
  {
    name: 'Livingston Dining Commons',
    location: 'Behind Livingston Student Center',
    mapLink: 'https://maps.app.goo.gl/4Ws1B6DhSs16r8iz5',
    hours: {
      weekday: '7:00am – 9:00pm',
      weekend: '9:30am – 8:00pm'
    }
  },
  {
    name: 'The Atrium',
    location: 'College Avenue Student Center',
    mapLink: 'https://maps.app.goo.gl/ShrX88v1c7Y5EhrT6',
    hours: {
      mondayToThursday: '7:00am – 11:00pm',
      friday: '7:00am – 9:00pm',
      weekend: '9:30am – 8:00pm'
    }
  },
  {
    name: 'Neilson Dining Hall',
    location: 'Near Katzenbach Bus Stop',
    mapLink: 'https://maps.app.goo.gl/3B5Ze7tdcZwKnpVP7',
    hours: {
      weekday: '7:00am – 9:00pm',
      weekend: '9:30am – 8:00pm',
      takeout: {
        dinner: 'Monday – Thursday, 5:00pm – 9:00pm'
      }
    }
  }
];

export default function LearnScreen({ navigation }: Props) {
  const handleMapPress = (mapLink: string) => {
    Linking.openURL(mapLink);
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
            <Text style={styles.title}>Dining Halls</Text>
            <Text style={styles.subtitle}>Hours & Locations</Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {DiningHallInfo.map((hall, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.hallName}>{hall.name}</Text>
                <TouchableOpacity 
                  onPress={() => handleMapPress(hall.mapLink)}
                >
                  <Text style={styles.locationLink}>{hall.location}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.hoursContainer}>
                <Text style={styles.sectionTitle}>Hours</Text>
                {hall.hours.weekday && (
                  <View style={styles.hourRow}>
                    <Text style={styles.hourLabel}>Weekdays:</Text>
                    <Text style={styles.hourText}>{hall.hours.weekday}</Text>
                  </View>
                )}
                {hall.hours.weekend && (
                  <View style={styles.hourRow}>
                    <Text style={styles.hourLabel}>Weekends:</Text>
                    <Text style={styles.hourText}>{hall.hours.weekend}</Text>
                  </View>
                )}
                {hall.hours.mondayToThursday && (
                  <View style={styles.hourRow}>
                    <Text style={styles.hourLabel}>Mon-Thu:</Text>
                    <Text style={styles.hourText}>{hall.hours.mondayToThursday}</Text>
                  </View>
                )}
                {hall.hours.friday && (
                  <View style={styles.hourRow}>
                    <Text style={styles.hourLabel}>Friday:</Text>
                    <Text style={styles.hourText}>{hall.hours.friday}</Text>
                  </View>
                )}

                {hall.hours.takeout && (
                  <View style={styles.takeoutSection}>
                    <Text style={styles.sectionTitle}>Takeout Hours</Text>
                    {hall.hours.takeout.breakfast && (
                      <View style={styles.hourRow}>
                        <Text style={styles.hourLabel}>Breakfast:</Text>
                        <Text style={styles.hourText}>{hall.hours.takeout.breakfast}</Text>
                      </View>
                    )}
                    {hall.hours.takeout.lunch && (
                      <View style={styles.hourRow}>
                        <Text style={styles.hourLabel}>Lunch:</Text>
                        <Text style={styles.hourText}>{hall.hours.takeout.lunch}</Text>
                      </View>
                    )}
                    {hall.hours.takeout.dinner && (
                      <View style={styles.hourRow}>
                        <Text style={styles.hourLabel}>Dinner:</Text>
                        <Text style={styles.hourText}>{hall.hours.takeout.dinner}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
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
  subtitle: {
    fontSize: 24,
    color: '#CCCCCC',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  card: {
    backgroundColor: '#CC0033',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  cardHeader: {
    marginBottom: 16,
  },
  hallName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationLink: {
    fontSize: 16,
    color: '#00BFFF', // Bright blue to indicate it's a link
    textDecorationLine: 'underline', // Underline to suggest it's clickable
  },
  hoursContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hourLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
  },
  hourText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 2,
  },
  takeoutSection: {
    marginTop: 8,
    gap: 8,
  },
});