import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Picker, Platform } from 'react-native';
import DatePicker from 'expo-datepicker';
import { useRouter } from 'expo-router';


export default function Appointment() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState('10');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

  const router = useRouter(); 
     const handleconfirm = () => {
      // Navigate to /family after login
      router.push('/confimation');
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointment</Text>
      <Text style={styles.subheader}>Pick an Available time</Text>

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.calendarBox}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DatePicker
          date={date}
          onDateChange={(selectedDate) => {
            setDate(selectedDate);
            setShowDatePicker(false);
          }}
          mode="date"
        />
      )}

      {/* Time Picker */}
      <Text style={styles.label}>Select a time</Text>
      <View style={styles.timePickerRow}>
        <Picker
          selectedValue={selectedHour}
          onValueChange={(itemValue) => setSelectedHour(itemValue)}
          style={styles.picker}
        >
          {hours.map((hour) => (
            <Picker.Item key={hour} label={hour} value={hour} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedMinute}
          onValueChange={(itemValue) => setSelectedMinute(itemValue)}
          style={styles.picker}
        >
          {minutes.map((minute) => (
            <Picker.Item key={minute} label={minute} value={minute} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedPeriod}
          onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="AM" value="AM" />
          <Picker.Item label="PM" value="PM" />
        </Picker>
      </View>

      {/* Doctor Info */}
      <Text style={styles.label}>Choose a provider</Text>
      <View style={styles.doctorCard}>
        <View style={styles.avatarPlaceholder} />
        <View>
          <Text style={styles.doctorName}>Dr. Mark Datoon</Text>
          <Text style={styles.doctorSpec}>Adolescent Medicine</Text>
        </View>
      </View>

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleconfirm}>
        <Text style={styles.bookButtonText}>Book appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  calendarBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '600',
  },
  timePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    height: Platform.OS === 'ios' ? 120 : 50,
    marginHorizontal: 4,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#ccc',
    borderRadius: 24,
    marginRight: 12,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  doctorSpec: {
    color: 'green',
  },
  bookButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
