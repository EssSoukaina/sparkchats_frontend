// app/_layout.tsx
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_cHJvdmVuLXNhaWxmaXNoLTE1LmNsZXJrLmFjY291bnRzLmRldiQ";

// Custom splash screen component
const AppSplashScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    }}
  >
    <Image
      source={require("../assets/images/icon.jpg")}
      style={{ width: "20%", aspectRatio: 1 }}
      resizeMode="contain"
    />
  </View>
);

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  // Show splash screen for 3 seconds
  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(splashTimer);
  }, []);

  // Handle redirect logic based on auth state and route
  useEffect(() => {
    if (!isLoaded || showSplash) return;

    const currentGroup = String(segments[0]);
    const inAuthGroup = currentGroup === "(auth)";

    // All protected route groups that require authentication
    const protectedGroups = [
      "(tabs)",
      "(settings)",
      "(onboarding)",
      "(testaicampaign)",
      "(chats)",
    ];

    // Public route groups that don't require authentication
    const publicGroups = ["(auth)"];

    if (isSignedIn) {
      // User is signed in
      if (inAuthGroup) {
        // Redirect authenticated users away from auth pages
        router.replace("/(tabs)/home");
      }
      // If user is in a protected group or unknown route, allow access
      // The individual route groups will handle their own navigation
    } else {
      // User is not signed in
      if (
        protectedGroups.includes(currentGroup) ||
        (!inAuthGroup && !publicGroups.includes(currentGroup))
      ) {
        // Redirect unauthenticated users to login
        router.replace("/(auth)/login");
      }
    }
  }, [isLoaded, isSignedIn, showSplash, segments]);

  if (showSplash) return <AppSplashScreen />;

  return (
    <>
      <StatusBar style="auto" />
      <Slot />
    </>
  );
};

// Secure token caching using SecureStore
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Do nothing
    }
  },
};

const RootLayout = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
    <InitialLayout />
  </ClerkProvider>
);

export default RootLayout;
