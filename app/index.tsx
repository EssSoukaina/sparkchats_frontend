// app/index.tsx
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login"); // Navigate to register after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/icon.jpg")} //  splash image
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "80%",
    height: undefined,
    aspectRatio: 1, // Adjust to your image's aspect ratio
  },
});

export default SplashScreen;
