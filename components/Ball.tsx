import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height;


interface BallProps {
  positionX: SharedValue<number>;
  positionY: SharedValue<number>;
}

const Ball: React.FC<BallProps> = ({ positionX, positionY }) => {
  const [ballSize, setBallSize] = React.useState({state: false, size: screenWidth * 0.1});
  
  const astyle = useAnimatedStyle(() => {
    
    //Do some checks to prevent the ball from going off the screen
    if (positionX.value <= -screenWidth/2 + ballSize.size) {
      positionX.value  = -screenWidth/2 + ballSize.size;
    } else if (positionX.value >= screenWidth/2 - ballSize.size) {
      positionX.value = screenWidth/2 - ballSize.size;
    }

    if (positionY.value <= -screenHeight/2 + ballSize.size) {
      positionY.value = -screenWidth/2 + ballSize.size;;
    } else if (positionY.value >= screenHeight/2 - ballSize.size) {
      positionY.value = screenHeight/2 - ballSize.size;
    }
    
    return {transform: [{ translateX: withSpring(positionX.value) }, { translateY: withSpring(positionY.value) }]}
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
                backgroundColor: 'blue',
                //transform: [{ translateX: translateY }, { translateY: translateX }],
                maxHeight: screenHeight - ballSize.size,
                maxWidth: screenWidth - ballSize.size},
                astyle
            ]}
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

export default Ball;
