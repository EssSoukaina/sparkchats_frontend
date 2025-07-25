import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles"; // Adjust path as needed

interface Statistic {
  icon: string;
  label: string;
  value: string | number;
}

interface Contact {
  name: string;
  phone: string;
  sentAt: string;
}

const CampaignStatistics = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [campaignStatus, setCampaignStatus] = useState<string>("Completed");

  const tabs: string[] = ["All", "Delivered", "Read", "Failed"];

  const statistics: Statistic[] = [
    {
      icon: "people-outline",
      label: "Audience",
      value: 0,
    },
    {
      icon: "paper-plane-outline",
      label: "Delivered",
      value: 0,
    },
    {
      icon: "checkmark-done-outline",
      label: "Read",
      value: 0,
    },
    {
      icon: "sync-outline",
      label: "Response",
      value: 0,
    },
    {
      icon: "alert-circle-outline",
      label: "Failed",
      value: 0,
    },
    {
      icon: "card-outline",
      label: "Cost",
      value: "$0.0000",
    },
  ];

  const handleGoBack = () => {
    router.back();
  };

  const handleStatusChange = () => {
    // Toggle between different status options if needed
    // For now, keeping it as Completed
    console.log("Navigating to Marketing page...");
    router.push("../(tabs)/marketing");
  };

  // Empty contacts list since no data yet
  const contacts: Contact[] = [];

  const renderStatisticCard = (stat: Statistic, index: number) => (
    <View key={index} style={styles.statCard}>
      <Ionicons name={stat.icon as any} size={20} color={Colors.primary} />
      <Text style={styles.statLabel}>{stat.label}</Text>
      <Text style={styles.statValue}>{stat.value}</Text>
    </View>
  );

  const renderTabButton = (tab: string) => (
    <TouchableOpacity
      key={tab}
      style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text
        style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const renderContactItem = (contact: Contact, index: number) => (
    <View key={index} style={styles.contactItem}>
      <View style={styles.contactAvatar}>
        <Ionicons name="person" size={16} color={Colors.textSecondary} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactPhone}>{contact.phone}</Text>
      </View>
      <Text style={styles.contactTime}>{contact.sentAt}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>campaign statistics</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Campaign Info */}
        <View style={styles.campaignHeader}>
          <Text style={styles.campaignTitle}>Campaign 1</Text>
          <TouchableOpacity
            style={styles.statusButton}
            onPress={handleStatusChange}
          >
            <Ionicons
              name="checkmark"
              size={16}
              color={Colors.primary}
              style={styles.statusIcon}
            />
            <Text style={styles.statusText}>{campaignStatus}</Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.campaignSubtitle}>
          See your campaign statistics here
        </Text>

        {/* Statistics Grid */}
        <View style={styles.statsGrid}>
          {statistics.map((stat, index) => renderStatisticCard(stat, index))}
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>{tabs.map(renderTabButton)}</View>

        {/* Contact List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>Contact</Text>
          <Text style={styles.listHeaderText}>Sent at</Text>
        </View>

        {/* Contact List */}
        <View style={styles.contactsList}>
          {contacts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="document-outline"
                size={48}
                color={Colors.textTertiary}
              />
              <Text style={styles.emptyStateText}>No campaign data yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Campaign statistics will appear here once you send your first
                campaign
              </Text>
            </View>
          ) : (
            contacts.map(renderContactItem)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CampaignStatistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundElements,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.textDark,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  campaignHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    marginBottom: 8,
  },
  campaignTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textDark,
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.backgroundElements,
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  campaignSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginBottom: 32,
    justifyContent: "space-between",
  },
  statCard: {
    width: "32%",
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.backgroundElements,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textDark,
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundElements,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.textDark,
  },
  tabText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.textDark,
    fontWeight: "500",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.backgroundElements,
    marginBottom: 0,
  },
  listHeaderText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.textTertiary,
    textTransform: "uppercase",
  },
  contactsList: {
    backgroundColor: Colors.white,
    minHeight: 200,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundElements,
  },
  contactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.textTertiary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textDark,
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  contactTime: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
