import { StyleSheet, TouchableOpacity , Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Days } from "./Days";

export function DailySchedule({item}) {

  return (
    <View style={styles.container}>
      <FlatList
            style={styles.shiftList}
            data={userData.currentAndFutureWeeklySchedules}
            renderItem={({ item }) => <Days item={item} />}
          />
      {/* <TouchableOpacity>
          <View style={styles.shiftListItem}>
              <View style={styles.dayBox}>
                <Text style={styles.text} >{item.dayOfWeek}</Text>
                <Text style={styles.text} >{item.dateAssigned}</Text>
              </View>
              
          </View>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      //alignItems: 'center',
      justifyContent: "center",
      marginLeft: 10,
    },
    shiftListItem: {
      padding: 10,
      marginTop: 16,
      borderColor: "#bbb",
      borderWidth: 1,
      borderStyle: "dashed",
      borderRadius: 10,
      
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
      color: "black",
    },
    dayBox: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      paddingVertical: 10,
      //marginTop: 16,
      borderColor: "#bbb",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 10,
      
    },
  });
  