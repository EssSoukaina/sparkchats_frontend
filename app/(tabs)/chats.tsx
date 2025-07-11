import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import AddOptionsModal from "../(chats)/add";
import ConversationPage from "../(chats)/conversation";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
  unreadCount?: number;
  isDelivered?: boolean;
  isFavourite?: boolean;
  isGroup?: boolean;
  isOnline?: boolean;
  messages?: Message[];
}

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOutgoing: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
  isPromo?: boolean;
  promoImage?: string;
  promoTitle?: string;
}

interface ChatsPageProps {
  chats?: Chat[];
  onChatPress?: (chatId: number) => void;
  onNewChat?: () => void;
  onNewGroup?: () => void;
  onNewContact?: () => void;
  onNewCampaign?: () => void;
}

const { height: WINDOW_HEIGHT } = Dimensions.get("window");
const GRADIENT_START_Y = WINDOW_HEIGHT * 0.5;

const ChatsPage: React.FC<ChatsPageProps> = ({
  chats = [],
  onChatPress,
  onNewChat,
  onNewGroup,
  onNewContact,
  onNewCampaign,
}) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const tabs = ["All", "Unread", "Favourites", "Groups"];

  // Simulate one chat if none provided
  if (chats.length === 0) {
    chats.push({
      id: 1,
      name: "Wellness Store",
      lastMessage: "Enjoy 20% off all yoga mats!",
      time: "4:56 pm",
      avatar:
        "https://images.unsplash.com/photo-1544396821-8b1be0f612b1?w=100&h=100&fit=crop",
      unreadCount: 2,
      isDelivered: true,
      isFavourite: false,
      isGroup: false,
      isOnline: true,
    });
  }

  const sampleMessages: Message[] = [
    {
      id: 1,
      text: "Check out our latest offer! Enjoy a 20% discount on all products for a limited time. Don't miss out - shop now! 🛒",
      timestamp: "4:56 pm",
      isOutgoing: true,
      isDelivered: true,
      isRead: true,
      isPromo: true,
      promoImage:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop",
      promoTitle: "Today",
    },
    {
      id: 2,
      text: "That's interesting! Is this offer valid for yoga mats too?",
      timestamp: "4:57 pm",
      isOutgoing: false,
    },
    {
      id: 3,
      text: "Yes! The 20% discount applies to all yoga mats, including the one you see here. 😊",
      timestamp: "4:58 pm",
      isOutgoing: true,
      isDelivered: true,
      isRead: true,
    },
    {
      id: 4,
      text: "Perfect. How long is the offer available?",
      timestamp: "4:59 pm",
      isOutgoing: false,
    },
    {
      id: 5,
      text: "The sale ends this Sunday at midnight. Make sure to grab yours before it's gone! ⏰",
      timestamp: "5:00 pm",
      isOutgoing: true,
      isDelivered: true,
      isRead: false,
    },
    {
      id: 6,
      text: "Thanks! I'll place my order tonight.",
      timestamp: "5:01 pm",
      isOutgoing: false,
    },
  ];

  const filteredChats = chats.filter((chat) => {
    switch (selectedTab) {
      case "Unread":
        return chat.unreadCount && chat.unreadCount > 0;
      case "Favourites":
        return chat.isFavourite;
      case "Groups":
        return chat.isGroup;
      default:
        return true;
    }
  });

  const handleFabPress = () => {
    setShowAddModal(true);
  };

  const handleNewGroup = () => {
    onNewGroup?.();
  };

  const handleNewContact = () => {
    onNewContact?.();
  };

  const handleNewCampaign = () => {
    onNewCampaign?.();
  };

  const handleChatPress = (chatId: number) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      const chatWithMessages = {
        ...chat,
        messages: sampleMessages,
      };
      setCurrentChat(chatWithMessages);
    }
    onChatPress?.(chatId);
  };

  const handleBackFromConversation = () => {
    setCurrentChat(null);
  };

  const handleSendMessage = (message: string) => {
    if (currentChat) {
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOutgoing: true,
        isDelivered: true,
        isRead: false,
      };

      const updatedMessages = [...(currentChat.messages || []), newMessage];
      setCurrentChat({
        ...currentChat,
        messages: updatedMessages,
      });
    }
  };

  const handleToggleFavorite = () => {
    if (currentChat) {
      setCurrentChat({
        ...currentChat,
        isFavourite: !currentChat.isFavourite,
      });
    }
  };

  if (currentChat) {
    return (
      <ConversationPage
        chatId={currentChat.id}
        chatName={currentChat.name}
        chatAvatar={currentChat.avatar}
        isOnline={currentChat.isOnline}
        messages={currentChat.messages}
        onBack={handleBackFromConversation}
        onSendMessage={handleSendMessage}
        onFavorite={handleToggleFavorite}
        isFavorite={currentChat.isFavourite}
      />
    );
  }

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item.id)}
    >
      <View style={styles.chatContent}>
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.chatDetails}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.chatTime}>{item.time}</Text>
              {item.isDelivered && (
                <Ionicons
                  name="checkmark-done"
                  size={16}
                  color={Colors.success}
                  style={styles.deliveredIcon}
                />
              )}
            </View>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage}
            </Text>
            {item.unreadCount && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.pageTitle}>Chats</Text>
      </View>
      <View style={styles.tabsSection}>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.chatListWrapper}>
        <LinearGradient
          colors={["#D9D9D900", "#737373B2"]}
          style={styles.chatGradient}
          pointerEvents="none"
        />

        {filteredChats.length > 0 ? (
          <FlatList
            data={filteredChats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.chatsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No chats yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Start a conversation by tapping the + button
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <AddOptionsModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onNewGroup={handleNewGroup}
        onNewContact={handleNewContact}
        onNewCampaign={handleNewCampaign}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleSection: {
    backgroundColor: "#DDDDDD73",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
  },
  tabsSection: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textDark,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textTertiary,
  },
  activeTabText: {
    color: "#fff",
  },
  chatListWrapper: {
    flex: 1,
    position: "relative",
    backgroundColor: Colors.background,
  },
  chatGradient: {
    position: "absolute",
    top: GRADIENT_START_Y,
    left: 0,
    right: 0,
    height: WINDOW_HEIGHT - GRADIENT_START_Y,
    zIndex: -1,
  },
  chatsList: {
    flex: 1,
    paddingTop: 8,
  },
  chatItem: {
    backgroundColor: "#DDDDDD73",
    marginHorizontal: 16,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  chatContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textTertiary,
  },
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    flex: 1,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatTime: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginRight: 4,
  },
  deliveredIcon: {
    marginLeft: 2,
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginTop: 16,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ChatsPage;
