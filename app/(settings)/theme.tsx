import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Appearance,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type ThemeMode = "light" | "dark" | "system";

interface ThemeColors {
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
}

const lightTheme: ThemeColors = {
  background: "#f8f9fa",
  cardBackground: "#ffffff",
  text: "#333333",
  textSecondary: "#666666",
  border: "#e9ecef",
  primary: "#4CA64C",
};

const darkTheme: ThemeColors = {
  background: "#1a1a1a",
  cardBackground: "#2d2d2d",
  text: "#ffffff",
  textSecondary: "#b0b0b0",
  border: "#404040",
  primary: "#4CA64C",
};

export default function ThemeScreen() {
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>("light");
  const [isLoading, setIsLoading] = useState(false);

  // Get current theme colors based on selection
  const getCurrentTheme = (): ThemeColors => {
    if (selectedTheme === "system") {
      return systemColorScheme === "dark" ? darkTheme : lightTheme;
    }
    return selectedTheme === "dark" ? darkTheme : lightTheme;
  };

  const currentTheme = getCurrentTheme();

  // Load saved theme preference on component mount
  useEffect(() => {
    // In a real app, you would load this from AsyncStorage or your state management
    // loadThemePreference();
  }, []);

  const handleThemeSelect = (theme: ThemeMode) => {
    setSelectedTheme(theme);
  };

  const handleApply = async () => {
    setIsLoading(true);

    try {
      // Simulate saving theme preference
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, you would:
      // 1. Save to AsyncStorage
      // 2. Update global theme context
      // 3. Apply theme changes throughout the app

      Alert.alert(
        "Theme Updated",
        `Theme changed to ${
          selectedTheme === "system"
            ? "System Default"
            : selectedTheme === "dark"
            ? "Dark Mode"
            : "Light Mode"
        }. Changes will be applied immediately.`,
        [
          {
            text: "OK",
            onPress: () => {
              // Apply theme change logic here
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error saving theme preference:", error);
      Alert.alert(
        "Error",
        "Failed to update theme preference. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const ThemePreview = ({
    mode,
    isSelected,
  }: {
    mode: ThemeMode;
    isSelected: boolean;
  }) => {
    const previewTheme =
      mode === "system"
        ? systemColorScheme === "dark"
          ? darkTheme
          : lightTheme
        : mode === "dark"
        ? darkTheme
        : lightTheme;

    return (
      <View
        style={[
          styles.phonePreview,
          {
            backgroundColor: previewTheme.cardBackground,
            borderColor: previewTheme.border,
          },
        ]}
      >
        {/* Phone Header */}
        <View
          style={[
            styles.phoneHeader,
            {
              backgroundColor: previewTheme.cardBackground,
              borderBottomColor: previewTheme.border,
            },
          ]}
        >
          <View style={styles.phoneStatusBar}>
            <Text style={[styles.phoneTime, { color: previewTheme.text }]}>
              9:41
            </Text>
            <View style={styles.phoneIcons}>
              <View
                style={[
                  styles.phoneBattery,
                  { backgroundColor: previewTheme.text },
                ]}
              />
            </View>
          </View>
          <View style={styles.phoneNavHeader}>
            <Text style={[styles.phoneTitle, { color: previewTheme.text }]}>
              Dashboard
            </Text>
          </View>
        </View>

        {/* Phone Content */}
        <View
          style={[
            styles.phoneContent,
            { backgroundColor: previewTheme.background },
          ]}
        >
          {/* Stats Cards */}
          <View style={styles.phoneStatsRow}>
            <View
              style={[
                styles.phoneStatCard,
                { backgroundColor: previewTheme.cardBackground },
              ]}
            >
              <Ionicons name="bar-chart" size={16} color="#4CA64C" />
              <Text
                style={[styles.phoneStatNumber, { color: previewTheme.text }]}
              >
                142
              </Text>
              <Text
                style={[
                  styles.phoneStatLabel,
                  { color: previewTheme.textSecondary },
                ]}
              >
                Analytics
              </Text>
            </View>
            <View
              style={[
                styles.phoneStatCard,
                { backgroundColor: previewTheme.cardBackground },
              ]}
            >
              <Ionicons name="people" size={16} color="#4CA64C" />
              <Text
                style={[styles.phoneStatNumber, { color: previewTheme.text }]}
              >
                1,234
              </Text>
              <Text
                style={[
                  styles.phoneStatLabel,
                  { color: previewTheme.textSecondary },
                ]}
              >
                Contacts
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.phoneActionsRow}>
            <View
              style={[
                styles.phoneActionCard,
                { backgroundColor: previewTheme.cardBackground },
              ]}
            >
              <Ionicons name="send" size={20} color="#4CA64C" />
              <Text
                style={[styles.phoneActionText, { color: previewTheme.text }]}
              >
                Send Message
              </Text>
            </View>
            <View
              style={[
                styles.phoneActionCard,
                { backgroundColor: previewTheme.cardBackground },
              ]}
            >
              <Ionicons name="time" size={20} color="#4CA64C" />
              <Text
                style={[styles.phoneActionText, { color: previewTheme.text }]}
              >
                Schedule
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: currentTheme.cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.border,
    },
    backButton: {
      marginRight: 16,
      padding: 4,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: currentTheme.text,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    description: {
      fontSize: 16,
      color: currentTheme.textSecondary,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 40,
    },
    themesContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 48,
      gap: 16,
    },
    themeOption: {
      flex: 1,
      alignItems: "center",
    },
    phonePreview: {
      width: "100%",
      height: 200,
      borderRadius: 20,
      borderWidth: 3,
      overflow: "hidden",
      marginBottom: 12,
    },
    phoneHeader: {
      paddingTop: 8,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
    },
    phoneStatusBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 4,
    },
    phoneTime: {
      fontSize: 10,
      fontWeight: "600",
    },
    phoneIcons: {
      flexDirection: "row",
      alignItems: "center",
    },
    phoneBattery: {
      width: 16,
      height: 8,
      borderRadius: 2,
    },
    phoneNavHeader: {
      paddingVertical: 8,
    },
    phoneTitle: {
      fontSize: 12,
      fontWeight: "600",
      textAlign: "center",
    },
    phoneContent: {
      flex: 1,
      padding: 12,
    },
    phoneStatsRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 12,
    },
    phoneStatCard: {
      flex: 1,
      padding: 8,
      borderRadius: 8,
      alignItems: "center",
    },
    phoneStatNumber: {
      fontSize: 14,
      fontWeight: "700",
      marginTop: 4,
    },
    phoneStatLabel: {
      fontSize: 8,
      marginTop: 2,
    },
    phoneActionsRow: {
      flexDirection: "row",
      gap: 8,
    },
    phoneActionCard: {
      flex: 1,
      padding: 8,
      borderRadius: 8,
      alignItems: "center",
    },
    phoneActionText: {
      fontSize: 8,
      marginTop: 4,
      textAlign: "center",
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: currentTheme.primary,
    },
    themeLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: currentTheme.text,
    },
    buttonContainer: {
      gap: 12,
    },
    applyButton: {
      backgroundColor: currentTheme.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: "center",
    },
    buttonDisabled: {
      backgroundColor: "#a0a0a0",
    },
    applyButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    backActionButton: {
      backgroundColor: "transparent",
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: "center",
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    backButtonText: {
      color: currentTheme.textSecondary,
      fontSize: 16,
      fontWeight: "500",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theme</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Select how you'd like the app to appear. You can choose between Light,
          Dark.
        </Text>

        <View style={styles.themesContainer}>
          <TouchableOpacity
            style={styles.themeOption}
            onPress={() => handleThemeSelect("light")}
          >
            <ThemePreview mode="light" isSelected={selectedTheme === "light"} />
            <View style={styles.radioButton}>
              <View
                style={[
                  styles.radioCircle,
                  {
                    borderColor:
                      selectedTheme === "light"
                        ? currentTheme.primary
                        : currentTheme.border,
                  },
                ]}
              >
                {selectedTheme === "light" && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.themeLabel}>Light Mode</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.themeOption}
            onPress={() => handleThemeSelect("dark")}
          >
            <ThemePreview mode="dark" isSelected={selectedTheme === "dark"} />
            <View style={styles.radioButton}>
              <View
                style={[
                  styles.radioCircle,
                  {
                    borderColor:
                      selectedTheme === "dark"
                        ? currentTheme.primary
                        : currentTheme.border,
                  },
                ]}
              >
                {selectedTheme === "dark" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.themeLabel}>Dark Mode</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.applyButton, isLoading && styles.buttonDisabled]}
            onPress={handleApply}
            disabled={isLoading}
          >
            <Text style={styles.applyButtonText}>
              {isLoading ? "Applying..." : "Apply"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backActionButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
