import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "react-native";
import type { ClerkAPIError } from "@clerk/types";
import { Colors, SharedStyles } from "../../constants/styles"; // Import shared styles

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const handleUpdatePassword = async () => {
    if (!user) {
      Alert.alert("Error", "User not found. Please try logging in again.");
      return;
    }

    if (!currentPassword.trim()) {
      Alert.alert("Error", "Please enter your current password");
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Error", "New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert(
        "Error",
        "New password must be different from current password"
      );
      return;
    }

    // Show success overlay immediately when button is clicked
    setShowSuccessOverlay(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessOverlay(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  const PasswordIcon = () => (
    <View style={SharedStyles.iconContainer}>
      <Image
        source={require("../../assets/images/lock-refresh.png")}
        style={styles.lockImage}
        resizeMode="contain"
      />
    </View>
  );

  const SuccessOverlay = () => (
    <Modal
      visible={showSuccessOverlay}
      transparent={true}
      animationType="fade"
      onRequestClose={handleSuccessClose}
    >
      <View style={SharedStyles.modalOverlay}>
        <View style={SharedStyles.modalContent}>
          <View style={SharedStyles.iconContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={40} color={Colors.white} />
            </View>
          </View>

          <Text style={SharedStyles.title}>Success!</Text>
          <Text style={[SharedStyles.subtitle, SharedStyles.marginBottom32]}>
            Your password has been updated successfully!
          </Text>

          <TouchableOpacity
            style={SharedStyles.primaryButton}
            onPress={handleSuccessClose}
          >
            <Text style={SharedStyles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={SharedStyles.safeAreaContainer}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={SharedStyles.scrollContainer}
      >
        <View style={SharedStyles.contentContainer}>
          {/* Icon Section */}
          <View style={SharedStyles.headerSection}>
            <PasswordIcon />
          </View>

          {/* Title */}
          <Text style={SharedStyles.title}>Change Password</Text>

          {/* Current Password Field */}
          <View style={SharedStyles.inputContainer}>
            <Text style={SharedStyles.inputLabel}>Current Password</Text>
            <View style={SharedStyles.inputWrapper}>
              <TextInput
                style={SharedStyles.textInput}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter your password"
                placeholderTextColor={Colors.textTertiary}
                secureTextEntry={!showCurrentPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons
                  name={showCurrentPassword ? "eye-off" : "eye"}
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password Field */}
          <View style={SharedStyles.inputContainer}>
            <Text style={SharedStyles.inputLabel}>New Password</Text>
            <View style={SharedStyles.inputWrapper}>
              <TextInput
                style={SharedStyles.textInput}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor={Colors.textTertiary}
                secureTextEntry={!showNewPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View style={SharedStyles.inputContainer}>
            <Text style={SharedStyles.inputLabel}>Confirm Password</Text>
            <View style={SharedStyles.inputWrapper}>
              <TextInput
                style={SharedStyles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter new password"
                placeholderTextColor={Colors.textTertiary}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={SharedStyles.bottomSection}>
        <TouchableOpacity
          style={SharedStyles.primaryButton}
          onPress={handleUpdatePassword}
        >
          <Text style={SharedStyles.primaryButtonText}>Update Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={SharedStyles.secondaryButton}
          onPress={handleBack}
        >
          <Text style={SharedStyles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Success Overlay */}
      <SuccessOverlay />
    </SafeAreaView>
  );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  lockImage: {
    width: 80,
    height: 80,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
    padding: 4,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success,
    justifyContent: "center",
    alignItems: "center",
  },
});
