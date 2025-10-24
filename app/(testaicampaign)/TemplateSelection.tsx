import { router } from "expo-router";
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

const TemplateSelectionScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = () => {
    const current = templates.find((t) => t.id === selectedTemplate);
    if (!current) return; // Prevent navigation if no template selected

    router.push({
      pathname: "/ContactSelection",
      params: { selectedTemplate: JSON.stringify(current) },
    });
  };

  const templates = [
    {
      id: 1,
      title: "Winter Collection Launch",
      description:
        "Introducing our latest winter collection with premium quality materials and trendy designs.",
      category: "fashion",
      date: "Mar 15, 2025",
    },
    {
      id: 2,
      title: "Spring Sale Campaign",
      description:
        "Limited time offer on selected items with up to 50% discount on premium products.",
      category: "promotion",
      date: "Mar 12, 2025",
    },
    {
      id: 3,
      title: "Product Announcement",
      description:
        "Exciting news about our upcoming product launch with innovative features.",
      category: "announcement",
      date: "Mar 10, 2025",
    },
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchText.toLowerCase()) ||
      template.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.pageBackground}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>select template</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>next</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <Ionicons
                name="search"
                size={20}
                color={Colors.textTertiary}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search template"
                placeholderTextColor={Colors.textTertiary}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          {/* Create New Template Button */}
          <TouchableOpacity style={styles.createNewButton}>
            <Ionicons name="add" size={24} color={Colors.primary} />
            <View style={styles.createNewContent}>
              <Text style={styles.createNewTitle}>create new template</Text>
              <Text style={styles.createNewSubtitle}>
                start with new template for your campaign
              </Text>
            </View>
          </TouchableOpacity>

          {/* Templates List */}
          {filteredTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={[
                styles.templateCard,
                selectedTemplate === template.id && styles.templateCardSelected,
              ]}
              onPress={() => setSelectedTemplate(template.id)}
            >
              <View style={styles.templateHeader}>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{template.category}</Text>
                </View>
                <View style={styles.templateMeta}>
                  <Text style={styles.templateDate}>{template.date}</Text>
                  <View
                    style={[
                      styles.radioButton,
                      selectedTemplate === template.id &&
                        styles.radioButtonSelected,
                    ]}
                  >
                    {selectedTemplate === template.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </View>
              </View>

              <Text style={styles.templateTitle}>{template.title}</Text>
              <Text style={styles.templateDescription}>
                {template.description}
              </Text>
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

  // Search Styles
  searchContainer: {
    marginBottom: 32,
  },

  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },

  searchIcon: {
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.textPrimary,
  },

  // Create New Template Styles
  createNewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundAccent,
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: "dashed",
  },

  createNewContent: {
    marginLeft: 16,
    flex: 1,
  },

  createNewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },

  createNewSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  // Template Card Styles
  templateCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.backgroundElements,
    shadowColor: Colors.textDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  templateCardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.backgroundAccent,
  },

  templateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  categoryTag: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  categoryText: {
    fontSize: 12,
    color: Colors.textDark,
    fontWeight: "500",
  },

  templateMeta: {
    flexDirection: "row",
    alignItems: "center",
  },

  templateDate: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginRight: 12,
  },

  templateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 8,
  },

  templateDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
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

export default TemplateSelectionScreen;
