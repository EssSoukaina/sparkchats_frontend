import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileInformationScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessCategory, setBusinessCategory] = useState(
    "Professional Services"
  );
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const businessCategories = [
    "Professional Services",
    "Healthcare",
    "Retail",
    "Restaurant & Food",
    "Education",
    "Technology",
    "Real Estate",
    "Automotive",
    "Beauty & Wellness",
    "Finance",
    "Other",
  ];

  const handleSave = () => {
    // Here you would typically save the profile information
    console.log("Saving profile:", {
      name,
      phoneNumber,
      businessCategory,
      profileImage,
    });
    Alert.alert("Success", "Profile information saved successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const handleBack = () => {
    router.back();
  };

  const handleImagePicker = () => {
    Alert.alert("Change Profile Photo", "Choose an option", [
      {
        text: "Camera",
        onPress: () => {
          console.log("Open camera");
          // Simulate setting an image - in real app, you'd use ImagePicker
        },
      },
      {
        text: "Gallery",
        onPress: () => {
          console.log("Open gallery");
          // Simulate setting an image - in real app, you'd use ImagePicker
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleGetTrialNumber = () => {
    Alert.alert(
      "Free Trial Number",
      "Get a free WhatsApp Business API trial number to start sending messages.",
      [
        {
          text: "Learn More",
          onPress: () => console.log("Learn more about trial"),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Information</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Profile Photo Section */}
          <View style={styles.photoSection}>
            <TouchableOpacity
              style={styles.photoContainer}
              onPress={handleImagePicker}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profilePhoto}
                />
              ) : (
                <View style={styles.profilePhotoPlaceholder}>
                  <Ionicons name="person" size={40} color="#999" />
                </View>
              )}
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          </View>

          {/* Business Phone Number Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Phone Number</Text>
            <View style={styles.phoneContainer}>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="+212 6 00 00 00 00"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity
              style={styles.trialButton}
              onPress={handleGetTrialNumber}
            >
              <Text style={styles.trialButtonText}>
                Get a free trial number from us!
              </Text>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>

          {/* Business Category Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Category</Text>
            <TouchableOpacity
              style={styles.categoryContainer}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={styles.categoryText}>{businessCategory}</Text>
              <Ionicons
                name={showCategoryPicker ? "chevron-up" : "chevron-down"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>

            {showCategoryPicker && (
              <View style={styles.categoryPicker}>
                {businessCategories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryOption,
                      category === businessCategory && styles.selectedCategory,
                    ]}
                    onPress={() => {
                      setBusinessCategory(category);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        category === businessCategory &&
                          styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                    {category === businessCategory && (
                      <Ionicons name="checkmark" size={16} color="#4CAF50" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButtonBottom} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  photoContainer: {
    position: "relative",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e9ecef",
  },
  profilePhotoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e9ecef",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#666",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  fieldContainer: {
    marginBottom: 24,
  },
  nameInput: {
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  phoneContainer: {
    marginBottom: 8,
  },
  phoneInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  trialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trialButtonText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  categoryContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  categoryPicker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    maxHeight: 200,
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  selectedCategory: {
    backgroundColor: "#f0f9ff",
  },
  categoryOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCategoryText: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  bottomButtons: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  saveButton: {
    backgroundColor: "#4CA64C",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButtonBottom: {
    backgroundColor: "transparent",
    borderRadius: 8,
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
