import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MarketingScreen = () => {
  const [currentView, setCurrentView] = useState<
    "main" | "templates" | "campaigns"
  >("main");
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchText, setSearchText] = useState("");

  const campaignTabs = ["All", "Sent", "Sending", "Failed"];
  const templateTabs = ["All", "Marketing", "Utility"];

  const campaigns = [
    {
      id: 1,
      name: "Spring Sale 2025",
      status: "Sent",
      sentDate: "Sent Messages: 2,458",
      clickRate: "Click Rate: 12.4%",
      openRate: "Open Rate: 45%",
      color: "#E8F5E8",
    },
    {
      id: 2,
      name: "Summer Launch Teaser",
      status: "Active",
      sentDate: "Sent Messages: 890",
      clickRate: "Click Rate: 8.2%",
      openRate: "Open Rate: 32%",
      color: "#E3F2FD",
    },
    {
      id: 3,
      name: "New Year Promo Blast",
      status: "Completed",
      sentDate: "Sent Messages: 3,156",
      clickRate: "Click Rate: 15.7%",
      openRate: "Open Rate: 52%",
      color: "#F3E5F5",
    },
    {
      id: 4,
      name: "Flash Sale Reminder",
      status: "Scheduled",
      sentDate: "Scheduled: 1,890",
      clickRate: "Click Rate: -",
      openRate: "Open Rate: -",
      color: "#FFF3E0",
    },
  ];

  const templates = [
    {
      id: 1,
      title: "Limited Time Offer",
      description:
        "Check out our latest offer! Enjoy a 20% discount on all products for a limited time. Don't miss out - shop now! 🛒",
      type: "Marketing",
    },
  ];

  const renderMainView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.proBadge}>
          <Text style={styles.proText}>Pro</Text>
        </View>
      </View>

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
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );

  const renderTemplatesView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.proBadge}>
          <Text style={styles.proText}>Pro</Text>
        </View>
      </View>

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
            placeholder="Quickly find a campaign by name or status"
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

        {/* Template Card */}
        <View style={styles.templateCard}>
          <View style={styles.templateHeader}>
            <Text style={styles.templateTitle}>Limited Time Offer</Text>
            <View style={styles.templateToggle}>
              <View style={styles.toggleSwitch} />
            </View>
          </View>
          <Text style={styles.templateDescription}>
            "Check out our latest offer! Enjoy a 20% discount on all products
            for a limited time. Don't miss out - shop now! 🛒"
          </Text>
        </View>
      </View>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );

  const renderCampaignsView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.proBadge}>
          <Text style={styles.proText}>Pro</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.campaignButton]}>
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

        {/* Campaign Cards */}
        {campaigns.map((campaign) => (
          <View
            key={campaign.id}
            style={[styles.campaignCard, { backgroundColor: campaign.color }]}
          >
            <View style={styles.campaignCardHeader}>
              <Text style={styles.campaignName}>{campaign.name}</Text>
              <View style={styles.campaignActions}>
                <TouchableOpacity style={styles.campaignAction}>
                  <Text style={styles.campaignActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.campaignAction}>
                  <Ionicons name="trash" size={16} color="#E91E63" />
                  <Text
                    style={[styles.campaignActionText, { color: "#E91E63" }]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.campaignAction}>
                  <Text
                    style={[styles.campaignActionText, { color: "#2196F3" }]}
                  >
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.campaignStats}>
              <Text style={styles.campaignStat}>{campaign.sentDate}</Text>
              <Text style={styles.campaignStat}>{campaign.clickRate}</Text>
              <Text style={styles.campaignStat}>{campaign.openRate}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
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
  header: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  headerLogo: {
    height: 40,
    width: 150,
  },
  proBadge: {
    backgroundColor: "#4CA64C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  proText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  titleSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
  templateCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  templateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  templateToggle: {
    width: 40,
    height: 24,
    backgroundColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleSwitch: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  templateDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
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
  campaignCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  campaignCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  campaignActions: {
    flexDirection: "row",
    gap: 15,
  },
  campaignAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  campaignActionText: {
    fontSize: 12,
    color: "#666",
  },
  campaignStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  campaignStat: {
    fontSize: 12,
    color: "#666",
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
