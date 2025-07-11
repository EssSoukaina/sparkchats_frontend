import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* WhatsApp Business Logo */}
        <View style={styles.whatsappLogoContainer}>
          <Image
            source={require("../../assets/images/whatsapp-logo.png")}
            style={styles.whatsappImage}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>
          Let's set up your WhatsApp Business account{"\n"}to get started.
        </Text>

        {/* Facebook Button */}
        <TouchableOpacity
          style={styles.facebookButton}
          onPress={() => router.push("/")}
        >
          <Ionicons
            name="logo-facebook"
            size={20}
            color="#fff"
            style={styles.facebookIcon}
          />
          <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips:</Text>
        <View style={styles.tipsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tipsScrollContainer}
          >
            <View style={styles.tipCard}>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>
                  Make Your Messages More Engaging!
                </Text>
                <Text style={styles.tipSubtitle}>
                  Use customer names and personalized offers to increase
                  interaction rates.
                </Text>
              </View>
              <View style={styles.tipImageContainer}>
                <View style={styles.tipMockup}>
                  <View style={styles.mockupPhone}>
                    <View style={styles.mockupMessage}>
                      <Text style={styles.mockupText}>
                        Hey Ahmed! special discount for you today!
                      </Text>
                    </View>
                    <View style={styles.mockupAvatar} />
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.tipCard, styles.tipCardDark]}>
              <View style={styles.tipContent}>
                <Text style={[styles.tipTitle, styles.tipTitleDark]}>
                  Save Time with Smart Replies
                </Text>
                <Text style={[styles.tipSubtitle, styles.tipSubtitleDark]}>
                  Set up automated replies for common questions. Keep your
                  customers happy 24/7.
                </Text>
              </View>
              <View style={styles.tipImageContainer}>
                <View style={styles.tipMockupDark}>
                  <Ionicons
                    name="logo-whatsapp"
                    size={60}
                    color="rgba(255,255,255,0.3)"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions:</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardBlue]}
            onPress={() => router.push("/marketing")}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="megaphone" size={28} color="#2196F3" />
            </View>
            <Text style={styles.actionTitle}>Send a Marketing Campaign</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardOrange]}
            onPress={() => router.push("/marketing")}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="copy" size={28} color="#FF9800" />
            </View>
            <Text style={styles.actionTitle}>
              Create a Quick Reply Template
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardGreen]}
            onPress={() => router.push("/contacts")}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="person-add" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.actionTitle}>Add Contacts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardPink]}
            onPress={() => router.push("/chats")}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="chatbubble-ellipses" size={28} color="#E91E63" />
            </View>
            <Text style={styles.actionTitle}>Check New Chats</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: "center",
  },
  whatsappLogoContainer: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  whatsappImage: {
    width: 120,
    height: 120,
  },
  welcomeText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  facebookButton: {
    backgroundColor: "#4CA64C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
  },
  facebookIcon: {
    marginRight: 10,
  },
  facebookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  tipsContainer: {
    marginBottom: 30,
  },
  tipsScrollContainer: {
    paddingHorizontal: 20,
  },
  tipCard: {
    width: 260,
    height: 140,
    backgroundColor: "#C8E6C9",
    borderRadius: 12,
    marginRight: 15,
    padding: 15,
    flexDirection: "row",
  },
  tipCardDark: {
    backgroundColor: "#2E2E2E",
  },
  tipContent: {
    flex: 1,
    justifyContent: "center",
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  tipTitleDark: {
    color: "#fff",
  },
  tipSubtitle: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  tipSubtitleDark: {
    color: "#ccc",
  },
  tipImageContainer: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  tipMockup: {
    alignItems: "center",
  },
  mockupPhone: {
    width: 60,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  mockupMessage: {
    backgroundColor: "#E8F5E8",
    padding: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
  mockupText: {
    fontSize: 8,
    color: "#333",
    textAlign: "center",
  },
  mockupAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    alignSelf: "flex-end",
  },
  tipMockupDark: {
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  actionsGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    minHeight: 120,
    justifyContent: "center",
  },
  actionCardBlue: {
    backgroundColor: "#E3F2FD",
  },
  actionCardOrange: {
    backgroundColor: "#FFF3E0",
  },
  actionCardGreen: {
    backgroundColor: "#E8F5E8",
  },
  actionCardPink: {
    backgroundColor: "#FCE4EC",
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;
