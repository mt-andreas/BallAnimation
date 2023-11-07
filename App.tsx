import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button } from "react-native";
//import BallComponent from './components/BallComponent';
//import BallAnimation from './components/BallAnimation';
import BallMotion from './components/BallMotion';
export default function App() {

  return (
   <BallMotion />
  );
}