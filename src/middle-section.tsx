import { useState, useRef, useEffect } from 'react';
import { useWorkspace } from './context/workspace-context';
import ConversationBox from './conversation-box';
import type { AskRequest } from './types/AskRequestResponse';
import { useConversation } from './context/conversation-context';
import { API_CONFIG } from './config/api';

export function MiddleSection() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { workspace: selectedWorkspace } = useWorkspace();
  const { 
    currentConversationId, 
    currentMessages, 
    refreshConversations,
    loadConversationMessages,
    setCurrentConversationId
  } = useConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  console.log(currentMessages);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;
    setIsLoading(true);

    try {
      const request: AskRequest & { conversation_id?: string } = {
        question: inputValue,
        workspace: selectedWorkspace,
      };
      
      if (currentConversationId) {
        request.conversation_id = currentConversationId;
      }
      
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      const data = await response.json();

      if (!currentConversationId && data.data.conversation_id) {
        setCurrentConversationId(data.data.conversation_id);
      }

      if (data.data.conversation_id) {
        await loadConversationMessages(data.data.conversation_id);
        await refreshConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  return (
    <div className='flex flex-col h-[85vh] bg-[#343541]'>
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>
        <div className='w-full h-full flex justify-center'>
          <div className='max-w-[768px] w-full px-4'>
            {currentMessages.length === 0 ? (
              <div className='flex items-center justify-center h-full'>
                <h1 className='text-3xl text-gray-300 font-semibold'>有什麼我可以幫你的嗎？</h1>
              </div>
            ) : (
              <>
                <ConversationBox messages={currentMessages.map((msg, index) => ({
                  id: index,
                  content: msg.content,
                  isUser: msg.role === 'user',
                  sources: msg.role === 'assistant' ? msg.sources : undefined,
                }))} />
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>
      </div>

      <div className='w-full border-t border-gray-700 bg-[#343541]'>
        <div className='max-w-[768px] mx-auto p-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='輸入訊息'
              value={inputValue}
              onChange={handleInputValue}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className='w-full px-4 py-3 bg-[#40414f] border-0 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#19c37d] text-gray-100 placeholder-gray-400 disabled:opacity-50'
            />
            <button
              onClick={handleSubmit}
              disabled={inputValue.trim() === '' || isLoading}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-400'
            >
              {isLoading ? (
                <div className='w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin' />
              ) : (
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-gray-400'>
                  <path d='M2 12L20 12M20 12L14 6M20 12L14 18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
