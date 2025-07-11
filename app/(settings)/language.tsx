import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Language {
  label: string;
  value: string;
  flag: string;
}

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages: Language[] = [
    { label: "English", value: "English", flag: "🇺🇸" },
    { label: "العربية", value: "Arabic", flag: "🇸🇦" },
    { label: "Français", value: "French", flag: "🇫🇷" },
    { label: "Español", value: "Spanish", flag: "🇪🇸" },
    { label: "Deutsch", value: "German", flag: "🇩🇪" },
    { label: "中文", value: "Chinese", flag: "🇨🇳" },
  ];

  const handleApply = async () => {
    setIsLoading(true);

    try {
      // Simulate saving language preference
      // In a real app, you would save to local storage or make an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        "Language Updated",
        `Language changed to ${selectedLanguage}. The app will apply the changes immediately.`,
        [
          {
            text: "OK",
            onPress: () => {
              // Apply language change logic here
              // You might want to restart the app or update i18n configuration
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error saving language preference:", error);
      Alert.alert(
        "Error",
        "Failed to update language preference. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language.value);
    setShowLanguageModal(false);
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.value && styles.selectedLanguageItem,
      ]}
      onPress={() => handleLanguageSelect(item)}
    >
      <View style={styles.languageItemContent}>
        <Text style={styles.languageFlag}>{item.flag}</Text>
        <Text
          style={[
            styles.languageLabel,
            selectedLanguage === item.value && styles.selectedLanguageLabel,
          ]}
        >
          {item.label}
        </Text>
      </View>
      {selectedLanguage === item.value && (
        <Ionicons name="checkmark" size={20} color="#4CA64C" />
      )}
    </TouchableOpacity>
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      <View style={styles.content}>
        {/* Language Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.languageIconWrapper}>
            <View style={styles.primaryIcon}>
              <Text style={styles.iconText}>A</Text>
            </View>
            <View style={styles.secondaryIcon}>
              <Text style={styles.iconTextSecondary}>文</Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Language</Text>
          <Text style={styles.description}>
            Choose your preferred app language. Changes will apply immediately.
          </Text>
        </View>

        {/* Language Selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionLabel}>Select Language</Text>

          <TouchableOpacity
            style={styles.languageSelector}
            onPress={() => setShowLanguageModal(true)}
          >
            <View style={styles.selectedLanguageContainer}>
              <Text style={styles.selectedLanguageFlag}>
                {
                  languages.find((lang) => lang.value === selectedLanguage)
                    ?.flag
                }
              </Text>
              <Text style={styles.selectedLanguageText}>
                {
                  languages.find((lang) => lang.value === selectedLanguage)
                    ?.label
                }
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
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

        {/* Language Selection Modal */}
        <Modal
          visible={showLanguageModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowLanguageModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Language</Text>
                <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={languages}
                renderItem={renderLanguageItem}
                keyExtractor={(item) => item.value}
                style={styles.languageList}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  languageIconWrapper: {
    position: "relative",
    width: 80,
    height: 80,
  },
  primaryIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 60,
    height: 60,
    backgroundColor: "#4CA64C",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  secondaryIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "#3A8F3A",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  iconText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  iconTextSecondary: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  selectionContainer: {
    marginBottom: 48,
  },
  selectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
  },
  languageSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  selectedLanguageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedLanguageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  selectedLanguageText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  languageList: {
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  selectedLanguageItem: {
    backgroundColor: "#f8f9fa",
  },
  languageItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageLabel: {
    fontSize: 16,
    color: "#333",
  },
  selectedLanguageLabel: {
    color: "#4CA64C",
    fontWeight: "500",
  },
  buttonContainer: {
    gap: 12,
  },
  applyButton: {
    backgroundColor: "#4CA64C",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "4CA64C",
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
    borderColor: "#e9ecef",
  },
  backButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
});
