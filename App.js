import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ScheduleHeader } from './components/ScheduleHeader';
import { WeeklySchedule } from './components/WeeklySchedule';

export default function App() {
  return (
    <View style={styles.container}>
      <WeeklySchedule />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 80,
    //alignItems: 'center',
    //justifyContent: 'center',
    top:0
  },
});
