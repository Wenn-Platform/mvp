import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ImageGrid from "../../components/Other/ImageGrid";

const SelectableSocial = (props) => {
  const [selectedButton, setSelectedButton] = useState("1");

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const socialData = [
    { id: "1", name: "LinkedIn" },
    { id: "2", name: "Twitter" },
    { id: "3", name: "Instagram" },
    // Add more time slots as needed
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === item.id && styles.selectedButton,
        ]}
        onPress={() => handleButtonPress(item.id)}
      >
        <Text
          style={[
            styles.buttonText,
            selectedButton === item.id && styles.selectedButtonText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={socialData}
        contentContainerStyle={{marginLeft:16}}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <ImageGrid selectedPlatform={selectedButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: RFValue(16),
    // marginLeft: RFValue(19),
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: RFValue(8),
  },
  buttonText: {
    color: "#000",
    fontSize: RFValue(12),
    fontFamily: "Inter-Bold",
  },
  selectedButton: {
    backgroundColor: "#084768",
    borderWidth: 0,
  },
  selectedButtonText: {
    color: "#fff",
    fontSize: RFValue(12),
    fontFamily: "Inter-Bold",
  },
});

export default SelectableSocial;
