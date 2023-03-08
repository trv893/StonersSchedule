import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WeekSelector = ({
  onStartDateChange,
  startDate,
  endDate,
  onUserDaySelect,
}) => {
  // Initialize an empty array to store the dates for the current week
  const days = [];
  // Initialize an array of strings to use as labels for the days of the week
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Loop through the days of the current week, starting with the start date passed as a prop
  for (let i = 0; i < 7; i++) {
    // Create a new Date object for the current day
    const day = new Date(startDate);
    // Add the index of the loop to the date to get the next day of the week
    day.setDate(startDate.getDate() + i);
    // Check if the current day is the current day of the month
    const isCurrentDay = day.toDateString() === new Date().toDateString();
    // Push an object containing the date and whether or not it is the current day of the month to the days array
    days.push({
      date: day,
      isCurrentDay,
    });
  }

  // Handler function for the previous week button press event
  const handlePreviousWeek = () => {
    // Create a new Date object for the new start date, set to 7 days prior to the current start date
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    // Call the onStartDateChange function passed as a prop with the new start date
    onStartDateChange(newStartDate);
  };

  // Handler function for the next week button press event
  const handleNextWeek = () => {
    // Create a new Date object for the new start date, set to 7 days after the current start date
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    // Call the onStartDateChange function passed as a prop with the new start date
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
      {/* Render the month and year for the current week */}
      <View style={styles.monthContainer}>
  <Text style={styles.monthText}>
    {startDate.toLocaleString("default", { month: "long" })}
  </Text>
  <Text style={styles.yearText}>
    {startDate.getFullYear()}
  </Text>
</View>
      {/* Render the previous week button */}
      {/* Render the days of the week */}
      {/* Render the next week button */}
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
            {/* Render the day of the week */}
            <Text style={styles.dayOfWeek}>{dayLabels[date.getDay()]}</Text>
            {/* Render the day of the month */}
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

// Define the styles for the WeekSelector component
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  monthContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 5,
  },
  yearText: {
    fontSize: 24,
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

// Export the WeekSelector component as the default export of this module
export default WeekSelector;
