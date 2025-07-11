import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsItemLeft}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={20} color="#333" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Ionicons name="chevron-forward" size={16} color="#999" />
  </TouchableOpacity>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();

  const handlePress = (item: string) => {
    switch (item) {
      case "Profile Information":
        router.push("../(settings)/profile-information");
        break;
      case "Change Password":
        router.push("../(settings)/change-password");
        break;
      case "Push Notifications":
        // Navigate to push notifications settings
        console.log("Navigate to Push Notifications");
        break;
      case "Campaign Updates":
        // Navigate to campaign updates settings
        console.log("Navigate to Campaign Updates");
        break;
      case "Upgrade Now":
        // Navigate to upgrade/subscription page
        console.log("Navigate to Upgrade");
        break;
      case "Language":
        // Navigate to language settings
        router.push("../(settings)/language");
        break;
      case "Theme":
        // Navigate to theme settings
        router.push("../(settings)/theme");
        break;
      case "Export Reports":
        // Handle export reports
        console.log("Export Reports");
        break;
      case "Storage Usage":
        // Navigate to storage usage
        console.log("Navigate to Storage Usage");
        break;
      case "Clear Cache":
        // Handle clear cache
        console.log("Clear Cache");
        break;
      case "Help Center":
        // Navigate to help center
        console.log("Navigate to Help Center");
        break;
      case "Contact Us":
        // Navigate to contact us
        console.log("Navigate to Contact Us");
        break;
      default:
        console.log(`Pressed: ${item}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Section title="Account">
          <SettingsItem
            icon="person-outline"
            title="Profile Information"
            subtitle="Edit name, and profile photo"
            onPress={() => handlePress("Profile Information")}
          />
          <SettingsItem
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Update your current password"
            onPress={() => handlePress("Change Password")}
          />
        </Section>

        <Section title="Notifications">
          <SettingsItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Enable or disable alerts"
            onPress={() => handlePress("Push Notifications")}
          />
          <SettingsItem
            icon="megaphone-outline"
            title="Campaign Updates"
            subtitle="Get notified when a campaign is delivered or fails"
            onPress={() => handlePress("Campaign Updates")}
          />
        </Section>

        <Section title="Upgrade Plan">
          <SettingsItem
            icon="arrow-up-circle-outline"
            title="Upgrade Now"
            subtitle="Unlock more features like unlimited campaigns, advanced analytics"
            onPress={() => handlePress("Upgrade Now")}
          />
        </Section>

        <Section title="App Preferences">
          <SettingsItem
            icon="language-outline"
            title="Language"
            subtitle="English, Arabic, French"
            onPress={() => handlePress("Language")}
          />
          <SettingsItem
            icon="color-palette-outline"
            title="Theme"
            subtitle="Light / Dark / System Default"
            onPress={() => handlePress("Theme")}
          />
        </Section>

        <Section title="Reports & Storage">
          <SettingsItem
            icon="document-text-outline"
            title="Export Reports"
            subtitle="Download message & campaign data"
            onPress={() => handlePress("Export Reports")}
          />
          <SettingsItem
            icon="server-outline"
            title="Storage Usage"
            subtitle="View and manage app data"
            onPress={() => handlePress("Storage Usage")}
          />
          <SettingsItem
            icon="refresh-outline"
            title="Clear Cache"
            subtitle="Free up space"
            onPress={() => handlePress("Clear Cache")}
          />
        </Section>

        <Section title="Support">
          <SettingsItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="FAQs"
            onPress={() => handlePress("Help Center")}
          />
          <SettingsItem
            icon="mail-outline"
            title="Contact Us"
            subtitle="Chat or Email"
            onPress={() => handlePress("Contact Us")}
          />
        </Section>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginHorizontal: 16,
  },
  sectionContent: {
    backgroundColor: "#C7C9CDCC",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
});
