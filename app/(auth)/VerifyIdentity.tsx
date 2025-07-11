import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const VerifyIdentityScreen = () => {
  const { signIn } = useSignIn();
  const router = useRouter();
  const params = useLocalSearchParams();
  const inputRef = useRef<TextInput>(null);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");

  const email = (params.email as string) || "your email";

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  const handleVerify = async () => {
    if (!signIn) return;

    try {
      setLoading(true);
      setError("");

      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });

      Alert.alert(
        "Verification Successful",
        "Your identity has been verified. You can now set a new password."
      );

      router.push({
        pathname: "/(auth)/SetNewPassword",
        params: { email },
      });
    } catch (err: any) {
      console.error("Verification Error:", err);
      setError("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!signIn) return;

    try {
      setResendLoading(true);
      await signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });

      Alert.alert(
        "Code Resent",
        "A new verification code has been sent to your email."
      );
    } catch (err: any) {
      console.error("Resend Error:", err);
      Alert.alert(
        "Resend Failed",
        err.errors?.[0]?.message || "Failed to resend code."
      );
    } finally {
      setResendLoading(false);
    }
  };

  const focusInput = () => {
    console.log("pressed");
    inputRef.current?.focus();
  };

  const handleExitReset = () => {
    Alert.alert(
      "Exit Reset",
      "Are you sure you want to exit the password reset process?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Exit",
          style: "destructive",
          onPress: () => router.replace("/(auth)/login"),
        },
      ]
    );
  };

  const handleCodeChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "").substring(0, 6);
    setCode(numericText);
    setError("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../../assets/images/email-check.png")}
        style={styles.emailIllustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>Verify Your Identity</Text>

      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>
          We've sent a verification code to your email:
        </Text>
        <Text style={styles.emailAddress}>{email}</Text>
      </View>

      <Text style={styles.instructions}>
        Enter the 6-digit code below to proceed.
      </Text>

      <TouchableOpacity
        style={styles.codeInputWrapper}
        onPress={focusInput}
        activeOpacity={1}
      >
        <View style={styles.codeInputContainer}>
          {[0, 1, 2].map((index) => (
            <View
              key={`first-${index}`}
              style={[
                styles.codeBox,
                code[index] ? styles.codeBoxFilled : null,
              ]}
            >
              <Text style={styles.codeDigit}>{code[index] || ""}</Text>
            </View>
          ))}

          <View style={styles.dashContainer}>
            <MaterialIcons name="horizontal-rule" size={10} color="#AAAAAA" />
          </View>

          {[3, 4, 5].map((index) => (
            <View
              key={`second-${index}`}
              style={[
                styles.codeBox,
                code[index] ? styles.codeBoxFilled : null,
              ]}
            >
              <Text style={styles.codeDigit}>{code[index] || ""}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>

      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleCodeChange}
        style={styles.hiddenInput}
        keyboardType="number-pad"
        maxLength={6}
        caretHidden={true}
        contextMenuHidden={true}
        selectTextOnFocus={false}
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        editable={true}
        importantForAccessibility="yes"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        onPress={handleResendCode}
        disabled={resendLoading}
        style={styles.resendButton}
      >
        {resendLoading ? (
          <ActivityIndicator color="#4CA64C" />
        ) : (
          <Text style={styles.resendText}>Resend Code</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.verifyButton,
          (loading || code.length < 6) && styles.disabledButton,
        ]}
        onPress={handleVerify}
        disabled={loading || code.length < 6}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify & Continue</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleExitReset}
        style={styles.exitResetButton}
      >
        <Text style={styles.exitResetText}>Exit Reset</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginBottom: 30,
    textAlign: "center",
  },
  emailContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  emailText: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginBottom: 4,
  },
  emailAddress: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
  },
  instructions: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    marginBottom: 15,
    fontStyle: "italic",
  },
  errorText: {
    color: "#E57373",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 15,
    textAlign: "left",
    alignSelf: "flex-start",
    width: "100%",
    paddingLeft: 24,
  },
  codeInputWrapper: {
    marginBottom: 32,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  codeBox: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    marginHorizontal: 4,
  },
  codeBoxFilled: {
    borderColor: "#4CA64C",
    backgroundColor: "#F0F8F0",
  },
  dashContainer: {
    marginHorizontal: 8,
  },
  codeDigit: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 40,
    opacity: 0.01,
    zIndex: -1,
  },
  resendButton: {
    marginBottom: 24,
  },
  resendText: {
    color: "#4CA64C",
    fontSize: 16,
    fontWeight: "600",
  },
  verifyButton: {
    width: 330,
    height: 48,
    backgroundColor: "#4CA64C",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  disabledButton: {
    opacity: 0.6,
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  exitResetButton: {
    width: 330,
    height: 48,
    borderWidth: 1,
    borderColor: "#4CA64C",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  exitResetText: {
    color: "#4CA64C",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default VerifyIdentityScreen;
