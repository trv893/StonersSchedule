import React from 'react';
import { View } from 'react-native';

const Circle = ({ size, color }) => {
  const circleSize = size || 10; // default size is 10
  const circleColor = color || 'green'; // default color is green

  return (
    <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize/2, backgroundColor: circleColor }} />
  );
};

export const GreenCircle = ({ size }) => {
  return <Circle size={size} color="green" />;
};

export const RedCircle = ({ size }) => {
  return <Circle size={size} color="red" />;
};
