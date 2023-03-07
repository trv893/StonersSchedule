import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WeekSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

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
    setStartDate(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <View style={styles.monthYearWrapper}>
          <Text style={styles.monthText}>
            {startDate.toLocaleString("default", { month: "long" })}
          </Text>
          <Text style={styles.yearText}>{startDate.getFullYear()}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={handlePreviousWeek} style={styles.button}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
        {days.map(({ date, isCurrentDay }, index) => (
          <View key={index} style={styles.dayWrapper}>
            <View
              style={[styles.dayContainer, isCurrentDay && styles.currentDay]}
            >
              <View style={styles.dayOfWeekWrapper}>
                <Text style={styles.dayOfWeek}>{dayLabels[date.getDay()]}</Text>
              </View>
              <View style={styles.dayOfMonthWrapper}>
                <Text style={styles.dayOfMonth}>{formatDayOfMonth(date)}</Text>
              </View>
            </View>
          </View>
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
    marginVertical: 10,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  monthYearWrapper: {
    flexDirection: "row",
  },
  yearText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  dayContainer: {
    flex: 1,
    alignItems: "stretch",
    marginHorizontal: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    flexDirection: "column",
  },

  dayOfWeek: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  dayOfMonth: {
    fontSize: 14,
  },
  currentDay: {
    backgroundColor: "lightblue",
  },
  button: {
    padding: 10,
    marginHorizontal: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  dayWrapper: {
    alignItems: "center",
  },
  dayOfWeekWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
  },
  dayOfMonthWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WeekSelector;
