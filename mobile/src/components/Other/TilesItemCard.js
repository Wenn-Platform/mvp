import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');

const TilesItemCard = ({items, title, color, row}) => {
  const renderTags = () => {
    const rows = [];
    const numItemsPerRow = row;
    const numRows = Math.ceil(items.length / numItemsPerRow);

    for (let i = 0; i < numRows; i++) {
      const startIndex = i * numItemsPerRow;
      const endIndex = startIndex + numItemsPerRow;
      const rowItems = items.slice(startIndex, endIndex);

      const row = (
        <View key={i} style={styles.row}>
          {rowItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{...styles.tag, backgroundColor: color}}>
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );

      rows.push(row);
    }

    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {renderTags()}
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
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    marginRight: 8,
  },
  tagText: {
    color: '#000',
    fontSize: RFValue(11),
    fontFamily: 'Inter-SemiBold',
  },
  title: {
    color: '#000',
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
});

export default TilesItemCard;
