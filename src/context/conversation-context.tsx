import React, { createContext, useContext, useState, useEffect } from 'react';

interface Conversation {
  id: string;
  title: string;
  last_updated: string;
  message_count: number;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: Array<{
    content: string;
    summary: string;
    source: string;
  }>;
}

interface ConversationContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  currentMessages: Message[];
  setCurrentConversationId: (id: string | null) => void;
  refreshConversations: () => Promise<void>;
  loadConversationMessages: (id: string) => Promise<void>;
  createNewConversation: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  // 從 localStorage 讀取上次的對話 ID
  useEffect(() => {
    const savedConversationId = localStorage.getItem('currentConversationId');
    if (savedConversationId) {
      setCurrentConversationId(savedConversationId);
    }
  }, []);

  // 當 currentConversationId 變更時，保存到 localStorage
  useEffect(() => {
    if (currentConversationId) {
      localStorage.setItem('currentConversationId', currentConversationId);
    }
  }, [currentConversationId]);

  const refreshConversations = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/conversations');
      const data = await response.json();
      setConversations(data.data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const loadConversationMessages = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5001/api/conversations/${id}`);
      const data = await response.json();
      setCurrentMessages(data.data.messages);
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
    }
  };

  // 明確創建新對話的函數
  const createNewConversation = () => {
    setCurrentConversationId(null);
    setCurrentMessages([]);
    localStorage.removeItem('currentConversationId');
  };

  useEffect(() => {
    refreshConversations();
  }, []);

  useEffect(() => {
    if (currentConversationId) {
      loadConversationMessages(currentConversationId);
    } else {
      setCurrentMessages([]);
    }
  }, [currentConversationId]);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversationId,
        currentMessages,
        setCurrentConversationId,
        refreshConversations,
        loadConversationMessages,
        createNewConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
}; 