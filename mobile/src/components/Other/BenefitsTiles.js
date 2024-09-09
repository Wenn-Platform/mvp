import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const BenefitsTiles = ({ benefits }) => {
  const [showMore, setShowMore] = useState(false);
  const maxItemsPerRow = 3;
  const maxVisibleItems = 5;
  const showMoreText = `+${benefits.length - maxVisibleItems} more`;

  const renderBenefitItem = (benefit, index) => (
    <View
      key={index}
      style={[
        styles.benefitContainer,
        index >= maxItemsPerRow && { marginTop: 0 },
        index === 0 && styles.highlightedBenefitContainer,
      ]}
    >
      <Text style={[styles.benefitText,
    index===0&&styles.highlightedBenefitText,
    ]}>{benefit}</Text>
    </View>
  );

  const renderVisibleBenefits = () => benefits.slice(0, maxVisibleItems).map(renderBenefitItem);
  const renderAllBenefits = () => benefits.map(renderBenefitItem);

  return (
    <View style={styles.container}>
      <View style={styles.benefitsWrapper}>
        {renderVisibleBenefits()}
        {showMore && renderAllBenefits().slice(maxVisibleItems)}
        {benefits.length > maxVisibleItems && (
        <TouchableOpacity onPress={() => setShowMore(!showMore)} style={styles.moreButton}>
          <Text style={styles.moreButtonText}>{showMore ? '- Less' : showMoreText}</Text>
        </TouchableOpacity>
      )}
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
    marginTop:16,
    marginHorizontal:16,
  },
  benefitsWrapper: {
    flexDirection: 'row',
    alignItems:"center",
    flexWrap: 'wrap',
  },
  benefitContainer: {
    padding: 8,
    borderRadius: 5,
     marginBottom: 5,
  },
  highlightedBenefitContainer: {
    backgroundColor: '#084768', // Or any other color you prefer for highlighting
    borderRadius:100,  
},
highlightedBenefitText:
{
color:'#fff',
fontFamily:'Inter-Medium',
fontSize:RFValue(11),
paddingHorizontal:8,
},
  benefitText: {
    color: '#000', // Or any other color you prefer for the text
    fontSize: RFValue(12),
    fontFamily:'Inter-Medium',
    marginHorizontal:10,
  },
  moreButton: {
    // marginTop: 10,
  },
  moreButtonText: {
    color: '#000', // Or any other color you prefer for the text
    fontSize: RFValue(12),
    fontFamily:'Inter-Regular'
  },
});

export default BenefitsTiles;
