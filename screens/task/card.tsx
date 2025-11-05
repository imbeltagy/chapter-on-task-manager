import { useTaskContext } from "@/context/task/index";
import { useEffect } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import { Surface, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import TaskExpandIcon from "./expand-icon";

export default function TaskCard() {
  const {
    title,
    description,
    slidingGesture,
    completed,
    offsetX,
    setTextInitialHeight,
    setTextCollapseHeightDiff,
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
      setTextCollapseHeightDiff(
        textInitialHeight < 18 ? 0 : textInitialHeight - 28
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInitialHeight]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { scale: withSpring(isSliding.value ? 0.95 : 1) },
    ],
  }));

  const textStyle = useAnimatedStyle(() =>
    textInitialHeight !== null
      ? {
          height: 28 + Math.max((textInitialHeight - 28) * expanding.value, 0), // 28 => 8 padding top + 20 line height
        }
      : {}
  );

  return (
    <Animated.View
      style={[
        {
          position: "relative",
          borderBottomWidth: 1,
          borderColor: "#eee",
        },
        cardStyle,
      ]}
    >
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
          <Animated.View style={textStyle}>
            <Text
              onLayout={(e) => {
                setTextInitialHeight(
                  textInitialHeight === null
                    ? e.nativeEvent.layout.height
                    : textInitialHeight
                );
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
