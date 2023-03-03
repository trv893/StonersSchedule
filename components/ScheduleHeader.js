import { StyleSheet, TouchableOpacity , Text, View } from "react-native";
import React, { useState } from "react";

export function ScheduleHeader(weekDate) {
  return (
    <View style={styles.container}>
      <Text style={styles.weekOf}>Date: {weekDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    color: "black",
    //alignItems: 'center',
    justifyContent: "center",
  },
  weekOf: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
  }
});
