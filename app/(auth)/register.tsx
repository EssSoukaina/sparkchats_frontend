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
  ScrollView,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { Stack, useRouter } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const Register = () => {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // OAuth Sign-Up
  const handleOAuthSignUp = async (
    strategy: "oauth_google" | "oauth_facebook"
  ) => {
    if (!isLoaded) {
      Alert.alert("Error", "Clerk not initialized");
      return;
    }

    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl:
          "https://app_2upOjZekE8xIXBF2OEvpf6DYwgI.clerk.dev/oauth/callback",
        redirectUrlComplete: "http://localhost:8081/OnboardingQ1",
      });
    } catch (err: any) {
      console.error("OAuth Error:", JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "OAuth sign up failed");
    }
  };

  // Email/Password Sign-Up
  const onSignUpPress = async () => {
    if (!isLoaded || !agreedToTerms) {
      Alert.alert(
        "Error",
        !isLoaded ? "Clerk not initialized" : "You must agree to the terms"
      );
      return;
    }

    try {
      setLoading(true);
      const result = await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
          fullName: fullName,
        },
      });

      console.log("SignUp Result:", result);

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Redirect to verification page
      router.push("/(auth)/Email_Verification");
    } catch (err: any) {
      console.error("SignUp Error:", JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Spinner visible={loading} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Create Your Account</Text>

        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#A0A0A0"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          autoCapitalize="words"
        />

        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          placeholder="e.g. example@example.com"
          placeholderTextColor="#A0A0A0"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            {agreedToTerms ? (
              <View style={styles.checkedBox}>
                <AntDesign name="check" size={14} color="white" />
              </View>
            ) : (
              <View style={styles.uncheckedBox} />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            I agree to the{" "}
            <Text style={styles.termsText}>Terms & Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            !agreedToTerms && styles.disabledButton,
          ]}
          onPress={onSignUpPress}
          disabled={loading || !agreedToTerms}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or sign up with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleOAuthSignUp("oauth_google")}
          >
            <Image
              source={require("../../assets/images/google_logo.png")} // Update path to your actual image
              style={styles.googleLogo}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleOAuthSignUp("oauth_facebook")}
          >
            <Image
              source={require("../../assets/images/fb_logo.png")}
              style={styles.socialLogo}
            />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("./login")}>
            <Text style={styles.loginLink}>Log in here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 32,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 24,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555555",
    marginBottom: 8,
  },
  input: {
    width: 330,
    height: 48,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    fontSize: 14,
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
    width: 330,
    alignSelf: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  uncheckedBox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 4,
  },
  checkedBox: {
    width: 18,
    height: 18,
    backgroundColor: "#4CA64C",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 14,
    color: "#777777",
  },
  termsText: {
    color: "#008000",
    fontWeight: 500,
  },
  primaryButton: {
    width: 330,
    height: 48,
    backgroundColor: "#4CA64C",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    alignSelf: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    width: 330,
    alignSelf: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#AAAAAA",
  },
  dividerText: {
    fontSize: 14,
    color: "#AAAAAA",
    paddingHorizontal: 12,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    width: 330,
    alignSelf: "center",
  },
  googleLogo: {
    width: 18,
    height: 18,
    marginRight: 8, // Add some spacing between logo and text
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 6,
    backgroundColor: "#F6F6F6",
  },
  socialLogo: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: "contain",
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#555555",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#555555",
    fontWeight: 500,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#008000",
  },
});

export default Register;
