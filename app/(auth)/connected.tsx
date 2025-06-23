import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const VerifiedScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons
          name="check-circle"
          size={120}
          color="#4CA64C"
          style={styles.checkIcon}
        />

        <Text style={styles.title}>Your Account is Verified!</Text>
        <Text style={styles.subtitle}>
          Congratulations, your email has been successfully verified!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 40,
    fontStyle: "italic",
  },
});

export default VerifiedScreen;
