import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useSharedValue } from 'react-native-reanimated';

import Ball from './Ball';
//import Ball2 from './Ball2';

const BallMotion = () => {

  const [{x,y,z}, setGyroscopeData] = React.useState({ x: 0, y: 0, z: 0 });
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  Gyroscope.setUpdateInterval(16);

  React.useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
      setGyroscopeData(data);
      positionX.value += data.x * 10; // Adjust the multiplier for sensitivity
      positionY.value += data.y * 10; // Adjust the multiplier for sensitivity

    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Ball positionX={positionX.value} positionY={positionY.value} />
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