import { useTaskContext } from "@/screens/task/context";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function TaskExpandIcon() {
  const { textInitialHeight, expanding, textLineHeight } = useTaskContext();

  const hidden = textInitialHeight <= textLineHeight;

  const arrowRotationStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: withTiming(`${expanding.value * 180}deg`, { duration: 300 }) },
    ],
  }));

  const lineWidthStyle = useAnimatedStyle(() => ({
    height: withTiming(12 * (1 - expanding.value), { duration: 300 }),
  }));

  return (
    <IconButton
      icon={() => (
        <View style={styles.container}>
          {/* Horizontal line */}
          <Animated.View
            style={[styles.line, styles.horizontal, arrowRotationStyle]}
          />
          {/* Vertical line */}
          <Animated.View
            style={[
              styles.line,
              styles.vertical,
              lineWidthStyle,
              arrowRotationStyle,
            ]}
          />
        </View>
      )}
      size={25}
      onPress={() => {
        expanding.value = expanding.value === 1 ? 0 : 1;
      }}
      style={[
        {
          margin: 0,
          width: 30,
          height: 30,
          position: "absolute",
          top: 16,
          right: 16,
        },
        hidden && { display: "none" },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderColor: "transparent",
    borderWidth: 2,
    borderRadius: 25 / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  line: {
    backgroundColor: "black",
    borderRadius: 4,
    position: "absolute",
  },
  horizontal: {
    width: 12,
    height: 2,
  },
  vertical: {
    width: 2,
    height: 12,
  },
});
