import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { useSharedValue } from 'react-native-reanimated';
import { Dimensions } from 'react-native';

import Ball from './Ball';
import BallMaze from './BallMaze';

//import Ball2 from './Ball2';

// Define the maze with 0s and 1s
const maze = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1],
];

const BallMotion = () => {
  const screenWidth = Dimensions.get('window').width; 
  const screenHeight = Dimensions.get('window').height;

  const [{x,y,z}, setGyroscopeData] = React.useState({ x: 0, y: 0, z: 0 });
  const positionX = useSharedValue(-screenHeight);
  const positionY = useSharedValue(0);
  Gyroscope.setUpdateInterval(16);

  React.useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
      setGyroscopeData(data);
      positionX.value += data.x * 10; // Adjust the multiplier for sensitivity
      positionY.value += data.y * 10; // Adjust the multiplier for sensitivity

       // Check for collisions with maze walls
       const mazeRow = Math.floor(positionY.value / (screenHeight / maze.length));
       const mazeColumn = Math.floor(positionX.value / (screenWidth / maze[0].length));
 
       if (mazeRow >= 0 && mazeRow < maze.length && mazeColumn >= 0 && mazeColumn < maze[0].length) {
         if (maze[mazeRow][mazeColumn] === 1) {
           // Collision with a maze wall, reset position
           //positionX.value = screenWidth / 2;
           //positionY.value = 10;
         }
       }

    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Ball positionX={positionX.value} positionY={positionY.value} screenWidth={screenWidth} screenHeight={screenHeight}/>
      <BallMaze maze={maze}/>
      {/*<Ball2 />*/}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BallMotion;