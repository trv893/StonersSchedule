import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FWeeklySchedule from "./components/FWeeklySchedule";

// Define formatDateToString function here or import it from a module

const App = () => {
  const [shiftData, setShiftData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const getShiftAssignments = async (startDate, endDate) => {
    const startDateString = formatDateToString(startDate);
    const endDateString = formatDateToString(endDate) ?? "";
    const url = `http://192.168.50.230:8888/Employee/GetShiftAssignments?startDate=${startDateString}&endDate=${endDateString}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getShiftAssignments(startDate, endDate);
        setShiftData(response);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [startDate, endDate]);

  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newStartDate.getDate() + 6);
    setEndDate(newEndDate);
  };

  return (
    <View style={styles.Container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FWeeklySchedule
          shiftData={shiftData}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    top:60
  },

});

export default App;
