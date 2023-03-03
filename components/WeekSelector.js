import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Days } from "./Days";

export function WeekSelector({ item }) {
    const [weekSelected, setweekSelected] = useState(0);
    const onPressPrev = () => setweekSelected(weekSelected => {
        if (weekSelected > 0) {
            return weekSelected - 1;
        }
    });
    const onPressNext = () => setweekSelected(weekSelected => {
        if (weekSelected < item.length){
            return weekSelected + 1;
        }
    });

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={onPressPrev}>
        <Text style={styles.text}>Prev</Text>
      </TouchableOpacity>

      {/* <Text style={styles.text}>{item[weekSelected].weekDate}</Text> */}

      <TouchableOpacity style={styles.button} onPress={onPressNext}>
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: "center",
    marginLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
