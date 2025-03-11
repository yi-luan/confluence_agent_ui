interface Source {
  content: string;
  summary: string;
  source: string;
}

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  sources?: Source[];
}

interface ConversationBoxProps {
  messages: Message[];
}

export default function ConversationBox({ messages }: ConversationBoxProps) {
  return (
    <div className='flex flex-col gap-4 py-4'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`w-full flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`text-white p-4 rounded-2xl max-w-[70%] ${
              message.isUser ? 'bg-gray-800' : 'bg-gray-700'
            }`}
          >
            <div className='whitespace-pre-wrap text-white'>{message.content}</div>

            {message.sources && message.sources.length > 0 && (
              <div className='mt-4 pt-4 border-t border-gray-600'>
                <div className='text-sm text-gray-400 mb-2'>參考來源：</div>
                {message.sources.map((source, index) => (
                  <div key={index} className='mb-3 last:mb-0'>
                    <div className='text-sm text-gray-300'>{source.summary}</div>
                    <div className='text-xs text-gray-400 mt-1'>來源：{source.source}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}