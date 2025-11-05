import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedProps,
} from "react-native-reanimated";
import Svg, { Circle, G, Path } from "react-native-svg";
import { useTaskContext } from "./context";

interface Props {
  name: "edit" | "delete";
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const radius = 20;
const strokeWidth = 2;
const circumference = 2 * Math.PI * radius;

export default function TaskActionIcon({ name }: Props) {
  const { slidePercent } = useTaskContext();
  const color = name === "delete" ? "rgb(255,0,0)" : "rgb(0,255,0)";
  const dir = name === "delete" ? 1 : -1;

  const iconStyle = useAnimatedProps(() => ({
    transform: [
      {
        scale: interpolate(
          slidePercent.value * 100 * dir,
          [0, 20],
          [0, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
    stroke: interpolateColor(
      slidePercent.value * 100 * dir,
      [0, 10, 20, 50, 60],
      ["rgb(255,255,255)", "rgb(255,255,255)", color, color, "rgb(255,255,255)"]
    ),
  }));

  const circleStrokeStyle = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(
      slidePercent.value * 100 * dir,
      [20, 60],
      [circumference, 0],
      Extrapolation.CLAMP
    ),
  }));

  const circleBgStyle = useAnimatedProps(() => ({
    opacity: interpolate(
      slidePercent.value * 100 * dir,
      [50, 60],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View
      style={{
        position: "absolute",
        insetBlock: 0,
        insetInlineStart: name === "delete" ? 0 : undefined,
        insetInlineEnd: name === "delete" ? undefined : 0,
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
          insetInlineStart:
            name === "delete" ? 25 - radius - strokeWidth : undefined,
          insetInlineEnd:
            name === "delete" ? undefined : 25 - radius - strokeWidth,
          overflow: "visible",
        }}
      >
        {/* Background circle */}
        <AnimatedCircle
          cx={`${radius + strokeWidth}`}
          cy={`${radius + strokeWidth}`}
          r={radius}
          fill={color}
          animatedProps={circleBgStyle}
        />

        {/* Animated progress circle */}
        <AnimatedCircle
          cx={`${radius + strokeWidth}`}
          cy={`${radius + strokeWidth}`}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={circleStrokeStyle}
          strokeLinecap="round"
          fill="transparent"
          rotation="-90"
          origin={`${radius + strokeWidth},${radius + strokeWidth}`}
        />
      </Svg>

      {name === "delete" ? (
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
      ) : (
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
            animatedProps={iconStyle}
          />
        </Svg>
      )}
    </View>
  );
}
