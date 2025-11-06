import { useTaskContext } from "@/context/task/index";
import { GestureDetector } from "react-native-gesture-handler";
import { Surface, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
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
    textInitialHeight,
    isSliding,
    expanding,
    textLineHeight,
    setTextCollapseHeightDiff,
    titleHeight,
  } = useTaskContext();

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { scale: withSpring(isSliding.value ? 0.95 : 1) },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    height: withTiming(
      expanding.value === 1 || textInitialHeight <= textLineHeight
        ? textInitialHeight
        : textLineHeight,
      {
        duration: 300,
      }
    ), // 28 => 8 padding top + 20 line height
  }));

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
            onLayout={(e) => {
              titleHeight.value = e.nativeEvent.layout.height + 8 + 16 * 2;
            }}
          >
            {title}
          </Text>
          <Animated.View
            style={[
              { position: "relative", marginTop: 8, overflow: "hidden" },
              textStyle,
            ]}
          >
            <Text
              onLayout={(e) => {
                setTextInitialHeight(e.nativeEvent.layout.height);
                setTextCollapseHeightDiff(
                  textInitialHeight < textLineHeight
                    ? 0
                    : textInitialHeight - textLineHeight
                );
              }}
              variant="bodyMedium"
              style={{
                position: "absolute",
                lineHeight: textLineHeight,
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
