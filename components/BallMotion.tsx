import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useSharedValue } from 'react-native-reanimated';

import Ball from './Ball';
//import Ball2 from './Ball2';
Gyroscope.setUpdateInterval(16);


const BallMotion = () => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  React.useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
      positionX.value += data.x * 10; // Adjust the multiplier for sensitivity
      positionY.value += data.y * 10; // Adjust the multiplier for sensitivity

    });

    return () => subscription.remove();
  }, [positionX, positionY]);

  return (
    <View style={styles.container}>
      <Ball positionX={positionY} positionY={positionX} />
      {/*<Ball2 />*/}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BallMotion;