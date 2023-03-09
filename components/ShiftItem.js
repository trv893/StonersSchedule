import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GreenCircle } from "./Circle";
import ReleasedShifts from "./ReleasedShifts";

const ShiftItem = ({
  item,
  userId,
  findShiftForDayAndUser,
  findAllReleasedShiftsForDay,
}) => {
  const date = item.getDate();
  const weekday = item.toLocaleString("default", { weekday: "short" }).slice(0, 3);
  const suffix = date > 3 && date < 21 ? "th" : ["st", "nd", "rd"][(date % 10) - 1] || "th";
  const formattedDay = `${weekday}`;
  const formattedDate = `${date}${suffix}`;

  // Find the matching shifts for the current date and user ID
  const matchingShiftAM = findShiftForDayAndUser(item, userId, "AM");
  const matchingShiftPM = findShiftForDayAndUser(item, userId, "PM");
  const releasedShiftsAM = findAllReleasedShiftsForDay(item, "AM");
  const releasedShiftsPM = findAllReleasedShiftsForDay(item, "PM");

  return (
    <View style={styles.itemContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateDayText}>{formattedDay}</Text>
        <Text style={styles.dateDateText}>{formattedDate}</Text>
      </View>
      <View style={styles.shiftContainer}>
        <View style={styles.shiftColumn}>
          <View style={styles.shiftAM}>
            <View style={styles.shiftLabel}>
              <Text style={styles.shiftText}>AM</Text>
              {matchingShiftAM && (
                <View style={styles.dot}>
                  <GreenCircle />
                </View>
              )}
            </View>
            <Text style={styles.shiftText}>{matchingShiftAM || "Not Scheduled"}</Text>
            {releasedShiftsAM.length > 0 && (
              <ReleasedShifts shifts={releasedShiftsAM} />
            )}
          </View>
        </View>
        <View style={styles.shiftColumn}>
          <View style={styles.shiftPM}>
            <View style={styles.shiftLabel}>
              <Text style={styles.shiftText}>PM</Text>
              {matchingShiftPM && (
                <View style={styles.dot}>
                  <GreenCircle />
                </View>
              )}
            </View>
            <Text style={styles.shiftText}>{matchingShiftPM || "Not Scheduled"}</Text>
            {releasedShiftsPM.length > 0 && (
              <ReleasedShifts shifts={releasedShiftsPM} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShiftItem;
