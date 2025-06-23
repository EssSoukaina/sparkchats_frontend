import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
      router.replace("../(tabs)/ImportContacts.tsx"); ///////////////////////////////../(tabs)/home.tsx
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (
    strategy: "oauth_google" | "oauth_facebook"
  ) => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "https://your-app-oauth-callback",
        redirectUrlComplete: "https://your-app-redirect",
      });
    } catch (err: any) {
      alert(err.errors?.[0]?.message || "Authentication failed");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>

      <Text style={styles.inputLabel}>Email Address</Text>
      <TextInput
        placeholder="Ex: user@example.com"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
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

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <View style={rememberMe ? styles.checkedBox : styles.uncheckedBox}>
            {rememberMe && <AntDesign name="check" size={14} color="white" />}
          </View>
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember Me</Text>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => router.push("/(auth)/ForgotPassword")}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleOAuthSignIn("oauth_google")}
        >
          <Image
            source={require("../../assets/images/google_logo.png")} // Update path to your actual image
            style={styles.googleLogo}
          />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleOAuthSignIn("oauth_facebook")}
        >
          <Image
            source={require("../../assets/images/fb_logo.png")}
            style={styles.socialLogo}
          />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("./register")}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 40,
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
    textAlign: "center",
    marginBottom: 70,
  },
  subtitle: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 32,
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
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    width: 330,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  uncheckedBox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 4,
    marginRight: 8,
  },
  checkedBox: {
    width: 18,
    height: 18,
    backgroundColor: "#4CA64C",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
    color: "#777777",
    marginRight: "auto",
  },
  forgotPasswordButton: {
    marginLeft: "auto",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#4CA64C",
    fontWeight: "500",
  },
  signInButton: {
    width: 330,
    height: 48,
    backgroundColor: "#4CA64C",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    alignSelf: "center",
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
  googleLogo: {
    width: 18,
    height: 18,
    marginRight: 8, // Add some spacing between logo and text
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#555555",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signUpText: {
    fontSize: 14,
    color: "#555555",
    fontWeight: 500,
  },
  signUpLink: {
    fontSize: 14,
    color: "#008000",
    fontWeight: "600",
  },
});
