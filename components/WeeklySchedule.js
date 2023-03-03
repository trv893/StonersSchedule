import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { ScheduleHeader } from "./ScheduleHeader";
import { DailySchedule } from "./DailySchedule";
import { WeekSelector } from "./WeekSelector";

export function WeeklySchedule() {
  // var xFakeData = [
  //   { userId: 4 },
  //   { name: "Jonathan Mckemannn" },
  //   { phoneNumber: "123-456-7890" },
  //   { weekDate: "Feb 1-7", key: "9999" },
  //   {
  //     shifts: {
  //       ShiftAssigmentId: 1,
  //       ShiftId: 1, //am or pm
  //       DayId: 1, //which day of the week- monday
  //       ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
  //       SectionId: 1, //which section they are scheduled for (same as actual section)
  //       dateAssigned: "Feb 1",
  //       dayOfWeek: "Monday",
  //       shiftTime: "AM",
  //     },
  //   },
  //   {
  //     releasedShifts: {
  //       ReleasedShiftId: 1,
  //       releaseUser: "Jonathan Mckemannn",
  //       releaseeEmail: "something@gmail.com",
  //       releaseePhoneNumber: "123-456-7890",
  //       releaseDate: "Feb 1",
  //       releaseSection: "13",
  //       releaseShift: "AM",
  //       pickUpRequests: [
  //         //ordered by time requested
  //         {
  //           userId: 1,
  //           name: "Jonathan Mckemannn",
  //           phoneNumber: "123-456-7890",
  //           email: "something@gmail.com",
  //           timeRequested: "2023-02-27:12:00:00",
  //         },
  //       ],
  //     },
  //   },
  // ];
  const [userData, setUserData] = useState({
    userId: 4,
    name: "Jonathan Mckemannn",
    phoneNumber: "123-456-7890",
    //weekDate: "Feb 1-7",
    key: "9999",
    currentAndFutureWeeklySchedules: [
      {
        weekDate: "Feb 1-7",
        Weekdays: [
          {
            Monday: [
              {
                ShiftAssigmentId: 1,
                ShiftId: 1, //am or pm
                DayId: 1, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 1",
                dayOfWeek: "Monday",
                shiftTime: "AM",
              },

              {
                ShiftAssigmentId: 2,
                ShiftId: 2, //am or pm
                DayId: 1, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 1",
                dayOfWeek: "Monday",
                shiftTime: "PM",
              },

              {
                releasedShifts: [
                  {
                    ReleasedShiftId: 1,
                    releaseUser: "Jonathan Mckemannn",
                    releaseeEmail: "something@gmail.com",
                    releaseePhoneNumber: "123-456-7890",
                    releaseDate: "Feb 1",
                    releaseSection: "13",
                    releaseShift: "AM",
                    pickUpRequests: [
                      //ordered by time requested
                      {
                        userId: 1,
                        name: "Jonathan Mckemannn",
                        phoneNumber: "123-456-7890",
                        email: "something@gmail.com",
                        timeRequested: "2023-02-27:12:00:00",
                      },
                    ],
                  },
                  {
                    ReleasedShiftId: 2,
                    releaseUser: "anna Mckemannn",
                    releaseeEmail: "something@gmail.com",
                    releaseePhoneNumber: "123-456-7890",
                    releaseDate: "Feb 1",
                    releaseSection: "13",
                    releaseShift: "AM",
                    pickUpRequests: [
                      //ordered by time requested
                      {
                        userId: 1,
                        name: "Jonathan Mckemannn",
                        phoneNumber: "123-456-7890",
                        email: "something@gmail.com",
                        timeRequested: "2023-02-27:12:00:00",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            Tuesday: [
              {
                ShiftAssigmentId: 3,
                ShiftId: 1, //am or pm
                DayId: 2, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 2",
                dayOfWeek: "Tuesday",
                shiftTime: "AM",
              },
            ],
          },
          {
            Wednesday: [
              {
                ShiftAssigmentId: 4,
                ShiftId: 1, //am or pm
                DayId: 3, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 3",
                dayOfWeek: "Wednesday",
                shiftTime: "AM",
              },
            ],
          },
          {
            Thursday: [
              {
                ShiftAssigmentId: 5,
                ShiftId: 2, //am or pm
                DayId: 4, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 4",
                dayOfWeek: "Thursday",
                shiftTime: "PM",
              },
            ],
          },
          {
            Friday: [
              {
                ShiftAssigmentId: 6,
                ShiftId: 2, //am or pm
                DayId: 5, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 5",
                dayOfWeek: "Friday",
                shiftTime: "PM",
              },
            ],
          },
          { Saturday: [] },
          {
            Sunday: [
              {
                ShiftAssigmentId: 7,
                ShiftId: 1, //am or pm
                DayId: 7, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 7",
                dayOfWeek: "Sunday",
                shiftTime: "AM",
              },
              {
                ShiftAssigmentId: 8,
                ShiftId: 2, //am or pm
                DayId: 7, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 13, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 7",
                dayOfWeek: "Sunday",
                shiftTime: "PM",
              },
            ],
          },
        ],
      },
      {
        weekDate: "Feb 8-15",
        Weekdays: [
          {
            Monday: [
              {
                ShiftAssigmentId: 1,
                ShiftId: 1, //am or pm
                DayId: 1, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 1",
                dayOfWeek: "Monday",
                shiftTime: "AM",
              },

              {
                ShiftAssigmentId: 2,
                ShiftId: 2, //am or pm
                DayId: 1, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 1",
                dayOfWeek: "Monday",
                shiftTime: "PM",
              },

              {
                releasedShifts: [
                  {
                    ReleasedShiftId: 1,
                    releaseUser: "Jonathan Mckemannn",
                    releaseeEmail: "something@gmail.com",
                    releaseePhoneNumber: "123-456-7890",
                    releaseDate: "Feb 1",
                    releaseSection: "13",
                    releaseShift: "AM",
                    pickUpRequests: [
                      //ordered by time requested
                      {
                        userId: 1,
                        name: "Jonathan Mckemannn",
                        phoneNumber: "123-456-7890",
                        email: "something@gmail.com",
                        timeRequested: "2023-02-27:12:00:00",
                      },
                    ],
                  },
                  {
                    ReleasedShiftId: 2,
                    releaseUser: "anna Mckemannn",
                    releaseeEmail: "something@gmail.com",
                    releaseePhoneNumber: "123-456-7890",
                    releaseDate: "Feb 1",
                    releaseSection: "13",
                    releaseShift: "AM",
                    pickUpRequests: [
                      //ordered by time requested
                      {
                        userId: 1,
                        name: "Jonathan Mckemannn",
                        phoneNumber: "123-456-7890",
                        email: "something@gmail.com",
                        timeRequested: "2023-02-27:12:00:00",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            Tuesday: [
              {
                ShiftAssigmentId: 3,
                ShiftId: 1, //am or pm
                DayId: 2, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 2",
                dayOfWeek: "Tuesday",
                shiftTime: "AM",
              },
            ],
          },
          {
            Wednesday: [
              {
                ShiftAssigmentId: 4,
                ShiftId: 1, //am or pm
                DayId: 3, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 3",
                dayOfWeek: "Wednesday",
                shiftTime: "AM",
              },
            ],
          },
          {
            Thursday: [
              {
                ShiftAssigmentId: 5,
                ShiftId: 2, //am or pm
                DayId: 4, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 4",
                dayOfWeek: "Thursday",
                shiftTime: "PM",
              },
            ],
          },
          {
            Friday: [
              {
                ShiftAssigmentId: 6,
                ShiftId: 2, //am or pm
                DayId: 5, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 5",
                dayOfWeek: "Friday",
                shiftTime: "PM",
              },
            ],
          },
          { Saturday: [] },
          {
            Sunday: [
              {
                ShiftAssigmentId: 7,
                ShiftId: 1, //am or pm
                DayId: 7, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 1, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 7",
                dayOfWeek: "Sunday",
                shiftTime: "AM",
              },
              {
                ShiftAssigmentId: 8,
                ShiftId: 2, //am or pm
                DayId: 7, //which day of the week- monday
                ///TODO: section id is an int and gets autogenerated but there are string section values. needs to be addressed
                SectionId: 13, //which section they are scheduled for (same as actual section)
                dateAssigned: "Feb 7",
                dayOfWeek: "Sunday",
                shiftTime: "PM",
              },
            ],
          },
        ],
      },
    ],
  });
  return (
    <View style={styles.container}>
    <WeekSelector currentAndFutureWeeklySchedules={currentAndFutureWeeklySchedules} />
      {/*<ScheduleHeader weekDate = {xFakeData.weekDate}/>*/}
      <View style={styles.content}>
        {/*to form*/}
        <DailySchedule currentAndFutureWeeklySchedules={userData.currentAndFutureWeeklySchedules} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    //alignItems: 'center',
    justifyContent: "center",
  },
  // shiftList: {
  //   padding: 10,
  //   marginTop: 16,
  //   borderColor: "black",
  //   borderWidth: 1,
  //   borderStyle: "dashed",
  //   borderRadius: 10,
  // },
});
