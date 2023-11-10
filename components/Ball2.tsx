import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedSensor, useAnimatedStyle, withSpring, SensorType } from 'react-native-reanimated';

const Ball2: React.FC = () => {
  const screenWidth = Dimensions.get('window').width; 
  //const screenHeight = Dimensions.get('window').height;
  const [ballSize, setBallSize] = React.useState({state: false, size: screenWidth * 0.1});


  const gravity = useAnimatedSensor(SensorType.GRAVITY);


  const animatedStyle = useAnimatedStyle(() => {
    let tx = gravity.sensor.value.x;
    let ty = gravity.sensor.value.y;
    
    return {
      transform: [
        { translateX: withSpring( tx * 30) },
        { translateY: withSpring(-ty * 30) },
      ],
    };
  });
  const handlePress = () => {
    ballSize.state ? setBallSize({state: false, size: screenWidth * 0.1}) :  setBallSize({state: true, size: screenWidth * 0.3});
  };

  return (
    <View style={styles.contents}>
        <Animated.View
            style={[{
                    position: 'absolute',
                    width: ballSize.size,
                    height: ballSize.size,
                    borderRadius: ballSize.size / 2,
                    backgroundColor: 'blue'
                },
                animatedStyle]
            }
        />
        <View style={styles.button}>
            <Button onPress={handlePress} title="Toggle Ball Size" />
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
    contents: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    button: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }
  });

export default Ball2;
