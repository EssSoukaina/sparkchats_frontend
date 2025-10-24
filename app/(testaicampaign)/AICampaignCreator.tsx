import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function AICampaignCreator() {
  const router = useRouter();
  const [messageCategory, setMessageCategory] = useState("");
  const [messageText, setMessageText] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState("");
  const [language, setLanguage] = useState("");
  const [mediaFile, setMediaFile] = useState("");
  type DropdownType = "category" | "tone" | "language";

  // For dropdowns
  const [showDropdown, setShowDropdown] = useState<
    Record<DropdownType, boolean>
  >({
    category: false,
    tone: false,
    language: false,
  });

  const categoryOptions = ["Promotion", "Event", "Update", "Reminder"];
  const toneOptions = ["Friendly", "Professional", "Urgent", "Casual"];
  const languageOptions = ["English", "French", "Arabic", "Spanish"];

  const handleGoBack = () => {
    router.back();
  };

  const handleWriteMessage = () => {
    // You could use values in API call here
    router.push("/templatepreview");
  };

  const handleUploadMedia = () => {
    // Placeholder for media upload logic
    setMediaFile("promo_image.jpg"); // simulate uploaded file name
  };

  const renderDropdown = (type: DropdownType, options: string[]) => (
    <Modal
      transparent
      visible={showDropdown[type]} // ✅ no error now
      animationType="fade"
      onRequestClose={() =>
        setShowDropdown((prev) => ({ ...prev, [type]: false }))
      }
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() =>
          setShowDropdown((prev) => ({ ...prev, [type]: false }))
        }
      >
        <View style={styles.dropdownModal}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  if (type === "category") setMessageCategory(item);
                  else if (type === "tone") setToneOfVoice(item);
                  else if (type === "language") setLanguage(item);

                  setShowDropdown((prev) => ({ ...prev, [type]: false }));
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI-Powered Campaign Creator</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Create Your AI-Powered Campaign</Text>
          <Text style={styles.subtitle}>
            Tell the AI what you want to communicate in your{"\n"}
            WhatsApp campaign. The AI will craft a message for you!
          </Text>
        </View>

        {/* Campaign Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Campaign Details</Text>

          {/* Message Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message Category</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() =>
                setShowDropdown((prev) => ({ ...prev, category: true }))
              }
            >
              <Text style={styles.dropdownPlaceholder}>
                {messageCategory || "Select the type of campaign"}
              </Text>
              <AntDesign name="down" size={16} color="#999999" />
            </TouchableOpacity>
          </View>

          {/* Describe Your Message */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Describe Your Message</Text>
            <TextInput
              style={styles.textArea}
              placeholder='Example: "Announce a 50% discount on all products this weekend."'
              placeholderTextColor="#999999"
              multiline
              numberOfLines={3}
              value={messageText}
              onChangeText={setMessageText}
            />
          </View>

          {/* Tone of Voice and Language */}
          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Tone of Voice</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() =>
                  setShowDropdown((prev) => ({ ...prev, tone: true }))
                }
              >
                <Text style={styles.dropdownPlaceholder}>
                  {toneOfVoice || "Select Tone"}
                </Text>
                <AntDesign name="down" size={16} color="#999999" />
              </TouchableOpacity>
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Change Language</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() =>
                  setShowDropdown((prev) => ({ ...prev, language: true }))
                }
              >
                <Text style={styles.dropdownPlaceholder}>
                  {language || "Language"}
                </Text>
                <AntDesign name="down" size={16} color="#999999" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Include Media */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Include Media?</Text>
            <TouchableOpacity
              style={styles.mediaUpload}
              onPress={handleUploadMedia}
            >
              <View style={styles.uploadIcon}>
                <Feather name="upload-cloud" size={32} color="#CCCCCC" />
              </View>
              <Text style={styles.uploadText}>
                {mediaFile ? mediaFile : "Click here to upload"}
              </Text>
              <Text style={styles.uploadSubtext}>
                Supported formats: JPEG, PNG, MP4
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Write Message Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleWriteMessage}
        >
          <Text style={styles.primaryButtonText}>Write your message</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Dropdown Modals */}
      {renderDropdown("category", categoryOptions)}
      {renderDropdown("tone", toneOptions)}
      {renderDropdown("language", languageOptions)}
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 20,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "#999999",
  },
  textArea: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333333",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    minHeight: 70,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  halfWidth: {
    width: "48%",
  },
  mediaUpload: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  uploadIcon: {
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 14,
    color: "#999999",
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownModal: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: 250,
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  optionText: {
    fontSize: 16,
    color: "#333333",
  },
});
