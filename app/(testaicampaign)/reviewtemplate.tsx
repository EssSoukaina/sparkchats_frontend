import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";

export default function ReviewTemplateScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/templateeditor"); // adjust path if your route is different
    }, 5000); // 5000ms = 5 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.content}>
        {/* Clock Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.clockCircle}>
            <View style={styles.clockHand} />
            <View style={styles.clockMinuteHand} />
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Your Template Has Been{"\n"}Sent for Review!
          </Text>

          <Text style={styles.description}>
            Welcome to SparkChats! Before launching your campaign,{"\n"}
            Meta must review your message to ensure it{"\n"}
            meets WhatsApp's guidelines. This process is{"\n"}
            quick, usually under a minute, and you'll be{"\n"}
            notified once it's approved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 50,
  },
  clockCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#4a4a4a",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  clockHand: {
    position: "absolute",
    width: 3,
    height: 25,
    backgroundColor: "#4a4a4a",
    top: 15,
    transformOrigin: "bottom center",
  },
  clockMinuteHand: {
    position: "absolute",
    width: 2,
    height: 18,
    backgroundColor: "#4a4a4a",
    top: 22,
    left: 15,
    transformOrigin: "bottom center",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2c2c2c",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },
});
