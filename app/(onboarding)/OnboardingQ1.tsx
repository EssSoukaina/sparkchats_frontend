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

type BusinessGoalId = "marketing" | "customer_support" | "sales";

const OnboardingQ1 = () => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [selectedOptions, setSelectedOptions] = useState<BusinessGoalId[]>([]);

  const businessGoals: Array<{
    id: BusinessGoalId;
    title: string;
    description: string;
  }> = [
    {
      id: "marketing",
      title: "Marketing",
      description:
        "Automate campaigns, send bulk messages, and engage your audience.",
    },
    {
      id: "customer_support",
      title: "Customer Support",
      description:
        "Provide instant responses, manage chats, and improve service.",
    },
    {
      id: "sales",
      title: "Sales",
      description:
        "Convert leads, follow up automatically, and close deals faster.",
    },
  ];

  const toggleOption = (optionId: BusinessGoalId) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const handleNext = () => {
    console.log("Selected options:", selectedOptions);
    router.push("/OnboardingQ2");
  };

  const handleSkip = () => {
    router.push("/OnboardingQ2");
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

        {/* Progress Indicator - Only first step completed */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressStep, styles.activeStep]}>
              <MaterialIcons name="check" size={12} color="white" />
            </View>
            <View style={styles.progressLineInactive} />
            <View style={[styles.progressStep, styles.inactiveStep]} />
            <View style={styles.progressLineInactive} />
            <View style={[styles.progressStep, styles.inactiveStep]} />
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            How do you plan to use SparkChats?
          </Text>
          <Text style={styles.questionSubtitle}>
            (Select one or multiple options)
          </Text>
        </View>

        {/* Options - Fixed layout to match design */}
        <View style={styles.optionsContainer}>
          {/* First row with Marketing and Customer Support */}
          <View style={styles.optionsRow}>
            {businessGoals.slice(0, 2).map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.optionCard,
                  selectedOptions.includes(goal.id) && styles.selectedOption,
                ]}
                onPress={() => toggleOption(goal.id)}
              >
                <View
                  style={[
                    styles.radioButton,
                    selectedOptions.includes(goal.id) &&
                      styles.radioButtonSelected,
                  ]}
                >
                  {selectedOptions.includes(goal.id) && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.optionTitle}>{goal.title}</Text>
                <Text style={styles.optionDescription}>{goal.description}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Second row with Sales centered */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              key={businessGoals[2].id}
              style={[
                styles.optionCard,
                selectedOptions.includes(businessGoals[2].id) &&
                  styles.selectedOption,
              ]}
              onPress={() => toggleOption(businessGoals[2].id)}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedOptions.includes(businessGoals[2].id) &&
                    styles.radioButtonSelected,
                ]}
              >
                {selectedOptions.includes(businessGoals[2].id) && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.optionTitle}>{businessGoals[2].title}</Text>
              <Text style={styles.optionDescription}>
                {businessGoals[2].description}
              </Text>
            </TouchableOpacity>
            {/* Empty view to center the Sales option */}
            <View style={styles.optionCard} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation - Fixed styling */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.backNavButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={20} color="white" />
          <Text style={styles.backNavText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedOptions.length === 0 && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={selectedOptions.length === 0}
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
  // New styles for 2x2 grid layout
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    minHeight: 140,
    justifyContent: "flex-start",
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
    marginBottom: 12,
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
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 12,
    color: "#666666",
    lineHeight: 16,
    textAlign: "center",
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

export default OnboardingQ1;
