import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'; // Make sure you have installed this library and imported it correctly.

const dataItems = ['Fulltime', 'Remote', 'Design'];

const JobDescriptionBenefits = () => {
  const renderItem = ({item}) => (
    <View style={styles.benefitItem}>
      <Text style={styles.benefitText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={styles.rowContainer}
      />
    </View>
  );
};

export default JobDescriptionBenefits;
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    // flexWrap:"wrap",
    alignSelf: 'center',
    marginTop: RFValue(10),
  },
  benefitItem: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 11,
    maxWidth: RFValue(70),
    backgroundColor: '#084768',
    borderRadius: 100,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: RFValue(11),
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
});
