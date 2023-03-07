import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, StyleSheet  } from 'react-native';
import WeekSelector from './WeekSelector';
//import getShiftAssignments from '../dbservice/shiftService';

const FWeeklySchedule = () => {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + 6);
    return day;
  });

  async function getShiftAssignments(startDate, endDate) {
    const url = `http://192.168.50.230:8888/Employee/GetShiftAssignments?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()??""}`;
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
    console.log(data)
  }, []);
  

  

  const [weekDates, setWeekDates] = useState(() => {
    const dates = [];
    const day = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    return dates;
  });

  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
    const dates = [];
    const day = new Date(newStartDate);
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    setWeekDates(dates);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newStartDate.getDate() + 6);
    setEndDate(newEndDate);
    console.log(endDate)
  };
  const handleDateChange = (date) => {
    setEndDate(date);
  };

  

  const renderItem = ({ item }) => {
    const date = item.getDate();
    const weekday = item.toLocaleString('default', { weekday: 'short' }).slice(0, 3);
    const suffix = date > 3 && date < 21 ? 'th' : ['st', 'nd', 'rd'][date % 10 - 1] || 'th';
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
        onDateChange={handleDateChange}
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
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
  },
});


export default FWeeklySchedule;