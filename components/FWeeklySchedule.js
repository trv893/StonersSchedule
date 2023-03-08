import React, { useState, useEffect } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import WeekSelector from "./WeekSelector";

const FWeeklySchedule = ({ shiftData }) => {
  const [data, setData] = useState(shiftData);
  const [userId, setUserId] = useState(5);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    now.setDate(now.getDate() + 6);
    return now;
  });

  function formatDateToString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  // Function to fetch shift assignments from the server
  async function getShiftAssignments(startDate, endDate) {
    const startDateString = formatDateToString(startDate);
    const endDateString = formatDateToString(endDate) ?? "";
    const url = `http://192.168.50.230:8888/Employee/GetShiftAssignments?startDate=${startDateString}&endDate=${endDateString}`;
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  }

  // Create an array of dates for the current week to be rendered in the flatList in this component
  const [weekDates, setWeekDates] = useState(() => {
    const dates = [];
    const day = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    //console.log("weekDates " + dates);
    return dates;
  });

  // Handler function for the start date change event
  // This function is passed to the WeekSelector component
  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
    // Update the array of week dates
    const dates = [];
    const day = new Date(newStartDate);
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    //sets the weekDates to be rendered in the flatList in this component
    setWeekDates(dates);
    // Update the end date
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newStartDate.getDate() + 6);
    setEndDate(newEndDate);
    // Fetch the new data from the server when a new week is selected from the WeekWSelector component
    getShiftAssignments(newStartDate, newEndDate);
  };

  // Handler function for the date change event
  // This function is passed to the WeekSelector component
  // TODO: Implement this function so that when the user selects a date from the WeeklySelector component, that date is highlighted in the dayContainer and makes the corresponding flatlist date elevated.
  const handleUserDateHighlight = (date) => {
    return;
  };

  function findShiftForDayAndUser(date, userId, shiftName) {
    const dateString = date.toISOString().split("T")[0];
    const matchingShift = data.find(
      (shift) =>
        shift.dateAssigned.split("T")[0] === dateString &&
        shift.userId === userId &&
        shift.shiftName === shiftName
    );
    return matchingShift
      ? "Section: " + matchingShift.section
      : "Not Scheduled";
  }

  function findAllReleasedShiftsForDay(date, shiftName) {
    const dateString = date.toISOString().split("T")[0];
    return data.filter(
      (shift) =>
        shift.dateAssigned.split("T")[0] === dateString &&
        shift.shiftName === shiftName &&
        shift.releasedByUser === true
    );
  }

  // Render function for the FlatList items
  const renderItem = ({ item }) => {
    const date = item.getDate();
    const weekday = item.toLocaleString("default", { weekday: "short" }).slice(0, 3);
    const suffix = date > 3 && date < 21 ? "th" : ["st", "nd", "rd"][(date % 10) - 1] || "th";
    const formattedDate = `${weekday} ${date}${suffix}`;
  
    // Find the matching shifts for the current date and user ID
    const matchingShiftAM = findShiftForDayAndUser(item, userId, "AM");
    const matchingShiftPM = findShiftForDayAndUser(item, userId, "PM");
    const releasedShiftsAM = findAllReleasedShiftsForDay(item, "AM");
    const releasedShiftsPM = findAllReleasedShiftsForDay(item, "PM");
  
    return (
      <View style={styles.itemContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        <View style={styles.shiftContainer}>
          <View style={styles.shiftColumn}>
            <View style={styles.shiftAM}>
              <Text style={styles.shiftText}>AM</Text>
              <Text style={styles.shiftText}>{matchingShiftAM || "Not Scheduled"}</Text>
              {releasedShiftsAM.length > 0 && (
                <Text style={styles.releasedShiftsText}>
                  Released Shifts: {releasedShiftsAM.join(", ")}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.shiftColumn}>
            <View style={styles.shiftPM}>
              <Text style={styles.shiftText}>PM</Text>
              <Text style={styles.shiftText}>{matchingShiftPM || "Not Scheduled"}</Text>
              {releasedShiftsPM.length > 0 && (
                <Text style={styles.releasedShiftsText}>
                  Released Shifts: {releasedShiftsPM.join(", ")}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <>
      <WeekSelector
        onStartDateChange={handleStartDateChange}
        startDate={startDate}
        endDate={endDate}
        onUserDaySelect={handleUserDateHighlight}
      />
      <FlatList
        data={weekDates}
        renderItem={renderItem}
        keyExtractor={(item) => item.toISOString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dateContainer: {
    width: 80,
    marginRight: 8,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shiftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shiftColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  shiftAM: {
    backgroundColor: "#ddf1fa",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  shiftPM: {
    backgroundColor: "#fce8e6",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  shiftText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  releasedShiftsText: {
    fontSize: 16,
    marginTop: 4,
  },
});


export default FWeeklySchedule;
