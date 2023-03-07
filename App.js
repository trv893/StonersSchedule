import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import { ScheduleHeader } from './components/ScheduleHeader';
import { WeeklySchedule } from './components/WeeklySchedule';
//import DateTable from './components/DateTable';
import FWeeklySchedule from './components/FWeeklySchedule';
import WeekSelector from './components/WeekSelector';




export default function App() {
  return (
    <View style={styles.container}>
      <FWeeklySchedule />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,

    //alignItems: 'center',
    //justifyContent: 'center',
    //top:0
  },
});
