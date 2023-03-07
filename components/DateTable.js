import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DateTable = ({ startDate, endDate, filteredData }) => {
  var dates = [];

    function generateDates(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const newDates = [];

      while (start <= end) {
        newDates.push(start.toISOString().slice(0, 10));
        start.setDate(start.getDate() + 1);
        console.log(start);
      }

      newDates.forEach((date) => {dates.push(date)
      console.log(date)});
    };
    generateDates(startDate, startDate);

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.dateText}>{item}</Text>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  dateText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default DateTable;
