import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

function DateItem({ date }) {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const formattedDate = `${dayOfWeek}, ${month}/${day}/${dateObj.getFullYear()}`;

  return (
    <View style={styles.dateItem}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Section:</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Section:</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Section:</Text>
      </View>
    </View>
  );
}

export function FWeeklySchedule() {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(5);

  const [filteredData, setFilteredData] = useState([]);

  const startDate = "3/6/2023";
  const endDate = "3/15/2023";

  const dateArray = getDates(startDate, endDate);

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
        data={dateArray}
        renderItem={({ item }) => <DateItem date={item} />}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
  },
  sectionContainer: {
    width: 80,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
