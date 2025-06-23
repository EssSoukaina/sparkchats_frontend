import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AccountSuccessScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <MaterialIcons name="check" size={48} color="white" />
        </View>

        {/* Success Message */}
        <Text style={styles.title}>
          Your Account Has Been{"\n"}Created Successfully!
        </Text>

        {/* Welcome Message */}
        <Text style={styles.subtitle}>Welcome to SparkChats!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CA64C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default AccountSuccessScreen;
