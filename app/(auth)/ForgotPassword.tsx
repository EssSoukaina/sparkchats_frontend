import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignIn, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";

const ForgotPasswordScreen = () => {
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendResetCode = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "Clerk not initialized");
      return;
    }

    if (!email) {
      setError("Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Try to start the password reset flow
      let result;
      try {
        result = await signIn.create({
          identifier: email,
          strategy: "reset_password_email_code",
        });
      } catch (sessionError: any) {
        // If session exists, sign out first and try again
        if (sessionError.errors?.[0]?.code === "session_exists") {
          await signOut();
          result = await signIn.create({
            identifier: email,
            strategy: "reset_password_email_code",
          });
        } else {
          throw sessionError;
        }
      }

      console.log("Reset flow started:", result);

      Alert.alert(
        "Code Sent",
        "A verification code has been sent to your email."
      );

      // Navigate to Verify Identity screen and pass the email
      router.push({
        pathname: "/(auth)/VerifyIdentity",
        params: { email, isPasswordReset: "true" },
      });
    } catch (err: any) {
      console.error("Reset Error:", err);
      const message = err.errors?.[0]?.message || "Something went wrong.";
      setError(message);
      Alert.alert("Reset Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      {/* Email Icon - matches your design */}
      <Image
        source={require("../../assets/images/email.png")}
        style={styles.emailIllustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>Reset Your Password</Text>

      <Text style={styles.description}>
        Enter your email below, and we'll send you a 6-digit verification code
        to reset your password.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Ex. user@example.com"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[
          styles.sendButton,
          (loading || !email) && styles.disabledButton,
        ]}
        onPress={handleSendResetCode}
        disabled={loading || !email}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.sendButtonText}>Send Code</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backToLoginButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
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
  emailIllustration: {
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
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  emailInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    color: "#333333",
  },
  errorText: {
    color: "#E57373",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 16,
    alignSelf: "flex-start",
    width: "100%",
  },
  sendButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#4CA64C",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backToLoginButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#4CA64C",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  backToLoginText: {
    color: "#4CA64C",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ForgotPasswordScreen;
