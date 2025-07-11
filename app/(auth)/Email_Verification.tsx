import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const VerifyEmailScreen = () => {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");

  const email = signUp?.emailAddress || "your email";

  useEffect(() => {
    // Auto-focus the input when component mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVerify = async () => {
    if (!signUp) return;

    try {
      setLoading(true);
      setError(""); // Clear any previous errors
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });

      // Step 1: Navigate to the connected screen
      router.replace("/(auth)/connected");

      // Step 2: Wait 5 seconds, then redirect again
      setTimeout(() => {
        router.replace("/OnboardingQ1");
      }, 5000);
    } catch (err: any) {
      setError("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!signUp) return;

    try {
      setResendLoading(true);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      alert("Verification code resent successfully!");
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setResendLoading(false);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Email Illustration at the top */}
        <Image
          source={require("../../assets/images/email.png")}
          style={styles.emailIllustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Verify Your Email Address</Text>

        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>
            A verification code has been sent to your email:
          </Text>
          <Text style={styles.emailAddress}>{email}</Text>
        </View>

        <Text style={styles.instructions}>
          Enter the 6-digit code below to verify your account
        </Text>

        {/* Verification Code Input */}
        <TouchableOpacity
          style={styles.codeInputContainer}
          onPress={focusInput}
          activeOpacity={1}
        >
          {[0, 1, 2].map((index) => (
            <View
              key={`first-${index}`}
              style={[styles.codeBox, code[index] && styles.filledCodeBox]}
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
              style={[styles.codeBox, code[index] && styles.filledCodeBox]}
            >
              <Text style={styles.codeDigit}>{code[index] || ""}</Text>
            </View>
          ))}
        </TouchableOpacity>

        {/* Error message - shown only when there's an error */}
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
          onPress={() => router.back()}
          style={styles.changeEmailButton}
        >
          <Text style={styles.changeEmailText}>Change Email Address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Hidden input for keyboard - positioned outside ScrollView */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={(text) => {
          setCode(text.replace(/[^0-9]/g, "").substring(0, 6));
          setError(""); // Clear error when user types
        }}
        style={styles.hiddenInput}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus={true}
        caretHidden={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
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
    textAlign: "center",
    width: "100%",
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    paddingVertical: 10,
  },
  codeBox: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: "#AAAAAA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    marginHorizontal: 4,
  },
  filledCodeBox: {
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
    top: -1000,
    left: -1000,
    width: 1,
    height: 1,
    opacity: 0,
  },
  resendButton: {
    marginBottom: 24,
    paddingVertical: 8,
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
  changeEmailButton: {
    marginBottom: 40,
    paddingVertical: 8,
  },
  changeEmailText: {
    color: "#777777",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default VerifyEmailScreen;
