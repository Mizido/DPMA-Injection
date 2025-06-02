import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const recordsData = [
  { name: 'Joana May Santos', date: 'June 10, 2025', type: 'Upcoming', barangay: 'Triangulo' },
  { name: 'Kassandra Nino', date: 'May 20, 2025', type: 'Missed', barangay: 'Bagumbayan Norte' },
  { name: 'Kristine Roxas', date: 'March 15, 2025', type: 'Completed', barangay: 'Lerma' },
  { name: 'May Anne Toyo', date: 'August 20, 2025', type: 'Completed', barangay: 'Triangulo' },
  { name: 'Vanessa Polo', date: 'December 10, 2025', type: 'Completed', barangay: 'Calauag' },
  { name: 'Mary Takwil', date: 'October 15, 2025', type: 'Missed', barangay: 'Calauag' },
  { name: 'Annie Lora', date: 'July 7, 2025', type: 'Upcoming', barangay: 'Abella' },
];

const barangays = [
  'All',
  'Abella', 'Bagong Silang', 'Bagumbayan Norte', 'Bagumbayan Sur', 'Balatas', 'Calauag',
  'Cararayan', 'Concepcion Grande', 'Concepcion Pequeña', 'Dayangdang', 'Dinaga', 'Igualdad',
  'Lerma', 'Liboton', 'Mabolo', 'Pacol', 'Panicuason', 'Peñafrancia', 'Sabang', 'San Felipe',
  'San Francisco', 'San Isidro', 'Santa Cruz', 'Tabuco', 'Tinago', 'Tomo-tomo', 'Triangulo'
];

export default function RecordsScreen() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('All');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const filteredRecords = recordsData.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBarangay = selectedBarangay === 'All' || record.barangay === selectedBarangay;
    return matchesSearch && matchesBarangay;
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Completed': return '#4CAF50';
      case 'Missed': return '#F44336';
      case 'Upcoming': return '#FFC107';
      default: return '#ccc';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>View all Records</Text>
        </View>
        <Text style={styles.subHeader}>
          <Text style={{ fontWeight: 'bold' }}>BSPO Officer:</Text> Maria Santos |{' '}
          <Text style={{ fontWeight: 'bold' }}>Barangay:</Text> Triangulo
        </Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Search & Dropdown */}
        <View style={styles.searchRow}>
          <View style={styles.dropdownWrapper}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text>{selectedBarangay} ⌵</Text>
            </TouchableOpacity>
            {dropdownVisible && (
              <ScrollView style={styles.dropdownList}>
                {barangays.map((brgy, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedBarangay(brgy);
                      setDropdownVisible(false);
                    }}
                  >
                    <Text>{brgy}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filters}>
          {['All', 'Pregnant', 'Mothers'].map(label => (
            <TouchableOpacity
              key={label}
              onPress={() => setFilter(label)}
              style={[styles.filterButton, filter === label && styles.activeFilter]}
            >
              <Text style={filter === label ? styles.activeFilterText : styles.filterText}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
          <Text style={[styles.headerCell, { flex: 1.5 }]}>Target Date</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Type</Text>
        </View>

        {/* Records */}
        <FlatList
          data={filteredRecords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recordItem}>
              <Text style={[styles.recordText, { flex: 2 }]}>{item.name}</Text>
              <Text style={[styles.recordText, { flex: 1.5 }]}>{item.date}</Text>
              <Text style={[styles.badge, { backgroundColor: getBadgeColor(item.type), flex: 1 }]}>
                {item.type}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Bottom Nav */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.navItem}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/records')}>
          <Text style={styles.navItemActive}>📁 Records</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.navItem}>➕ Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/calendar')}>
          <Text style={styles.navItem}>📅 Calendar</Text>
        </TouchableOpacity>
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

  body: { flex: 1, padding: 20 },
  searchRow: { flexDirection: 'row', gap: 10, zIndex: 1 },

  dropdownWrapper: { position: 'relative', flex: 1,  zIndex: 10,},
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  dropdownList: {
    position: 'absolute',
    top: 42,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    maxHeight: 200,
    zIndex: 999,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, flex: 2 },

  filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginTop: 10 },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeFilter: { backgroundColor: '#4CAF50' },
  filterText: { color: '#555' },
  activeFilterText: { color: '#fff' },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#333',
  },

  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  recordText: { color: '#333' },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
});
