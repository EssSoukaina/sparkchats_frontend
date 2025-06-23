// 5. UPDATE: app/_layout.tsx (modify your existing file)
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View, Image } from "react-native";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_cHJvdmVuLXNhaWxmaXNoLTE1LmNsZXJrLmFjY291bnRzLmRldiQ";

// Custom splash screen component
const AppSplashScreen = () => {
  return (
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
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash after 3 seconds (reduced from 5)
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!isLoaded || showSplash) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (isSignedIn && !inTabsGroup && !inAuthGroup) {
      // User is signed in, redirect to main app
      router.replace("/(auth)/ImportContacts");
    } else if (!isSignedIn && inTabsGroup) {
      // User is not signed in but trying to access main app
      router.replace("/(auth)/login");
    } else if (!isSignedIn && !inAuthGroup) {
      // User is not signed in, redirect to login
      router.replace("/(auth)/login");
    }
  }, [isSignedIn, isLoaded, showSplash, segments]);

  if (showSplash) {
    return <AppSplashScreen />;
  }

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayout;
