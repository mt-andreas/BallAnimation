import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

interface BallProps {
  positionX: number;
  positionY: number;
}

const Ball: React.FC<BallProps> = ({ positionX, positionY }) => {
  const screenWidth = Dimensions.get('window').width; 
  const screenHeight = Dimensions.get('window').height;

  const translateX = useSharedValue(positionX);
  const translateY = useSharedValue(positionY);
  const [ballSize, setBallSize] = React.useState({state: false, size: screenWidth * 0.1});
  

  //Do some checks to prevent the ball from going off the screen
  if (translateX.value <= -screenHeight/2 + ballSize.size) {
    translateX.value  = -screenHeight/2 + ballSize.size;
  } else if (translateX.value >= screenHeight/2 - ballSize.size) {
    translateX.value = screenHeight/2 - ballSize.size;
  }

  if (translateY.value <= -screenWidth/2 + ballSize.size) {
    translateY.value = -screenWidth/2 + ballSize.size;;
  } else if (translateY.value >= screenWidth/2 - ballSize.size) {
    translateY.value = screenWidth/2 - ballSize.size;
  }


  React.useEffect(() => {
    translateX.value = withSpring(positionX);
    translateY.value = withSpring(positionY);
  }, [positionX, positionY, ballSize]);

  const handlePress = () => {
    ballSize.state ? setBallSize({state: false, size: screenWidth * 0.1}) :  setBallSize({state: true, size: screenWidth * 0.3});
  };

  return (
    <View style={styles.contents}>
        <Animated.View
            style={{
                position: 'absolute',
                width: ballSize.size,
                height: ballSize.size,
                borderRadius: ballSize.size / 2,
                backgroundColor: 'blue',
                transform: [{ translateX: translateY }, { translateY: translateX }],
                maxHeight: screenHeight - ballSize.size,
                maxWidth: screenWidth - ballSize.size,
            }}
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
