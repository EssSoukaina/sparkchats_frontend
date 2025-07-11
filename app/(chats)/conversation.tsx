import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

interface ConversationPageProps {
  chatId: number;
  chatName: string;
  chatAvatar?: string;
  isOnline?: boolean;
  messages?: Message[];
  onBack?: () => void;
  onSendMessage?: (message: string) => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

const WINDOW_HEIGHT = Dimensions.get("window").height;

const ConversationPage: React.FC<ConversationPageProps> = ({
  chatName,
  chatAvatar,
  isOnline = false,
  messages = [],
  onBack,
  onSendMessage,
  onFavorite,
  isFavorite = false,
}) => {
  const [messageText, setMessageText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage?.(messageText.trim());
      setMessageText("");
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.isPromo && item.promoImage) {
      return (
        <View style={styles.promoWrapper}>
          <Image source={{ uri: item.promoImage }} style={styles.promoImage} />
          <View style={styles.promoBubble}>
            <Text style={styles.promoTitle}>{item.promoTitle}</Text>
            <Text style={styles.promoText}>{item.text}</Text>
            <Text style={styles.promoTime}>{item.timestamp}</Text>
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageBubble,
          item.isOutgoing ? styles.outgoing : styles.incoming,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.isOutgoing ? styles.outgoingText : styles.incomingText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            item.isOutgoing ? styles.outgoingTime : styles.incomingTime,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Full Header - This covers the entire top area */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            {chatAvatar ? (
              <Image source={{ uri: chatAvatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{chatName[0]}</Text>
              </View>
            )}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{chatName}</Text>
              {isOnline && <Text style={styles.onlineText}>Online</Text>}
            </View>
          </View>

          <TouchableOpacity style={styles.favoriteButton} onPress={onFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#4CA64C" : "#555"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={styles.inputBar}>
          <View style={styles.inputIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="add" size={22} color="#777" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="happy-outline" size={22} color="#777" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="document-outline" size={22} color="#777" />
            </TouchableOpacity>
          </View>

          <TextInput
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            style={styles.textInput}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: messageText.trim() ? "#4CA64C" : "#eee" },
            ]}
            onPress={handleSend}
            disabled={!messageText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={messageText.trim() ? "#fff" : "#aaa"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerSafeArea: {
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  onlineText: {
    fontSize: 13,
    color: "#4CA64C",
    marginTop: 2,
  },
  favoriteButton: {
    padding: 4,
  },
  messageList: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  messageListContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 4,
  },
  outgoing: {
    backgroundColor: "#4CA64C",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  incoming: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  outgoingText: {
    color: "#fff",
  },
  incomingText: {
    color: "#000",
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    textAlign: "right",
  },
  outgoingTime: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  incomingTime: {
    color: "#888",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  inputIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  iconButton: {
    padding: 6,
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  promoWrapper: {
    alignSelf: "flex-end",
    maxWidth: "85%",
    marginVertical: 8,
  },
  promoImage: {
    width: 220,
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  promoBubble: {
    backgroundColor: "#4CA64C",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  promoTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 12,
  },
  promoText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
  },
  promoTime: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 11,
    marginTop: 4,
    textAlign: "right",
  },
});

export default ConversationPage;
