import { Surface, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
  subtitle?: string;
}

export default function Headding({ title, subtitle }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Surface
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: 10,
        paddingHorizontal: 16,
      }}
    >
      <Text variant="headlineLarge">{title}</Text>
      <Text variant="bodyMedium">{subtitle}</Text>
    </Surface>
  );
}
