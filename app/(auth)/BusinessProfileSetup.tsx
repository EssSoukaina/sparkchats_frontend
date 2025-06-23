import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const BusinessProfileSetup = () => {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [getFreeNumber, setGetFreeNumber] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const categories = [
    { label: "Finance", value: "finance" },
    { label: "Arts", value: "arts" },
    { label: "Health", value: "health" },
    { label: "Technology", value: "technology" },
    { label: "Retail", value: "retail" },
    { label: "Food & Beverage", value: "food" },
    { label: "Real Estate", value: "realestate" },
    { label: "Education", value: "education" },
    { label: "Consulting", value: "consulting" },
    { label: "Other", value: "other" },
  ];

  const handleBack = () => {
    // Check if we can go back, otherwise navigate to OnboardingQ3
    if (router.canGoBack()) {
      router.back();
    } else {
      // Navigate to OnboardingQ3 page
      router.replace("/OnboardingQ3");
    }
  };

  const handleSaveAndContinue = () => {
    console.log("Save and continue");
    router.push("../aicampaign/ImportContacts"); // Update the route as needed
  };

  const handleCategorySelect = (category: { label?: string; value: any }) => {
    setSelectedCategory(category.value);
    setShowCategoryModal(false);
  };

  const handleSkipAndFinish = () => {
    console.log("Skip and finish");
  };

  const getSelectedCategoryLabel = () => {
    const selected = categories.find((cat) => cat.value === selectedCategory);
    return selected
      ? selected.label
      : "Select a category (e.g., Finance, Arts, Health)";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Up Your Business Profile</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Create a strong business identity and start automating your customer
            interactions effortlessly.
          </Text>
        </View>

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <MaterialIcons name="person" size={60} color="#999" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialIcons name="camera-alt" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Business Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your business name"
            placeholderTextColor="#999"
            value={businessName}
            onChangeText={setBusinessName}
          />
        </View>

        {/* Business Phone Number */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Business Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setGetFreeNumber(!getFreeNumber)}
          >
            <View
              style={[styles.checkbox, getFreeNumber && styles.checkboxChecked]}
            >
              {getFreeNumber && (
                <MaterialIcons name="check" size={12} color="white" />
              )}
            </View>
            <Text style={styles.checkboxText}>
              Get a free trial number from us!
            </Text>
            <MaterialIcons
              name="info-outline"
              size={16}
              color="#999"
              style={styles.infoIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Business Category */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Business Category</Text>
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text
              style={[
                styles.dropdownText,
                !selectedCategory && styles.placeholderText,
              ]}
            >
              {getSelectedCategoryLabel()}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Category Modal */}
      <Modal visible={showCategoryModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Business Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => handleCategorySelect(item)}
                >
                  <Text style={styles.categoryText}>{item.label}</Text>
                  {selectedCategory === item.value && (
                    <MaterialIcons name="check" size={20} color="#4CA64C" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAndContinue}
        >
          <Text style={styles.saveButtonText}>Save & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkipAndFinish}
        >
          <Text style={styles.skipButtonText}>Skip & Finish</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    color: "#333",
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#999",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4CA64C",
    borderColor: "#4CA64C",
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  infoIcon: {
    marginLeft: 4,
  },
  dropdownContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  placeholderText: {
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
    gap: 12,
  },
  saveButton: {
    backgroundColor: "#4CA64C",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default BusinessProfileSetup;
