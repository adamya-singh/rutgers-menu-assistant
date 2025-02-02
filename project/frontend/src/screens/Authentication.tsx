import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import SignInButton from '../../components/SignInButton';

type AuthenticationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Authentication'>;
};

const AuthenticationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Authentication'>>();

  const handleSignIn = () => {
    // Add your sign-in logic here
    console.log('Sign in button pressed');
  };

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
        </View>

        <View style={styles.formContainer}>
          <SignInButton onPress={handleSignIn} />
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

export default AuthenticationScreen;