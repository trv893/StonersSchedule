import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WeekSelector = ({
  onStartDateChange,
  startDate,
  endDate,
  onUserDaySelect,
}) => {
  const days = [];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    const isCurrentDay = day.toDateString() === new Date().toDateString();
    days.push({
      date: day,
      isCurrentDay,
    });
  }

  const handlePreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    onStartDateChange(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    onStartDateChange(newStartDate);
  };

  // Helper function to format the day of the month with the appropriate suffix (e.g. "1st", "2nd", "3rd", "4th")
  const formatDayOfMonth = (date) => {
    const dayOfMonth = date.getDate();
    switch (dayOfMonth) {
      case 1:
      case 21:
      case 31:
        return `${dayOfMonth}st`;
      case 2:
      case 22:
        return `${dayOfMonth}nd`;
      case 3:
      case 23:
        return `${dayOfMonth}rd`;
      default:
        return `${dayOfMonth}th`;
    }
  };
  // Render the component UI
  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <Text>
          {startDate.toLocaleString("default", { month: "long" })}{" "}
          {startDate.getFullYear()}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={handlePreviousWeek} style={styles.button}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
        {days.map(({ date, isCurrentDay }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onUserDaySelect(date)}
            style={[
              styles.dayContainer,
              isCurrentDay && styles.currentDay,
              index === 0 && styles.firstDay,
              index === 6 && styles.lastDay,
              index !== 0 && index !== 6 && styles.middleDay,
            ]}
          >
            <Text style={styles.dayOfWeek}>{dayLabels[date.getDay()]}</Text>
            <Text style={styles.dayOfMonth}>{formatDayOfMonth(date)}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleNextWeek} style={styles.button}>
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  monthContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  yearText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayWrapper: {
    flex: 1,
  },
  dayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  dayOfWeek: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dayOfMonth: {
    fontSize: 14,
  },
  currentDay: {
    backgroundColor: "lightblue",
  },
  firstDay: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  middleDay: {
    borderLeftWidth: 0,
  },
  lastDay: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default WeekSelector;
