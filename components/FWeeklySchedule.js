import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export function FWeeklySchedule() {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(5);

  const [filteredData, setFilteredData] = useState([]);

  const startDate = "3/6/2023";
  const endDate = "3/15/2023";

  async function getShiftAssignments(startDate, endDate) {
    const url = `http://192.168.50.230:8888/Employee/GetShiftAssignments?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getShiftAssignments(startDate, endDate);
      setData(result);
    }
    fetchData();
    const uniqueDatesArray = Array.from(
      new Set(filteredData.map((item) => item.dateAssigned))
    );
    //setUniqueDates(uniqueDatesArray);
  }, []);

  useEffect(() => {
    const getUsersWithId = () => {
      // Use Array.filter to return only objects with matching userId
      const filteredData =
        data && data.filter((item) => item.userId === userId);

      setFilteredData(filteredData || []);
      console.log(filteredData);
    };

    getUsersWithId();
  }, [data, userId]);

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const { dateAssigned } = item;
    const amShift = filteredData.find(
      (i) => i.dateAssigned === dateAssigned && i.shiftName === "AM"
    );
    const pmShift = filteredData.find(
      (i) => i.dateAssigned === dateAssigned && i.shiftName === "PM"
    );

    return (
      <View style={styles.item}>
        <Text>{dateAssigned}</Text>
        <Text>
          {amShift ? `Section: ${amShift.section}` : "Not Working"}
          {pmShift ? ` AM Section ${pmShift.section} PM` : ""}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* <Text>Filtered Data:</Text>
      <Text>{JSON.stringify(filteredData, null, 2)}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
  },
});
