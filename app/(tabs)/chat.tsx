import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
}

const suggestionChips = [
  'How much did I spend on coffee?',
  'Summarize my spending',
  'Top expenses?',
  'Food spending?',
];

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'agent' },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        text: inputText.trim(),
        sender: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      // Simulate agent response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: String(prev.length + 1), text: `I'm a demo bot. You said: "${newMessage.text}"`, sender: 'agent' }
        ]);
      }, 1000);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputText(suggestion);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessageContainer : styles.agentMessageContainer,
    ]}>
      <ThemedView style={[
        styles.messageBubble,
        item.sender === 'user' ? { backgroundColor: Colors[colorScheme ?? 'light'].tint } : { backgroundColor: Colors[colorScheme ?? 'light'].card },
      ]}>
        <ThemedText style={{ color: item.sender === 'user' ? '#FFFFFF' : Colors[colorScheme ?? 'light'].text }}>
          {item.text}
        </ThemedText>
      </ThemedView>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Aegis Agent</ThemedText>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.suggestionContainer}>
          <FlatList
            data={suggestionChips}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.suggestionChip, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}
                onPress={() => handleSuggestionPress(item)}
              >
                <ThemedText style={styles.suggestionChipText}>{item}</ThemedText>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        <View style={[styles.inputContainer, { borderTopColor: Colors[colorScheme ?? 'light'].background }]}>
          <TextInput
            style={[styles.input, { backgroundColor: Colors[colorScheme ?? 'light'].card, color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Type your message..."
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={[styles.sendButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={handleSendMessage}>
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    marginVertical: 4,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  agentMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  suggestionContainer: {
    paddingBottom: 8,
  },
  suggestionChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  suggestionChipText: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    fontFamily: 'Poppins',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
