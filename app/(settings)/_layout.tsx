// app/(settings)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#333333",
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerShadowVisible: true,
        headerBackTitle: "",
      }}
    >
      <Stack.Screen
        name="profile-information"
        options={{
          title: "profile-information",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: "change-password",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="theme"
        options={{
          title: "theme",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: "language",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
