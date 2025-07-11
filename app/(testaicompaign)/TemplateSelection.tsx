import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function TemplateSelection() {
  const router = useRouter();
  const [currentTemplate, setCurrentTemplate] = useState(0);

  const templates = [
    {
      id: 1,
      name: "SPM Template",
      description:
        "A direct and clear text message, perfect for quick communication.",
      type: "SPM",
      chatTitle: "Athletics",
      avatarLetter: "A",
      messageText:
        "Hi Tony! Our latest offer is starting now! Buy two, get one free on our new equipment collection.",
    },
    {
      id: 2,
      name: "Delishop Promo",
      description: "A delicious message layout for food & beverage deals.",
      type: "FOOD",
      chatTitle: "Delishop",
      avatarLetter: "D",
      messageText:
        "Craving chocolate? 🍫 Buy 1 get 1 free this weekend only! Tap to order.",
    },
    {
      id: 3,
      name: "Event Reminder",
      description:
        "Send a stylish reminder for upcoming events and appointments.",
      type: "EVENT",
      chatTitle: "Events Co",
      avatarLetter: "E",
      messageText:
        "Don't forget: Your reservation starts in 1 hour! 📅 Reply YES to confirm attendance.",
    },
  ];

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push({
      pathname: "/templatepreview",
      params: { selectedTemplate: JSON.stringify(current) },
    });
  };

  const handlePrevious = () => {
    if (currentTemplate > 0) {
      setCurrentTemplate(currentTemplate - 1);
    }
  };

  const handleNextTemplate = () => {
    if (currentTemplate < templates.length - 1) {
      setCurrentTemplate(currentTemplate + 1);
    }
  };

  const current = templates[currentTemplate];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI-Powered Campaign Creator</Text>
        <View style={styles.proButton}>
          <Text style={styles.proButtonText}>Pro</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Description */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Choose Your Message Template</Text>
          <Text style={styles.subtitle}>
            Select the best format for your WhatsApp campaign.
          </Text>
        </View>

        {/* Template Carousel */}
        <View style={styles.carouselContainer}>
          {/* Navigation Arrows */}
          <TouchableOpacity
            style={[styles.navButton, styles.leftNav]}
            onPress={handlePrevious}
            disabled={currentTemplate === 0}
          >
            <AntDesign name="left" size={20} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.rightNav]}
            onPress={handleNextTemplate}
            disabled={currentTemplate === templates.length - 1}
          >
            <AntDesign name="right" size={20} color="#666666" />
          </TouchableOpacity>

          {/* Template Card */}
          <View style={styles.templateCard}>
            <View style={styles.templateHeader}>
              <Text style={styles.templateName}>{current.name}</Text>
              <View style={styles.moreButton}>
                <AntDesign name="ellipsis1" size={20} color="#333333" />
              </View>
            </View>

            <Text style={styles.templateDescription}>
              {current.description}
            </Text>

            {/* Phone Mockup */}
            <View style={styles.phoneMockup}>
              <View style={styles.phoneScreen}>
                <View style={styles.chatHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>A</Text>
                  </View>
                  <Text style={styles.chatTitle}>Athletics</Text>
                </View>

                <View style={styles.messageContainer}>
                  <View style={styles.messageImage}>
                    <View style={styles.imagePlaceholder} />
                  </View>
                  <Text style={styles.messageText}>
                    Hi! Tony! Our latest offer is starting now! Buy two, get one
                    free on our new equipment collection.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>
            Continue with this template
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    flex: 1,
    textAlign: "center",
    marginLeft: -40,
  },
  proButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  proButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  scrollContainer: { flex: 1, paddingHorizontal: 20 },
  titleContainer: { marginBottom: 40, paddingTop: 20 },
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
  carouselContainer: { position: "relative", marginBottom: 40 },
  navButton: {
    position: "absolute",
    top: "50%",
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftNav: { left: -10, marginTop: -20 },
  rightNav: { right: -10, marginTop: -20 },
  templateCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
  },
  templateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  templateName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  moreButton: { padding: 4 },
  templateDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 24,
    lineHeight: 20,
  },
  phoneMockup: { alignItems: "center" },
  phoneScreen: {
    width: 280,
    height: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  chatTitle: { fontSize: 16, fontWeight: "600", color: "#333333" },
  messageContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 12,
    marginLeft: 8,
  },
  messageImage: { marginBottom: 8 },
  imagePlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  messageText: { fontSize: 14, color: "#333333", lineHeight: 18 },
  continueButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
