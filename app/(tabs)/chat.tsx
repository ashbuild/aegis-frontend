import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  Text, 
  TextInput, 
  IconButton, 
  Surface, 
  Chip,
  useTheme,
  Card
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const theme = useTheme();
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
      <Surface 
        style={[
          styles.messageBubble,
          item.sender === 'user' 
            ? { backgroundColor: theme.colors.primary } 
            : { backgroundColor: theme.colors.surfaceVariant }
        ]}
        elevation={1}
      >
        <Text 
          variant="bodyMedium"
          style={{ 
            color: item.sender === 'user' 
              ? theme.colors.onPrimary 
              : theme.colors.onSurfaceVariant 
          }}
        >
          {item.text}
        </Text>
      </Surface>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.headerSurface} elevation={1}>
        <Text variant="headlineSmall" style={[styles.header, { color: theme.colors.onSurface }]}>
          Aegis Agent
        </Text>
      </Surface>
      
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
              <Chip
                mode="outlined"
                onPress={() => handleSuggestionPress(item)}
                style={styles.suggestionChip}
                textStyle={styles.suggestionChipText}
              >
                {item}
              </Chip>
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        <Surface style={styles.inputContainer} elevation={2}>
          <TextInput
            mode="outlined"
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            style={styles.input}
            contentStyle={styles.inputContent}
            multiline
            maxLength={500}
          />
          <IconButton
            icon="send"
            mode="contained"
            size={24}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
            style={styles.sendButton}
          />
        </Surface>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSurface: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    fontWeight: 'bold',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
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
    paddingHorizontal: 8,
  },
  suggestionChip: {
    marginRight: 8,
  },
  suggestionChipText: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
  },
  inputContent: {
    paddingVertical: 8,
  },
  sendButton: {
    margin: 0,
  },
});
