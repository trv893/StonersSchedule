import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export function WeeklySchedule() {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(5);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  //const [mergedData, setMergedData] = useState([]);
  const startDate = "3/6/2023";
  const endDate = "3/15/2023";

  var mergedData = [];

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
    setUniqueDates(uniqueDatesArray);
  }, []);

  useEffect(() => {
    const getUsersWithId = () => {
      // Use Array.filter to return only objects with matching userId
      const filteredData =
        data && data.filter((item) => item.userId === userId);

      setFilteredData(filteredData || []);
      //console.log(filteredData);
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

  function mergeByDate(data) {
    const merged = [];
    const dates = {};

    data.forEach((item) => {
      const { dateAssigned, sectionId, shiftName } = item;

      if (dates[dateAssigned]) {
        dates[dateAssigned].sectionIds.push(sectionId);
        dates[dateAssigned].shiftNames.push(shiftName);
      } else {
        dates[dateAssigned] = {
          dateAssigned,
          sectionIds: [sectionId],
          shiftNames: [shiftName],
        };
      }
    });

    for (const date in dates) {
      merged.push(dates[date]);
    }

    mergedData = merged;
    console.log(mergedData);
  }

  mergeByDate(filteredData);

  function combineSectionAndShift(data) {
    for (let i = 0; i < data.length; i++) {
      const sectionIds = data[i]["sectionIds"];
      const shiftNames = data[i]["shiftNames"];
      if (sectionIds && shiftNames) {
        const combined = sectionIds.map(
          (id, index) => `${id} ${shiftNames[index]}`
        );
        data[i]["sectionIds"] = combined;
        delete data[i]["shiftNames"];
      }
    }
    return data;
  }

  const result = combineSectionAndShift(mergedData);
  console.log(result[1]);

  // Define a function to format the date string
  const formatDate = (dateString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const year = date.getFullYear().toString().substr(-2);
    return `${dayOfWeek}, ${month}/${dayOfMonth}/${year}`;
  };

  // Define a function to render each item in the FlatList
  const renderItem = ({ item }) => {
    const formattedDate = formatDate(item.dateAssigned);
    const sections = item.sectionIds.map((section) => {
      const sectionNumber = section.match(/\d+/)[0];
      const amPm = section.includes("AM") ? "AM" : "PM";
      return `Section: ${sectionNumber} ${amPm}`;
    });
    return (
      <>
        <Text>{formattedDate}</Text>
        {sections.map((section) => (
          <Text key={section}>{section}</Text>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={result}
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
