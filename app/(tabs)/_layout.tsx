import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/styles";

/* ---------- helpers ---------- */
const { height: WINDOW_HEIGHT } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 88;
const GRADIENT_START_Y = WINDOW_HEIGHT * 0.5;

/* ---------- header ---------- */
const HeaderComponent = () => (
  <View style={styles.header}>
    <Image
      source={require("../../assets/images/logo.png")}
      style={styles.logo}
      resizeMode="contain"
    />
    <TouchableOpacity style={styles.proBadge} onPress={() => {}}>
      <Text style={styles.proText}>Pro</Text>
    </TouchableOpacity>
  </View>
);

/* ---------- custom tab bar ---------- */
const CustomTabBar = ({ state, descriptors, navigation }: any) => (
  <View style={styles.tabBarContainer}>
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name);
        };

        const icon = (name: string, focused: boolean) => {
          const variants: Record<string, [string, string]> = {
            home: ["home-outline", "home"],
            contacts: ["call-outline", "call"],
            chats: ["chatbubbles-outline", "chatbubbles"],
            marketing: ["megaphone-outline", "megaphone"],
            settings: ["settings-outline", "settings"],
          };
          const [outline, filled] = variants[name] ?? variants.home;
          return focused ? filled : outline;
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabBarItem}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            <Ionicons
              name={icon(route.name, isFocused) as any}
              size={24}
              color={isFocused ? Colors.primary : "#6B7280"}
            />
            <Text
              style={[
                styles.tabBarLabel,
                { color: isFocused ? Colors.primary : "#6B7280" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

/* ---------- main layout ---------- */
export default function TabLayout() {
  const { signOut } = useAuth();

  return (
    <View style={styles.root}>
      {/* Gradient background behind lower half */}
      <LinearGradient
        colors={["#FFFFFF00", "#D9D9D9"]}
        style={styles.bodyGradient}
        pointerEvents="none"
      />

      {/* Tabs navigation */}
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "#6B7280",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            header: () => <HeaderComponent />,
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: "Contacts",
            headerShown: false, // ✅ Header removed
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            header: () => <HeaderComponent />,
          }}
        />
        <Tabs.Screen
          name="marketing"
          options={{
            title: "Marketing",
            header: () => <HeaderComponent />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false, // ✅ Header removed
          }}
        />
      </Tabs>
    </View>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
    backgroundColor: Colors.background,
  },

  bodyGradient: {
    position: "absolute",
    top: GRADIENT_START_Y,
    left: 0,
    right: 0,
    height: WINDOW_HEIGHT - GRADIENT_START_Y - TAB_BAR_HEIGHT,
    zIndex: -1,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 50,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 120,
    height: 40,
  },
  proBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  proText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Tab bar */
  tabBarContainer: {
    height: TAB_BAR_HEIGHT,
    backgroundColor: "lightgrey",
  },
  tabBar: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
    backgroundColor: "transparent",
    paddingVertical: 8,
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
