import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function ImportContactsScreen() {
  const router = useRouter();

  const handleUploadCSV = () => {
    // Handle CSV upload logic here
    console.log("Upload CSV pressed");
  };

  const handleImportFromPhone = () => {
    // Handle import from phone logic here
    console.log("Import from Phone pressed");
  };

  const handleSkipForNow = () => {
    // Navigate to next screen or home
    router.push("/LaunchAicomp");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Import Your Contacts</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Avatar Grid */}
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/avatars-grid.png")} // Make sure this image exists
          style={styles.avatarGrid}
          resizeMode="contain"
        />
      </View>

      {/* Description Text */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Easily connect with your contacts by importing them now. This helps
          you build and strengthen your network effortlessly.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleUploadCSV}
        >
          <Text style={styles.primaryButtonText}>Upload CSV</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleImportFromPhone}
        >
          <Text style={styles.primaryButtonText}>Import from Phone</Text>
        </TouchableOpacity>
      </View>

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkipForNow}>
        <Text style={styles.skipButtonText}>Skip for Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40, // Same width as back button to center the title
  },
  avatarContainer: {
    paddingHorizontal: 0,
    marginTop: 10,
  },
  avatarGrid: {
    width: "100%",
    height: 180,
  },
  descriptionContainer: {
    paddingHorizontal: 32,
    marginTop: 40,
    marginBottom: 80,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: "#4CA64C",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    marginHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  skipButtonText: {
    color: "#999999",
    fontSize: 16,
    fontWeight: "500",
  },
});
