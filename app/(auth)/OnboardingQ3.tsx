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

type MainGoalId =
  | "increase_engagement"
  | "referral"
  | "grow_business"
  | "improve_relationships";

const OnboardingQ3 = () => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [selectedOption, setSelectedOption] = useState<MainGoalId | null>(null);

  const mainGoalOptions: Array<{
    id: MainGoalId;
    title: string;
  }> = [
    {
      id: "increase_engagement",
      title: "Increase engagement & responses",
    },
    {
      id: "referral",
      title: "Referral (Friend/Colleague)",
    },
    {
      id: "grow_business",
      title: "Grow my business faster",
    },
    {
      id: "improve_relationships",
      title: "Improve customer relationships",
    },
  ];

  const selectOption = (optionId: MainGoalId) => {
    setSelectedOption(optionId);
  };

  const handleFinish = async () => {
    console.log("Selected main goal:", selectedOption);

    // Save onboarding completion status to user metadata
    try {
      await user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboardingCompleted: true,
          selectedGoal: selectedOption,
        },
      });

      // Navigate to main app or dashboard
      router.replace("/(auth)/AccountCreated");
      setTimeout(() => {
        router.replace("/(auth)/BusinessProfileSetup");
      }, 5000);
    } catch (error) {
      console.error("Error updating user metadata:", error);
      // Still navigate even if metadata update fails
      router.replace("/(auth)/AccountCreated");
      setTimeout(() => {
        router.replace("/(auth)/BusinessProfileSetup");
      }, 5000);
    }
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

        {/* Progress Indicator - All steps completed */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressStep, styles.activeStep]}>
              <MaterialIcons name="check" size={12} color="white" />
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, styles.activeStep]}>
              <MaterialIcons name="check" size={12} color="white" />
            </View>
            <View style={styles.progressLine} />
            <View style={[styles.progressStep, styles.activeStep]}>
              <MaterialIcons name="check" size={12} color="white" />
            </View>
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            What is your main goal with SparkChats?
          </Text>
          <Text style={styles.questionSubtitle}>(Choose one)</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {mainGoalOptions.map((option) => (
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
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation - Only Back and Finish buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.backNavButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={20} color="white" />
          <Text style={styles.backNavText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.finishButton,
            selectedOption === null && styles.disabledButton,
          ]}
          onPress={handleFinish}
          disabled={selectedOption === null}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
          <MaterialIcons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
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
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
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
  finishButton: {
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
  finishButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OnboardingQ3;
