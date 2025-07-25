import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Colors from your shared styles
const Colors = {
  primary: "#4CA64C",
  secondary: "#008001",
  background: "#FBFBFB",
  backgroundSecondary: "#E0EEE5",
  backgroundAccent: "#E6F2E5",
  pageBackground: "#F5F5F5",
  textPrimary: "#333333",
  textSecondary: "#555555",
  textTertiary: "#777777",
  textDark: "#024736",
  border: "#AAAAAA",
  backgroundElements: "#DDDDDD",
  white: "#FFFFFF",
  transparent: "transparent",
};
const router = useRouter();
const ContactSelectionScreen = () => {
  const [selectedContacts, setSelectedContacts] = useState(
    new Set([1, 2, 4, 5])
  ); // Pre-selected some contacts
  const [filterField, setFilterField] = useState("phone number");
  const [filterCondition, setFilterCondition] = useState("contains");
  const [filterText, setFilterText] = useState("");

  const contacts = [
    { id: 1, name: "Sarah Johnson", phone: "555123456" },
    { id: 2, name: "Michael Chen", phone: "555234567" },
    { id: 3, name: "Emma Wilson", phone: "555345678" },
    { id: 4, name: "David Brown", phone: "555456789" },
    { id: 5, name: "Lisa Garcia", phone: "555567890" },
    { id: 6, name: "James Davis", phone: "555678901" },
  ];
  const toggleContact = (contactId: number) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.pageBackground}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>select contact</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            router.push("/sendcampaign"); // Replace with your actual route path
          }}
        >
          <Text style={styles.nextButtonText}>next</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Audience Selection */}
          <Text style={styles.sectionTitle}>choose your audience</Text>
          <TouchableOpacity style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>all contacts</Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>

          {/* Filter Section */}
          <Text style={styles.filterLabel}>add filter</Text>
          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterDropdown, { flex: 1.2 }]}>
              <Text style={styles.filterDropdownText}>{filterField}</Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterDropdown, { flex: 1 }]}>
              <Text style={styles.filterDropdownText}>{filterCondition}</Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>

            <TextInput
              style={[styles.filterInput, { flex: 0.8 }]}
              placeholder="text"
              placeholderTextColor={Colors.textTertiary}
              value={filterText}
              onChangeText={setFilterText}
            />
          </View>

          <TouchableOpacity style={styles.saveSegmentButton}>
            <Text style={styles.saveSegmentText}>save segment</Text>
          </TouchableOpacity>

          {/* Contacts List */}
          {contacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactItem}
              onPress={() => toggleContact(contact.id)}
            >
              <View style={styles.contactInfo}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="person" size={24} color={Colors.white} />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.radioButton,
                  selectedContacts.has(contact.id) &&
                    styles.radioButtonSelected,
                ]}
              >
                {selectedContacts.has(contact.id) && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  contentContainer: {
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundElements,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textTertiary,
  },

  nextButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },

  nextButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 12,
  },

  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },

  dropdownText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },

  filterLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },

  filterDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  filterDropdownText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },

  filterInput: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  saveSegmentButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },

  saveSegmentText: {
    fontSize: 14,
    color: Colors.secondary,
    textDecorationLine: "underline",
  },

  infoContainer: {
    backgroundColor: Colors.backgroundAccent,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },

  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },

  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.textDark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.backgroundElements,
  },

  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.textTertiary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  contactDetails: {
    flex: 1,
  },

  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 2,
  },

  contactPhone: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  // Radio Button Styles
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },

  radioButtonSelected: {
    borderColor: Colors.primary,
  },

  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});

export default ContactSelectionScreen;
