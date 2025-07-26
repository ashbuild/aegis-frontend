import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
}

const suggestionChips = [
  'How much did I spend on coffee?',
  'Summarize my spending this month',
  'What are my top expenses?',
  'Show me my food spending',
];

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'agent' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        text: inputText.trim(),
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      // Simulate agent response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { id: String(prevMessages.length + 1), text: 'I received your message: "' + newMessage.text + '". How can I assist further?', sender: 'agent' }
        ]);
      }, 1000);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputText(suggestion);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'user' ? styles.userMessage : styles.agentMessage,
      { backgroundColor: item.sender === 'user' ? themeColors.tint : themeColors.card },
    ]}>
      <Text style={{ color: item.sender === 'user' ? themeColors.background : themeColors.primaryText }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted
      />

      <View style={styles.suggestionChipsContainer}>
        <FlatList
          data={suggestionChips}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.suggestionChip, { backgroundColor: themeColors.card }]}
              onPress={() => handleSuggestionPress(item)}
            >
              <Text style={{ color: themeColors.primaryText }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={[styles.inputContainer, { borderTopColor: themeColors.card }]}>
        <TextInput
          style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.primaryText }]}
          placeholder="Type your message..."
          placeholderTextColor={themeColors.secondaryText}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Feather name="send" size={24} color={themeColors.background} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  agentMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
  },
  suggestionChipsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  suggestionChip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: Colors.light.tint,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
