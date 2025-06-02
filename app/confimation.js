import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Confirmation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={100} color="#28a745" />
      <Text style={styles.title}>Appointment Booked!</Text>
      <Text style={styles.subtitle}>
        Your appointment with Dr. Mark Datoon has been successfully booked.
      </Text>
      <Text style={styles.details}>10:00 AM · Adolescent Medicine</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/family')}

      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
    color: '#555',
  },
  details: {
    fontSize: 14,
    color: '#28a745',
    marginTop: 10,
    marginBottom: 40,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
