import React from "react";
import { View, Text } from "react-native";

const ReleasedShifts = ({ shifts }) => {
  return (
    <View style={{ marginTop: 4 }}>
      <Text style={{ fontWeight: "bold" }}>Released Shifts:</Text>
      {shifts.map((shift) => (
        <Text key={shift.id}>
          {shift.assignee} - Section: {shift.section}
        </Text>
      ))}
    </View>
  );
};

export default ReleasedShifts;