import useBoolean from "@/hooks/use-boolean";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

export default function Task({ id, title, description, completed }: Props) {
  const [contentFullHeight, setContentFullHeight] = useState<number | null>(
    null
  );
  const isExpanded = useBoolean(true);

  const expandingValue = useSharedValue(1);
  const arrowRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${expandingValue.value * 180}deg` }],
  }));

  const contentHeightStyle = useAnimatedStyle(() =>
    contentFullHeight !== null
      ? {
          height:
            28 + Math.max((contentFullHeight - 28) * expandingValue.value, 0), // 28 => 8 padding top + 20 line height
          opacity: 1,
        }
      : {}
  );

  useEffect(() => {
    if (contentFullHeight !== null) {
      isExpanded.setFalse();
      expandingValue.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentFullHeight]);

  const toggleExpanding = () => {
    isExpanded.setValue((prev) => {
      const newVal = !prev;

      expandingValue.value = withTiming(newVal ? 1 : 0, {
        duration: 300,
      });

      return newVal;
    });
  };

  const lineWidthStyle = useAnimatedStyle(() => ({
    height: 12 * (1 - expandingValue.value),
  }));

  return (
    <Surface
      elevation={1}
      style={{
        padding: 16,
        // opacity: completed ? 0.7 : 1,
        backgroundColor: completed ? "#bbb" : "white",
      }}
    >
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text
          variant="titleLarge"
          style={{
            height: "auto",
            color: completed ? "gray" : "black",
            textDecorationLine: completed ? "line-through" : "none",
          }}
        >
          {title}
        </Text>

        <Animated.View style={{}}>
          {/* <Animated.View style={arrowRotationStyle}> */}
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
            style={{
              margin: 0,
              width: 30,
              height: 30,
            }}
            iconColor={completed ? "gray" : "black"}
          />
        </Animated.View>
      </View>
      <Animated.View style={[contentHeightStyle]}>
        <Text
          onLayout={(e) =>
            setContentFullHeight(
              contentFullHeight === null
                ? e.nativeEvent.layout.height
                : contentFullHeight
            )
          }
          variant="bodyMedium"
          style={{
            paddingTop: 8,
            lineHeight: 20,
            color: completed ? "gray" : "black",
            textDecorationLine: completed ? "line-through" : "none",
          }}
        >
          {description}
        </Text>
      </Animated.View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderColor: "black",
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
