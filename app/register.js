import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ClientRegistrationScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    contact: '',
    gravida: '1',
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', form);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Client Registration</Text>
        </View>
        <Text style={styles.subHeader}>
          <Text style={{ fontWeight: 'bold' }}>BSPO Officer:</Text> Maria Santos |{' '}
          <Text style={{ fontWeight: 'bold' }}>Barangay:</Text> Triangulo
        </Text>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Client Information</Text>
        <Text style={styles.subtitle}>Enter the client's information</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={form.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={form.age}
            onChangeText={(text) => handleChange('age', text)}
          />
        </View>

        <TextInput
          style={styles.fullInput}
          placeholder="Address"
          value={form.address}
          onChangeText={(text) => handleChange('address', text)}
        />

        <TextInput
          style={styles.fullInput}
          placeholder="Contact Number"
          keyboardType="phone-pad"
          value={form.contact}
          onChangeText={(text) => handleChange('contact', text)}
        />

        <Text style={styles.label}>Gravida</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.gravida}
            onValueChange={(itemValue) => handleChange('gravida', itemValue)}
            style={styles.picker}
          >
            {[...Array(10).keys()].map(i => (
              <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>✅ Registration Successful!</Text>
            <Text style={{ textAlign: 'center', marginTop: 8, marginBottom: 20 }}>
              Client has been registered successfully.
            </Text>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => {
                setShowModal(false);
                router.push('/appointment'); // You can change this path if needed
              }}
            >
              <Text style={styles.modalButtonText}>Proceed to Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#ccc', marginTop: 10 }]}
              onPress={() => {
                setShowModal(false);
                router.push('/view'); // View records screen
              }}
            >
              <Text style={[styles.modalButtonText, { color: '#333' }]}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push('/')}> <Text style={styles.navItem}>🏠 Home</Text> </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/view')}> <Text style={styles.navItem}>📁 Records</Text> </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')}> <Text style={styles.navItemActive}>➕ Register</Text> </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/calendar')}> <Text style={styles.navItem}>📅 Calendar</Text> </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: { backgroundColor: '#4CAF50' },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#388E3C',
  },
  backButton: { color: '#fff', fontSize: 20, marginRight: 12 },
  headerText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  subHeader: {
    backgroundColor: '#A5D6A7',
    padding: 10,
    color: '#000',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    color: '#666',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
  },
  fullInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
  submitButton: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  submitText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  navItem: { fontSize: 16, color: '#555' },
  navItemActive: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
