import { StyleSheet } from "react-native";

export const Colors = {
  // Primary Colors
  primary: "#4CA64C",           // Primary Accent Color (75,166,76)
  secondary: "#008001",         // Secondary Accent Color (0,128,1)
  
  // Background Colors
  background: "#FBFBFB",        // Main Background (251,251,251)
  backgroundSecondary: "#E0EEE5", // Secondary Background (224,238,229)
  backgroundAccent: "#E6F2E5",  // Background Color (230,242,229)
  pageBackground: "#F5F5F5",    // Page Background (245,245,245)
  
  // Text Colors
  textPrimary: "#333333",       // Primary Text (51,51,51)
  textSecondary: "#555555",     // Secondary Text (85,85,85)
  textTertiary: "#777777",      // Tertiary Text (119,119,119)
  textDark: "#024736",          // Text and Icons (2,71,54)
  
  // UI Elements
  border: "#AAAAAA",            // Dividers & Borders (170,170,170)
  backgroundElements: "#DDDDDD", // Background Elements (221,221,221)
  
  // Status Colors
  success: "#4BA64C",
  error: "#DC3545",
  warning: "#FFC107",
  info: "#17A2B8",
  
  // White and transparent
  white: "#FFFFFF",
  transparent: "transparent",
};

export const SharedStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },
  
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },
  
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  
  // Progress and Header Styles
  progressContainer: {
    marginBottom: 32,
  },
  
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  
  // Typography Styles
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 8,
    textAlign: "center",
  },
  
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 16,
  },
  
  bodyText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  
  captionText: {
    fontSize: 14,
    color: Colors.textTertiary,
    lineHeight: 18,
  },
  
  // Button Styles
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: Colors.textDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  secondaryButton: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  outlineButton: {
    backgroundColor: Colors.transparent,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  
  // Button Text Styles
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  
  secondaryButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  
  outlineButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  
  linkText: {
    color: Colors.secondary,
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  
  // Input Styles
  inputContainer: {
    marginBottom: 24,
  },
  
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textDark,
    marginBottom: 8,
  },
  
  inputWrapper: {
    position: "relative",
  },
  
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  textInputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  
  // Card Styles
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.textDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.backgroundElements,
  },
  
  cardAccent: {
    backgroundColor: Colors.backgroundAccent,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  
  // List Styles
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundElements,
  },
  
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  
  // Icon Styles
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  
  primaryIcon: {
    color: Colors.primary,
  },
  
  secondaryIcon: {
    color: Colors.textSecondary,
  },
  
  // Spacing Utilities
  marginBottom8: {
    marginBottom: 8,
  },
  
  marginBottom16: {
    marginBottom: 16,
  },
  
  marginBottom24: {
    marginBottom: 24,
  },
  
  marginBottom32: {
    marginBottom: 32,
  },
  
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
  
  paddingHorizontal24: {
    paddingHorizontal: 24,
  },
  
  // Layout Utilities
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Separator Styles
  separator: {
    height: 1,
    backgroundColor: Colors.backgroundElements,
    marginVertical: 16,
  },
  
  // Bottom Section Styles
  bottomSection: {
    padding: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundElements,
  },
  
  // Status Styles
  successContainer: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  
  successText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  
  errorContainer: {
    backgroundColor: Colors.error,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  
  errorText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  
  // Modal/Overlay Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(2, 71, 54, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    minWidth: 280,
    shadowColor: Colors.textDark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
});