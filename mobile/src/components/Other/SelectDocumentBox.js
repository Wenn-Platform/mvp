import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const {width} = Dimensions.get('window');

const data = [
  {id: '1', name: 'Katie P. Resume'},
  {id: '2', name: 'References'},
  {id: '3', name: 'Katie Pena Portfolio'},
];

export default function JobDescriptionScreen() {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxPress = itemId => {
    setCheckedItems(prevCheckedItems => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };

  const renderItem = ({item}) => {
    const isChecked = checkedItems[item.id] || false;

    return (
      <Pressable
        onPress={() => handleCheckboxPress(item.id)}
        style={styles.documentNameItem}>
        <Text style={styles.documentNametext}>{item.name}</Text>

        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkboxActive]}
          onPress={() => handleCheckboxPress(item.id)}>
          {isChecked && (
            <Image
              style={{width: 10, height: 10, resizeMode: 'contain'}}
              source={require('../../assets/icons/check.png')}
            />
          )}
        </TouchableOpacity>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectDocumentContainer}>
        <Text style={styles.titleText}>
          Which documents do you want to{'\n'}submit with your application?
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  selectDocumentContainer: {
    width: width - 50,
    paddingVertical: RFValue(16),
    paddingTop: 15,
    backgroundColor: '#084768',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 21,
    marginBottom:16,
  },
  titleText: {
    color: '#fff',
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(14),
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 12,
  },
  documentNameItem: {
    width: width - 80,
    height: RFValue(54),
    backgroundColor: '#fff',
    borderRadius: 7,
    alignSelf: 'center',
    borderWidth: 0.85,
    borderColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 41,
    paddingRight: 30,
    marginBottom: 11,
  },
  documentNametext: {
    fontSize: RFValue(12.5),
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 3,
    borderRadius: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  checkboxActive: {
    backgroundColor: '#000',
  },
});
