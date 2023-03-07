import React, { useState } from 'react';
import { Text, FlatList, View, StyleSheet  } from 'react-native';
import WeekSelector from './WeekSelector';

const FWeeklySchedule = () => {
  const [startDate, setStartDate] = useState(new Date());

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
      />
      <FlatList
      data={weekDates}
      renderItem={renderItem}
      keyExtractor={item => item.toISOString()}
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