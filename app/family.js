import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


const recentRegistrations = [
  { initials: 'JM', name: 'Joana May Santos', age: 17, zone: 'Zone 1 Azuzena', status: 'Mother' },
  { initials: 'KS', name: 'Kassandra Nino', age: 19, zone: 'Zone 7 Azuzena', status: 'Pregnant' },
  { initials: 'KR', name: 'Kristine Roxas', age: 18, zone: 'Zone 10 Azuzena', status: 'Mother' },
];

export default function FamilyScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.initialsCircle}>
        <Text style={styles.initialsText}>{item.initials}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.nameText}>{item.name}, {item.age}</Text>
        <Text style={styles.zoneText}>{item.zone}</Text>
      </View>
      <View style={[styles.statusBadge, item.status === 'Mother' ? styles.mother : styles.pregnant]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
   

  );

   const router = useRouter(); 
   const handleViewall = () => {
    // Navigate to /family after login
    router.push('/view');
  };


  return (
    <View style={styles.container}>
      <View style={styles.greenHeader} />

      <Text style={styles.headerText}>Dashboard</Text>

      <View style={styles.box}>
        <View style={styles.boxHeader}>
          <Text style={styles.recentText}>Recent Registrations</Text>
          <TouchableOpacity onPress={handleViewall}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtext}>Lastest entries in the system</Text>

        <FlatList
          data={recentRegistrations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.navbar}>
        <Text style={styles.navItemActive}>🏠 Home</Text>
        <Text style={styles.navItem}>📁 Records</Text>
        <Text style={styles.navItem}>➕ Register</Text>
         <Text style={styles.navItem}>📅 Schedule</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greenHeader: {
    height: 40,
    backgroundColor: '#28a745',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  box: {
    margin: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAll: {
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontSize: 12,
  },
  subtext: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initialsText: {
    fontWeight: 'bold',
    color: '#333',
  },
  nameText: {
    fontWeight: 'bold',
  },
  zoneText: {
    color: '#666',
    fontSize: 12,
  },
  statusBadge: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  mother: {
    backgroundColor: '#28a745',
  },
  pregnant: {
    backgroundColor: '#007bff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    fontSize: 12,
    color: '#777',
  },
  navItemActive: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: 'bold',
  },
});