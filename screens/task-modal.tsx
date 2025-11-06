import { useTaskStore } from "@/store/task.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  FAB,
  IconButton,
  Modal,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import * as yup from "yup";

const AnimatedFAB = Animated.createAnimatedComponent(FAB);

export default function TaskModal() {
  const { taskToEdit, setTaskToEdit, updateTask, addTask } = useTaskStore();
  const [visible, setVisible] = useState(false);
  const isEdit = taskToEdit !== null;

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string(),
      })
    ),
    defaultValues: {
      title: taskToEdit?.title || "",
      description: taskToEdit?.description || "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (isEdit) {
      updateTask({ ...taskToEdit, ...data });
    } else {
      addTask({ id: randomUUID(), ...data });
    }
    setTaskToEdit(null);
    setVisible(false);
  });

  // reset on close modal
  useEffect(() => {
    if (!visible) {
      reset({
        title: "",
        description: "",
      });
    }
  }, [taskToEdit, visible, reset]);

  // reset on edit task
  useEffect(() => {
    if (taskToEdit?.id) {
      reset({
        title: taskToEdit?.title || "",
        description: taskToEdit?.description || "",
      });
    }
  }, [taskToEdit, reset]);

  return (
    <>
      <AnimatedFAB
        icon="plus"
        onPress={() => setVisible(true)}
        style={styles.fab}
      />

      <Modal visible={visible || isEdit} onDismiss={() => setVisible(false)}>
        <KeyboardAwareScrollView enableOnAndroid>
          <Surface elevation={0} style={styles.modalCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text variant="titleLarge">
                {isEdit ? "✏️ Edit Task" : "📝 Create a New Task"}
              </Text>

              <IconButton
                icon="close"
                onPress={() => {
                  setVisible(false);
                  setTaskToEdit(null);
                }}
                style={{ marginInlineEnd: -10 }}
              />
            </View>

            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Task Title"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Task Description"
                  mode="outlined"
                  multiline
                  style={{ height: 100 }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Button
              mode="contained"
              onPress={onSubmit}
              style={{
                borderRadius: 10,
              }}
            >
              {isEdit ? "Update Task" : "Create Task"}
            </Button>
          </Surface>
        </KeyboardAwareScrollView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },

  modalCard: {
    marginHorizontal: 16,
    marginVertical: 50,
    borderRadius: 16,
    backgroundColor: "#fff",
    gap: 10,
    padding: 20,
  },
});
