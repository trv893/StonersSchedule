import React, { useState, useEffect } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import WeekSelector from "./WeekSelector";

const FWeeklySchedule = () => {
  const [data, setData] = useState(null);
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
    console.log("getShiftAssignments " + data);
    setData(data);
  }
  // Fetch data from the server when the component mounts or the start date changes
  useEffect(() => {
    async function fetchData() {
      await getShiftAssignments(startDate, endDate);
    }
    fetchData();
  }, []);

  // Create an array of dates for the current week to be rendered in the flatList in this component
  const [weekDates, setWeekDates] = useState(() => {
    const dates = [];
    const day = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
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
    return
  };

  // Render function for the FlatList items
  const renderItem = ({ item }) => {
    const date = item.getDate();
    const weekday = item
      .toLocaleString("default", { weekday: "short" })
      .slice(0, 3);
    const suffix =
      date > 3 && date < 21
        ? "th"
        : ["st", "nd", "rd"][(date % 10) - 1] || "th";
    const formattedDate = `${weekday} ${date}${suffix}`;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{formattedDate}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 24,
    padding: 10,
    textAlign: "center",
  },
});

export default FWeeklySchedule;
