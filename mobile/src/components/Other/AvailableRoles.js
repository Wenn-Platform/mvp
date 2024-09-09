import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AvialableRolesItem from './AvialableRolesItem';

export default function AvailableRoles() {
  const [selectedButton, setSelectedButton] = useState('1');
  const scrollViewRef = useRef(null);

  const handleButtonPress = (button) => {
    setSelectedButton(button);

    // Scroll to the selected button
    if (scrollViewRef.current && button === '3'||button==='4') {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const avialableRolesData = [
    { id: '1', name: 'All Departments' },
    { id: '2', name: 'Developer & Engineer' },
    { id: '3', name: 'Design' },
    { id: '4', name: 'Project Management' },
    // Add more time slots as needed
  ];

  //   For our Roles
  const data = [
    { id: '1', role: 'Developer & Engineer', title: 'Junior Project Manager' },
    { id: '2', role: 'Developer & Engineer', title: 'Mid Project Manager' },
    { id: '3', role: 'Design', title: 'Senior UI Designer' },
    { id: '4', role: 'Design', title: 'Mid UI Designer' },
    { id: '5', role: 'Project Management', title: 'Senior UX Manager' },
    { id: '6', role: 'Design', title: 'Junior Graphic Designer' },
    { id: '7', role: 'Developer & Engineer', title: 'Mid Front-End Developer' },
    { id: '8', role: 'Developer & Engineer', title: 'Senior Full Stack Developer' },
    { id: '9', role: 'Developer & Engineer', title: 'Senior iOS Developer' },
  ];

  const filteredData =
    selectedButton === '1'
      ? data
      : data.filter((item) => item.role.toLowerCase() === avialableRolesData[selectedButton - 1].name.toLowerCase());

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.button, selectedButton === item.id && styles.selectedButton]}
        onPress={() => handleButtonPress(item.id)}>
        <Text style={[styles.buttonText, selectedButton === item.id && styles.selectedButtonText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.socialContainer}>
      <Text style={styles.socialText}>Available Roles ({filteredData.length})</Text>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.buttonsContainer}>
          <FlatList
            data={avialableRolesData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <FlatList
        nestedScrollEnabled
        contentContainerStyle={{ marginTop: 16 }}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AvialableRolesItem title={item.title} role={item.role} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  socialText: {
    color: '#000',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(21.5),
    marginHorizontal: 16,
    marginTop: 45,
  },
  socialContainer: {
    flex: 1,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFValue(8),
  },
  buttonText: {
    color: '#000',
    fontSize: RFValue(12),
    fontFamily: 'Inter-Bold',
  },
  selectedButton: {
    backgroundColor: '#084768',
    borderWidth: 0,
  },
  selectedButtonText: {
    color: '#fff',
    fontSize: RFValue(12),
    fontFamily: 'Inter-Bold',
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});
