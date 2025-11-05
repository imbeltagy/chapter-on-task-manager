import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTaskContext } from "./context";

export default function TaskExpandIcon() {
  const { textInitialHeight, expanding, toggleExpanding } = useTaskContext();

  const hidden = textInitialHeight !== null && textInitialHeight <= 28;

  const arrowRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${expanding.value * 180}deg` }],
  }));

  const lineWidthStyle = useAnimatedStyle(() => ({
    height: 12 * (1 - expanding.value),
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
      onPress={toggleExpanding}
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
