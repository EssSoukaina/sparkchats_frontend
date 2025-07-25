import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const MarketingScreen = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<
    "main" | "templates" | "campaigns"
  >("main");
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchText, setSearchText] = useState("");

  const campaignTabs = ["All", "Sent", "Sending", "Failed"];
  const templateTabs = ["All", "Marketing", "Utility"];

  const navigateToCreateCampaign = () => {
    if (currentView === "campaigns") {
      router.push("/TemplateSelection"); // Update to your actual Select Template route
    } else {
      router.push("/(testaicompaign)/AICampaignCreator");
    }
  };

  const renderMainView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.pageTitle}>Marketing Campaigns</Text>
        <Text style={styles.pageSubtitle}>
          Create, track, and optimize your WhatsApp marketing campaigns
          effortlessly.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.campaignButton]}
          onPress={() => setCurrentView("campaigns")}
        >
          <Ionicons name="megaphone" size={24} color="#2196F3" />
          <Text style={styles.actionButtonText}>Campaign</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.templateButton]}
          onPress={() => setCurrentView("templates")}
        >
          <Ionicons name="copy" size={24} color="#FF9800" />
          <Text style={styles.actionButtonText}>Template</Text>
        </TouchableOpacity>
      </View>

      {/* Campaigns Section */}
      <View style={styles.campaignsSection}>
        <Text style={styles.sectionTitle}>Campaigns</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Quickly find a campaign by name or status"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {campaignTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="time" size={60} color="#ccc" />
          </View>
          <Text style={styles.emptyTitle}>No campaign history</Text>
        </View>
      </View>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={navigateToCreateCampaign}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );

  const renderTemplatesView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.pageTitle}>Manage Your Marketing Campaigns</Text>
        <Text style={styles.pageSubtitle}>
          Create, track, and optimize your WhatsApp marketing campaigns
          effortlessly.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.campaignButton]}
          onPress={() => setCurrentView("campaigns")}
        >
          <Ionicons name="megaphone" size={24} color="#2196F3" />
          <Text style={styles.actionButtonText}>Campaign</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.templateButton,
            styles.templateButtonActive,
          ]}
        >
          <Ionicons name="copy" size={24} color="#FF9800" />
          <Text style={styles.actionButtonText}>Template</Text>
        </TouchableOpacity>
      </View>

      {/* Select Template Section */}
      <View style={styles.campaignsSection}>
        <Text style={styles.sectionTitle}>Select Template</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Quickly find a template by name or type"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>

        {/* Template Tabs */}
        <View style={styles.tabs}>
          {templateTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="document-text" size={60} color="#ccc" />
          </View>
          <Text style={styles.emptyTitle}>No templates available</Text>
        </View>
      </View>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={navigateToCreateCampaign}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );

  const renderCampaignsView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.pageTitle}>Marketing Campaigns</Text>
        <Text style={styles.pageSubtitle}>
          Create, track, and optimize your WhatsApp marketing campaigns
          effortlessly.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.campaignButton]}
          onPress={navigateToCreateCampaign}
        >
          <Ionicons name="megaphone" size={24} color="#2196F3" />
          <Text style={styles.actionButtonText}>Campaign</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.templateButton]}
          onPress={() => setCurrentView("templates")}
        >
          <Ionicons name="copy" size={24} color="#FF9800" />
          <Text style={styles.actionButtonText}>Template</Text>
        </TouchableOpacity>
      </View>

      {/* Campaigns Section */}
      <View style={styles.campaignsSection}>
        <Text style={styles.sectionTitle}>Campaigns</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Quickly find a campaign by name or status"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>

        {/* Campaign Status Tabs */}
        <View style={styles.campaignTabs}>
          <TouchableOpacity style={styles.campaignTab}>
            <Text style={styles.campaignTabText}>Total</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.campaignTab}>
            <Text style={styles.campaignTabText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.campaignTab}>
            <Text style={styles.campaignTabText}>Scheduled</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.campaignTab}>
            <Text style={styles.campaignTabText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.campaignTab}>
            <Text style={styles.campaignTabText}>Failed</Text>
          </TouchableOpacity>
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="megaphone" size={60} color="#ccc" />
          </View>
          <Text style={styles.emptyTitle}>No campaigns available</Text>
        </View>
      </View>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={navigateToCreateCampaign}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <>
      {currentView === "main" && renderMainView()}
      {currentView === "templates" && renderTemplatesView()}
      {currentView === "campaigns" && renderCampaignsView()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  titleSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  campaignButton: {
    backgroundColor: "#E3F2FD",
  },
  templateButton: {
    backgroundColor: "#FFF3E0",
  },
  templateButtonActive: {
    borderWidth: 2,
    borderColor: "#FF9800",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  campaignsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 30,
    gap: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CA64C",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#4CA64C",
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },
  campaignTabs: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  campaignTab: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  campaignTabText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CA64C",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});

export default MarketingScreen;
