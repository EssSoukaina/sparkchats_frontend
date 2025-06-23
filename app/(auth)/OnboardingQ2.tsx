import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useUser, useClerk } from "@clerk/clerk-expo";

type AwarenessSourceId =
  | "social_media"
  | "google_search"
  | "referral"
  | "online_ads"
  | "other";

const OnboardingUserAwareness = () => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [selectedOption, setSelectedOption] =
    useState<AwarenessSourceId | null>(null);

  const awarenessOptions: Array<{
    id: AwarenessSourceId;
    title: string;
    description?: string;
  }> = [
    {
      id: "social_media",
      title: "Social Media",
      description: "(Facebook, Instagram, LinkedIn, etc.)",
    },
    {
      id: "google_search",
      title: "Google Search",
    },
    {
      id: "referral",
      title: "Referral (Friend/Colleague)",
    },
    {
      id: "online_ads",
      title: "Online Ads",
    },
    {
      id: "other",
      title: "Other",
    },
  ];

  const selectOption = (optionId: AwarenessSourceId) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    console.log("Selected option:", selectedOption);
    // Navigate to next onboarding screen
    router.push("/OnboardingQ3"); // Update with your next screen route
  };

  const handleSkip = () => {
    // Navigate to next onboarding screen or finish onboarding
    router.push("/OnboardingQ3"); // Update with your next screen route
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={20} color="#666" />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Up Your Business Goals</Text>
        </View>

        {/* Progress Indicator - Second step completed */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressStep, styles.activeStep]}>
              <MaterialIcons name="check" size={12} color="white" />
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, styles.activeStep]}>
              <MaterialIcons name="check" size={12} color="white" />
            </View>
            <View style={styles.progressLineInactive} />
            <View style={[styles.progressStep, styles.inactiveStep]} />
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>How did you hear about us?</Text>
          <Text style={styles.questionSubtitle}>(Choose one)</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {awarenessOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption === option.id && styles.selectedOption,
              ]}
              onPress={() => selectOption(option.id)}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedOption === option.id && styles.radioButtonSelected,
                ]}
              >
                {selectedOption === option.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                {option.description && (
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.backNavButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={20} color="white" />
          <Text style={styles.backNavText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedOption === null && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={selectedOption === null}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <MaterialIcons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip & Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logoutButton: {
    position: "absolute",
    top: 56,
    right: 20,
    zIndex: 1000,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  progressTrack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  progressStep: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: "#4CA64C",
  },
  inactiveStep: {
    backgroundColor: "#E0E0E0",
  },
  progressLine: {
    width: 60,
    height: 2,
    backgroundColor: "#4CA64C",
    marginHorizontal: 10,
  },
  progressLineInactive: {
    width: 60,
    height: 2,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 10,
  },
  questionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 8,
  },
  questionSubtitle: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    borderColor: "#4CA64C",
    backgroundColor: "#F8FFF8",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#4CA64C",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CA64C",
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    color: "#666666",
    lineHeight: 16,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  backNavButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CA64C",
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  backNavText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CA64C",
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4CA64C",
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 12,
  },
  skipButtonText: {
    color: "#4CA64C",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default OnboardingUserAwareness;
