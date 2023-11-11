import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width; 
  const screenHeight = Dimensions.get('window').height;


// Define the maze with 0s and 1s
const maze = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1],
];

const Cell = ({ type  }) => (
  <View style={[styles.cell, { backgroundColor: type === 1 ? 'black' : 'white' }]} />
);

const Maze: React.FC = () => (
  <View style={styles.maze}>
    {maze.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, columnIndex) => (
          <Cell key={columnIndex} type={cell} />
        ))}
      </View>
    ))}
  </View>
);


const styles = StyleSheet.create({
  maze: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'black',
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Maze;
