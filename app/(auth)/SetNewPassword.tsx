import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  Modal,
} from "react-native";
import { useSignIn, useAuth } from "@clerk/clerk-expo";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const SetNewPasswordScreen = () => {
  const { signIn, setActive } = useSignIn();
  const { signOut } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const email = (params.email as string) || "";

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    return "";
  };

  const handleResetPassword = async () => {
    if (!signIn) {
      setError("Unable to reset password: No sign-in state found.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Complete the password reset step
      await signIn.resetPassword({
        password: newPassword,
      });

      // Show success modal (don't auto-login)
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error("Password Reset Error:", err);
      const message =
        err.errors?.[0]?.message ||
        "Failed to reset password. Please try again.";
      setError(message);
      Alert.alert("Reset Failed", message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = async () => {
    try {
      setShowSuccessModal(false);

      // Clear any existing session/signIn state
      await signOut();

      // Small delay to ensure state is cleared
      setTimeout(() => {
        // Navigate back to login screen so user can login with new password
        router.replace("/(auth)/login"); // Adjust to your login route
      }, 100);
    } catch (error) {
      console.error("Error clearing session:", error);
      // Still navigate even if signOut fails
      router.replace("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/lock-refresh.png")}
        style={styles.lockIllustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>Set a New Password</Text>
      <Text style={styles.description}>
        Enter a new password for your account.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>New Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              setError("");
            }}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <MaterialIcons
              name={showNewPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#AAAAAA"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Re-enter new password"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError("");
            }}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialIcons
              name={showConfirmPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#AAAAAA"
            />
          </TouchableOpacity>
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Password must contain:</Text>
        <Text style={styles.requirementText}>• At least 8 characters</Text>
        <Text style={styles.requirementText}>• One uppercase letter</Text>
        <Text style={styles.requirementText}>• One lowercase letter</Text>
        <Text style={styles.requirementText}>• One number</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.resetButton,
          (loading || !newPassword || !confirmPassword) &&
            styles.disabledButton,
        ]}
        onPress={handleResetPassword}
        disabled={loading || !newPassword || !confirmPassword}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.resetButtonText}>Reset Password</Text>
        )}
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <MaterialIcons name="check" size={32} color="white" />
            </View>

            <Text style={styles.modalTitle}>Successfully Overlay</Text>

            <Text style={styles.modalDescription}>
              Your password has been successfully changed.{"\n"}
              You can now log in with your new password.
            </Text>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLoginPress}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  lockIllustration: {
    width: 120,
    height: 120,
    marginBottom: 24,
    marginTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    color: "#E57373",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 16,
    alignSelf: "flex-start",
    width: "100%",
  },
  requirementsContainer: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 4,
  },
  resetButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#4CA64C",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  disabledButton: {
    opacity: 0.6,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
  },
  successIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CA64C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
  loginButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#4CA64C",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SetNewPasswordScreen;
