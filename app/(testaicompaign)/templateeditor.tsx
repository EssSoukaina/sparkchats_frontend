import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { TextInput } from "react-native";

export default function TemplatePreviewScreen() {
  const router = useRouter();

  const [message, setMessage] = React.useState(
    "Check out our latest offer! Enjoy a 20% discount on all products for a limited time. Don't miss out—shop now! 🛍"
  );

  const handleNextPress = () => {
    router.push("/(tabs)/home");
  };

  const handleBackPress = () => {
    router.back(); // or any custom logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI-Powered Campaign Creator</Text>
        <View style={styles.proBadge}>
          <Text style={styles.proText}>Pro</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Customize Your Template</Text>
          <Text style={styles.subtitle}>
            Fine-tune your message before sending your campaign. Edit the{"\n"}
            content, add media, and adjust the tone to match your brand's voice.
          </Text>
        </View>

        {/* Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <View style={styles.yogaMatImage}>
              <View style={styles.yogaMatPlaceholder} />
            </View>
          </View>
          <TouchableOpacity style={styles.changeImageBtn}>
            <Text style={styles.changeImageText}>Change Image</Text>
          </TouchableOpacity>
        </View>

        {/* Text Editor Section */}
        <View style={styles.textEditorSection}>
          <View style={styles.toolbar}>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarText}>B</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarTextItalic}>I</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarTextUnderline}>U</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarText}>≡</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarText}>≡</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarText}>≡</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarText}>•</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarText}>•</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarText}>⬇</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarBtn}>
              <Text style={styles.toolbarText}>TT</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              multiline
              placeholder="Write your campaign message here..."
              style={styles.textInput}
            />
          </View>
        </View>

        {/* Add Button Section */}
        <View style={styles.addButtonSection}>
          <Text style={styles.addButtonLabel}>Add Button</Text>
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaPlaceholder}>Meta-supported CTA</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNextPress}>
            <Text style={styles.nextBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Keep your styles exactly as defined

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
    color: "#333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  proBadge: {
    backgroundColor: "#4CA64C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  proText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  backBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4CA64C",
    alignItems: "center",
  },
  backBtnText: {
    color: "#4CA64C",
    fontSize: 16,
    fontWeight: "600",
  },
  nextBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#4CA64C",
    alignItems: "center",
  },
  nextBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  phoneMockup: {
    alignItems: "center",
    paddingBottom: 40,
  },
  phoneContainer: {
    width: 280,
    height: 560,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    minHeight: 120,
    textAlignVertical: "top", // Ensures text starts from the top
  },
  whatsappHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#075e54",
  },
  backArrowSmall: {
    color: "#ffffff",
    fontSize: 20,
    marginRight: 12,
  },
  businessInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  businessAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ff6b35",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  businessName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  securityNotice: {
    backgroundColor: "#fff3cd",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  securityText: {
    fontSize: 12,
    color: "#856404",
    textAlign: "center",
    lineHeight: 16,
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  messageBubble: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  imageContainer: {
    marginBottom: 12,
  },
  productImage: {
    height: 120,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: "#87ceeb",
    borderRadius: 8,
  },
  offerSection: {
    marginBottom: 12,
  },
  offerBadges: {
    flexDirection: "row",
    gap: 8,
  },
  offerBadge: {
    backgroundColor: "#333",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  offerBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flex: 1,
  },
  dateBadgeText: {
    color: "#333",
    fontSize: 10,
    textAlign: "center",
  },
  whatsappMessageText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    gap: 8,
  },
  copyCodeBtn: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  copyCodeText: {
    color: "#333",
    fontSize: 14,
  },
  shopBtn: {
    backgroundColor: "#25d366",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  shopBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f8f9fa",
    gap: 8,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    fontSize: 18,
    color: "#666",
  },
  inputField: {
    flex: 1,
    height: 32,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  emojiButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emojiText: {
    fontSize: 16,
  },
  cameraButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraText: {
    fontSize: 16,
  },
  micButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  micText: {
    fontSize: 16,
  },
  // Review Screen Styles
  reviewContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 50,
  },
  clockCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#4a4a4a",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  clockHand: {
    position: "absolute",
    width: 3,
    height: 25,
    backgroundColor: "#4a4a4a",
    top: 15,
    transformOrigin: "bottom center",
  },
  clockMinuteHand: {
    position: "absolute",
    width: 2,
    height: 18,
    backgroundColor: "#4a4a4a",
    top: 22,
    left: 15,
    transformOrigin: "bottom center",
  },
  textContainer: {
    alignItems: "center",
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2c2c2c",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 32,
  },
  reviewDescription: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },
  // Editor Screen Styles
  editorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  editorTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2c2c2c",
    marginBottom: 20,
  },
  editorSubtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  editButton: {
    backgroundColor: "#4CA64C",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  // Template Editor Styles
  imageSection: {
    marginBottom: 30,
  },
  yogaMatImage: {
    height: 180,
    borderRadius: 12,
    backgroundColor: "#f0f8ff",
    marginBottom: 12,
    overflow: "hidden",
  },
  yogaMatPlaceholder: {
    flex: 1,
    backgroundColor:
      "linear-gradient(135deg, #6fa8dc 0%, #3d85c6 50%, #1c4587 100%)",
    borderRadius: 12,
    position: "relative",
  },
  changeImageBtn: {
    alignSelf: "flex-end",
  },
  changeImageText: {
    color: "#4CA64C",
    fontSize: 16,
    fontWeight: "500",
  },
  textEditorSection: {
    marginBottom: 30,
  },
  toolbar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    flexWrap: "wrap",
    gap: 8,
  },
  toolbarBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
  },
  toolbarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  toolbarTextItalic: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#333",
  },
  toolbarTextUnderline: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textDecorationLine: "underline",
  },
  textInputContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    minHeight: 120,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  addButtonSection: {
    marginBottom: 40,
  },
  addButtonLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  ctaContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  ctaPlaceholder: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
});
