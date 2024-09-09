import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');

const DescriptionCard = ({title, description}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={11} style={styles.description}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 16,
  },
  title: {
    fontSize: RFValue(11),
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: RFValue(14),
    fontFamily: 'Inter-Regular',
    color: '#000000',
    lineHeight: 22,
    textAlign: 'left',
  },
});

export default DescriptionCard;
