import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const [bspoName, setBspoName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to /family after login
    router.push('/family');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>     
        <Image
          source={require('../assets/cpno.png.png')} // Replace with your actual file
          style={styles.logo}
        />
        <Image
          source={require('../assets/naga.png.png')} // Replace with your actual file
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>City population & Nutrition{"\n"}Office Naga City</Text>

      <TextInput
        style={styles.input}
        placeholder="BSPO Name"
        value={bspoName}
        onChangeText={setBspoName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Don’t have an account? <Text style={{ fontWeight: 'bold' }}>Register</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24, // slightly increased spacing
  },
  logo: {
    width: 150,          // increased from 60
    height: 150,         // increased from 60
    marginHorizontal: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,       // increased from 18
    fontWeight: '700',  // bolder than 600
    textAlign: 'center',
    marginBottom: 30,   // slightly more spacing below title
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 14,
    paddingLeft: 20,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,       // slightly larger text for button
  },
  registerText: {
    marginTop: 18,
    color: '#555',
    fontSize: 14,
  },
});



