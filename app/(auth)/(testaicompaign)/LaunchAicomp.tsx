import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function LaunchAIcomp() {
  const router = useRouter();

  const handleStartCampaign = () => {
    router.push("/AICampaignCreator");
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
        <Text style={styles.headerTitle}>Launch Your Free AI Campaign!</Text>
      </View>

      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        {/* Icon Container */}
        <View style={styles.iconContainer}>
          <Image
            source={require("../../../assets/images/campaign-icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.descriptionText}>
            Test our AI-powered campaign feature with a free WhatsApp trial
            number before linking your own.
          </Text>
          <Text style={styles.subText}>
            Send a trial message to up to 10 contacts and experience seamless
            automation!
          </Text>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleStartCampaign}
          >
            <Text style={styles.primaryButtonText}>Start Free Campaign</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 48,
    alignItems: "center",
  },
  icon: {
    width: 80,
    height: 80,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 64,
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333333",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  subText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 280,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
