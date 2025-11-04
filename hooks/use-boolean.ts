import { useState } from "react";

export default function useBoolean(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    toggle: () => setValue((prev) => !prev),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
  };
}
