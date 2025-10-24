import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../../constants/styles"; // Adjust path as needed

const SendCampaign = () => {
  const router = useRouter();
  const { contacts } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState("now");
  const [scheduledDateTime, setScheduledDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<
    "date" | "time" | "datetime"
  >("date");

  const selectedContacts = contacts ? JSON.parse(contacts as string) : [];

  const formatDateTime = (date: Date): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${day} ${month}, at ${displayHours}:${displayMinutes} ${ampm}`;
  };

  const handleDateTimeChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      setShowTimePicker(false);
    }

    if (selectedDate) {
      setScheduledDateTime(selectedDate);
    }
  };

  const showDateTimePicker = () => {
    if (Platform.OS === "ios") {
      setDatePickerMode("datetime");
      setShowDatePicker(true);
    } else {
      // Android: show date picker first
      setDatePickerMode("date");
      setShowDatePicker(true);
    }
  };

  const handleAndroidDateSelected = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setScheduledDateTime(selectedDate);
      // After date is selected, show time picker
      setTimeout(() => {
        setDatePickerMode("time");
        setShowTimePicker(true);
      }, 100);
    }
  };

  const handleAndroidTimeSelected = (_event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDateTime = new Date(scheduledDateTime);
      newDateTime.setHours(selectedTime.getHours());
      newDateTime.setMinutes(selectedTime.getMinutes());
      setScheduledDateTime(newDateTime);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSendCampaign = () => {
    if (selectedOption === "schedule") {
      // Handle scheduled sending
      console.log("Scheduling campaign for:", scheduledDateTime);
    } else {
      // Handle immediate sending
      console.log("Sending campaign now");
    }

    router.push({
      pathname: "/statistics",
      params: { selectedContacts: JSON.stringify(selectedContacts) },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>send</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Schedule Time Option */}
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => setSelectedOption("schedule")}
        >
          <View style={styles.optionRow}>
            <View
              style={[
                styles.radioButton,
                selectedOption === "schedule" && styles.radioButtonSelected,
              ]}
            >
              {selectedOption === "schedule" && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <Text style={styles.optionText}>schedule time</Text>
          </View>

          {selectedOption === "schedule" && (
            <View style={styles.scheduleContainer}>
              <TouchableOpacity
                style={styles.dateTimeContainer}
                onPress={showDateTimePicker}
              >
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={Colors.textSecondary}
                />
                <Text style={styles.dateTimeText}>
                  {formatDateTime(scheduledDateTime)}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>or</Text>
        </View>

        {/* Send Now Option */}
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => setSelectedOption("now")}
        >
          <View style={styles.optionRow}>
            <View
              style={[
                styles.radioButton,
                selectedOption === "now" && styles.radioButtonSelected,
              ]}
            >
              {selectedOption === "now" && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <Text style={styles.optionText}>skip and send now</Text>
          </View>

          {selectedOption === "now" && (
            <View style={styles.immediateContainer}>
              <Text style={styles.immediateText}>
                Your campaign will be sent immediately
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Send Button - Centered */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendCampaign}
        >
          <Text style={styles.sendButtonText}>Send Campaign</Text>
        </TouchableOpacity>
      </View>

      {/* Date/Time Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={scheduledDateTime}
          mode={datePickerMode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={
            Platform.OS === "android"
              ? handleAndroidDateSelected
              : handleDateTimeChange
          }
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && Platform.OS === "android" && (
        <DateTimePicker
          value={scheduledDateTime}
          mode="time"
          display="default"
          onChange={handleAndroidTimeSelected}
        />
      )}
    </View>
  );
};

export default SendCampaign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: Colors.textDark,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  optionContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.textDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: Colors.textDark,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.textDark,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.textDark,
  },
  scheduleContainer: {
    marginTop: 16,
    paddingLeft: 32,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundElements,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  dateTimeText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  immediateContainer: {
    marginTop: 12,
    paddingLeft: 32,
  },
  immediateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textDecorationLine: "underline",
  },
  dividerContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  dividerText: {
    fontSize: 16,
    color: Colors.textTertiary,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    minWidth: 200,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
});
