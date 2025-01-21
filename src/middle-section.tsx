import { useState } from 'react';
import { useWorkspace } from './context/workspace-context';
import ConversationBox from './conversation-box';
import type { AskRequest, AskResponse } from './types/AskRequestResponse';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  sources?: Array<{
    content: string;
    summary: string;
    source: string;
  }>;
}

export function MiddleSection() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { workspace: selectedWorkspace } = useWorkspace();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    // 新增使用者訊息
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const request: AskRequest = {
        question: inputValue,
        workspace: selectedWorkspace,
      };
      const response = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      const data: AskResponse = await response.json();

      // 新增 AI 回應訊息
      const aiMessage: Message = {
        id: messages.length + 2,
        content: data.data.answer,
        isUser: false,
        sources: data.data.sources,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // 可以加入錯誤提示
      const errorMessage: Message = {
        id: messages.length + 2,
        content: '抱歉，發生錯誤，請稍後再試。',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  return (
    <div className='flex flex-col h-[85vh]'>
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>
        <div className='w-full h-full flex justify-center'>
          <div className='w-[800px]'>
            {messages.length === 0 ? (
              <div className='flex items-center justify-center h-full'>
                <h1 className='text-4xl font-bold text-white'>有什麼我可以幫你的嗎？</h1>
              </div>
            ) : (
              <ConversationBox messages={messages} />
            )}
          </div>
        </div>
      </div>

      <div className='p-4 mt-10'>
        <div className='relative w-[768px] mx-auto'>
          <input
            type='text'
            placeholder='輸入訊息'
            value={inputValue}
            onChange={handleInputValue}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className='w-full px-4 py-3 bg-[#424242] border-none rounded-full focus:outline-none text-white placeholder-gray-400 disabled:opacity-50'
          />
          <button
            onClick={handleSubmit}
            disabled={inputValue.trim() === '' || isLoading}
            className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
            ) : (
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-white'>
                <path d='M2 12L20 12M20 12L14 6M20 12L14 18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
