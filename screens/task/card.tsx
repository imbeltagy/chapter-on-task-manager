import { useEffect } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import { Surface, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTaskContext } from "./context";
import TaskExpandIcon from "./expand-icon";

export default function TaskCard() {
  const {
    title,
    description,
    slidingGesture,
    completed,
    offsetX,
    setTextInitialHeight,
    setTaskWidth,
    textInitialHeight,
    isSliding,
    expanding,
    expanded,
  } = useTaskContext();

  // Collapse Text after getting initial height
  useEffect(() => {
    if (textInitialHeight !== null) {
      expanded.setFalse();
      expanding.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInitialHeight]);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { scale: withSpring(isSliding.value ? 0.95 : 1) },
    ],
  }));

  const contentHeightStyle = useAnimatedStyle(() =>
    textInitialHeight !== null
      ? {
          height: 28 + Math.max((textInitialHeight - 28) * expanding.value, 0), // 28 => 8 padding top + 20 line height
          opacity: 1,
        }
      : {}
  );

  return (
    <Animated.View style={[{ position: "relative" }, slideStyle]}>
      <GestureDetector gesture={slidingGesture}>
        <Surface
          elevation={0}
          style={{
            padding: 16,
            backgroundColor: completed.value ? "#ddd" : "#fff",
          }}
          onTouchEnd={() => {
            if (Math.abs(offsetX.value) < 5) {
              completed.toggle();
            }
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              height: "auto",
              color: completed.value ? "gray" : "black",
              textDecorationLine: completed.value ? "line-through" : "none",
              paddingInlineEnd: 30, // for the icon button
            }}
          >
            {title}
          </Text>
          <Animated.View style={contentHeightStyle}>
            <Text
              onLayout={(e) => {
                setTextInitialHeight(
                  textInitialHeight === null
                    ? e.nativeEvent.layout.height
                    : textInitialHeight
                );
                setTaskWidth(e.nativeEvent.layout.width);
              }}
              variant="bodyMedium"
              style={{
                paddingTop: 8,
                lineHeight: 20,
                color: completed.value ? "gray" : "black",
                textDecorationLine: completed.value ? "line-through" : "none",
              }}
            >
              {description}
            </Text>
          </Animated.View>
        </Surface>
      </GestureDetector>

      <TaskExpandIcon />
    </Animated.View>
  );
}
