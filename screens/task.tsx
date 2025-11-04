import useBoolean from "@/hooks/use-boolean";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { IconButton, Surface, Text } from "react-native-paper";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, G, Path } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  id: string;
  title: string;
  description?: string;
}

export default function Task({ id, title, description }: Props) {
  const completed = useBoolean();
  const [contentFullHeight, setContentFullHeight] = useState<number | null>(
    null
  );
  const [taskWidth, setTaskWidth] = useState(0);
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

  const isSliding = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const slideStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { scale: withSpring(isSliding.value ? 0.95 : 1) },
    ],
    // opacity: withSpring(isSliding.value ? 0.5 : 1),
  }));

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isSliding.value = true;
    })
    .onUpdate((event) => {
      // console.log("update", event.translationX);
      offsetX.value = event.translationX;
    })
    .onEnd(() => {
      offsetX.value = withTiming(0, {
        duration: 300,
      });
    })
    .onFinalize(() => {
      isSliding.value = false;
    });

  const radius = 20;
  const strokeWidth = 2;
  const circumference = 2 * Math.PI * radius;

  const iconStyle = useAnimatedProps(() => ({
    transform: [
      {
        scale: interpolate(
          (offsetX.value / (taskWidth || 1)) * 100,
          [0, 20],
          [0, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
    stroke: interpolateColor(
      (offsetX.value / (taskWidth || 1)) * 100,
      [0, 10, 20, 50, 60],
      [
        "rgb(255,255,255)",
        "rgb(255,255,255)",
        "rgb(255,0,0)",
        "rgb(255,0,0)",
        "rgb(255,255,255)",
      ]
    ),
  }));

  const circleStrokeStyle = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(
      (offsetX.value / (taskWidth || 1)) * 100,
      [20, 60],
      [circumference, 0],
      Extrapolation.CLAMP
    ),
  }));

  const circleBgStyle = useAnimatedProps(() => ({
    opacity: interpolate(
      (offsetX.value / (taskWidth || 1)) * 100,
      [50, 60],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const checIconStyle = useAnimatedProps(() => ({
    transform: [
      {
        scale: interpolate(
          (offsetX.value / (taskWidth || 1)) * 100,
          [0, -20],
          [0, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
    stroke: interpolateColor(
      ((offsetX.value * -1) / (taskWidth || 1)) * 100,
      [0, 10, 20, 50, 60],
      [
        "rgb(255,255,255)",
        "rgb(255,255,255)",
        "rgb(0,255,0)",
        "rgb(0,255,0)",
        "rgb(255,255,255)",
      ]
    ),
  }));

  const checkCircleStrokeStyle = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(
      (offsetX.value / (taskWidth || 1)) * 100,
      [-20, -60],
      [circumference, 0],
      Extrapolation.CLAMP
    ),
  }));

  const checkCircleBgStyle = useAnimatedProps(() => ({
    opacity: interpolate(
      (offsetX.value / (taskWidth || 1)) * 100,
      [-50, -60],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View>
      <View
        style={{
          position: "absolute",
          insetBlock: 0,
          insetInlineStart: 0,
          width: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          width={(radius + strokeWidth) * 2}
          height={(radius + strokeWidth) * 2}
          style={{
            position: "absolute",
            insetInlineStart: 25 - radius - strokeWidth,
            overflow: "visible",
          }}
        >
          {/* Background circle */}
          <AnimatedCircle
            cx={`${radius + strokeWidth}`}
            cy={`${radius + strokeWidth}`}
            r={radius}
            fill="rgb(255,0,0)"
            animatedProps={circleBgStyle}
          />

          {/* Animated progress circle */}
          <AnimatedCircle
            cx={`${radius + strokeWidth}`}
            cy={`${radius + strokeWidth}`}
            r={radius}
            stroke="rgb(255,0,0)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={circleStrokeStyle}
            strokeLinecap="round"
            fill="transparent"
            rotation="-90"
            origin={`${radius + strokeWidth},${radius + strokeWidth}`}
          />
        </Svg>

        <AnimatedSvg
          width={24}
          height={24}
          viewBox="-2.5 0 61 61"
          fill="none"
          stroke="none"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={[{ position: "relative" }]}
        >
          <AnimatedG
            transform={`translate(${28},${28}) scale(2.5) translate(${-28},${-28})`}
          >
            <AnimatedPath
              d={
                "M36 26v10.997c0 1.659-1.337 3.003-3.009 3.003h-9.981c-1.662 0-3.009-1.342-3.009-3.003v-10.997h16zm-2 0v10.998c0 .554-.456 1.002-1.002 1.002h-9.995c-.554 0-1.002-.456-1.002-1.002v-10.998h12zm-9-5c0-.552.451-1 .991-1h4.018c.547 0 .991.444.991 1 0 .552-.451 1-.991 1h-4.018c-.547 0-.991-.444-.991-1zm0 6.997c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm4 0c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm-6-5.997h-4.008c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h18.016c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-4.008v-1c0-1.653-1.343-3-3-3h-3.999c-1.652 0-3 1.343-3 3v1z"
              }
              animatedProps={iconStyle}
            />
          </AnimatedG>
        </AnimatedSvg>
      </View>
      <View
        style={{
          position: "absolute",
          insetBlock: 0,
          insetInlineEnd: 0,
          width: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          width={(radius + strokeWidth) * 2}
          height={(radius + strokeWidth) * 2}
          style={{
            position: "absolute",
            insetInlineEnd: 25 - radius - strokeWidth,
            overflow: "visible",
          }}
        >
          {/* Background circle */}
          <AnimatedCircle
            cx={`${radius + strokeWidth}`}
            cy={`${radius + strokeWidth}`}
            r={radius}
            fill="rgb(0,255,0)"
            animatedProps={checkCircleBgStyle}
          />

          {/* Animated progress circle */}
          <AnimatedCircle
            cx={`${radius + strokeWidth}`}
            cy={`${radius + strokeWidth}`}
            r={radius}
            stroke="rgb(0,255,0)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={checkCircleStrokeStyle}
            strokeLinecap="round"
            fill="transparent"
            rotation="-90"
            origin={`${radius + strokeWidth},${radius + strokeWidth}`}
          />
        </Svg>
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "relative" }}
        >
          <AnimatedPath
            d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z"
            stroke="rgb(255,255,255)"
            animatedProps={checIconStyle}
          />
        </Svg>
      </View>

      <Animated.View style={[{ position: "relative" }, slideStyle]}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            onTouchEnd={() => {
              if (Math.abs(offsetX.value) < 5) {
                completed.toggle();
              }
            }}
          >
            <Surface
              elevation={0}
              style={{
                padding: 16,
                backgroundColor: completed.value ? "#ddd" : "#fff",
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
                    setContentFullHeight(
                      contentFullHeight === null
                        ? e.nativeEvent.layout.height
                        : contentFullHeight
                    );
                    setTaskWidth(e.nativeEvent.layout.width);
                  }}
                  variant="bodyMedium"
                  style={{
                    paddingTop: 8,
                    lineHeight: 20,
                    color: completed.value ? "gray" : "black",
                    textDecorationLine: completed.value
                      ? "line-through"
                      : "none",
                  }}
                >
                  {description}
                </Text>
              </Animated.View>
            </Surface>
          </Animated.View>
        </GestureDetector>

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
            contentFullHeight !== null &&
              contentFullHeight <= 28 && { display: "none" },
          ]}
          iconColor={completed.value ? "gray" : "black"}
        />
      </Animated.View>
    </View>
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
