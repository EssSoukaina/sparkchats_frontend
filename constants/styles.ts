import { StyleSheet } from "react-native";

export const Colors = {
  primary: "#6b7280",
  secondary: "#6B7280",
  background: "#FFFFFF",
  textDark: "#111827",
  textMedium: "#374151",
  border: "#F3F4F6",
  progressBar: "#E5E7EB",
};

export const SharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  progressContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    color: Colors.secondary,
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});