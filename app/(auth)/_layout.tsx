import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="Email_Verification"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="connected"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="OnboardingQ1"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="OnboardingQ2"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="OnboardingQ3"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="AccountCreated"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="VerifyIdentity"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="SetNewPassword"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
      <Stack.Screen
        name="BusinessProfileSetup"
        options={{
          headerShown: false, // This will completely hide the header
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
