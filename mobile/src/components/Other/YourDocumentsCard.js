import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');

export default function YourDocumentsCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Image
          style={styles.documentIcon}
          source={require('../../assets/icons/documentIcon.png')}
        />

        <Text style={styles.documentName}>{props.documentName}</Text>
      </View>

      <View style={styles.docsExtensionContainer}>
        <Text style={styles.docsText}>{props.docsText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 60,
    height: 117,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignSelf: 'center',
    paddingTop: 12,
    paddingHorizontal: 13,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
    marginRight: 13,
  },
  documentName: {
    fontSize: RFValue(14),
    fontFamily: 'Inter-Bold',
    color: '#084768',
  },
  docsExtensionContainer: {
    width: 61,
    height: 23,
    borderRadius: 94,
    backgroundColor: '#9CCDE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  docsText: {
    fontSize: RFValue(11),
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
});
