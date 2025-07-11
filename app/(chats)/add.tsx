import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { Colors } from "../../constants/styles";

interface AddOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onNewGroup: () => void;
  onNewContact: () => void;
  onNewCampaign: () => void;
}

const AddOptionsModal: React.FC<AddOptionsModalProps> = ({
  visible,
  onClose,
  onNewGroup,
  onNewContact,
  onNewCampaign,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => {
                onNewGroup();
                onClose();
              }}
            >
              <Text style={styles.outlineButtonText}>New Group</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => {
                onNewContact();
                onClose();
              }}
            >
              <Text style={styles.outlineButtonText}>New Contact</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.filledButton}
            onPress={() => {
              onNewCampaign();
              onClose();
            }}
          >
            <Text style={styles.filledButtonText}>New Campaign</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 24,
    width: "90%", // Make it take 90% of screen width
    maxWidth: 400, // Optional: cap it on large screens
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 20,
    textAlign: "left",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.primary,
  },
  filledButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  filledButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
});

export default AddOptionsModal;
