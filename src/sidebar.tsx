import { Icon, IconButton } from '@chakra-ui/react';
import { Tooltip } from './components/ui/tooltip';
import { SidebarIcon, SmallGPTIcon } from './icons/sidebar-icons';
import { useSidebarContext } from './sidebar-context';
import { useConversation } from './context/conversation-context';

export function Sidebar() {
  const { sideBarVisible, toggleSidebar } = useSidebarContext();
  const { 
    conversations, 
    currentConversationId, 
    setCurrentConversationId,
    createNewConversation
  } = useConversation();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-TW', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className={`bg-gray-800 ${
        !sideBarVisible ? 'w-0' : 'w-[260px]'
      } overflow-hidden transition-[width] duration-300`}
    >
      <div className='h-full flex flex-col p-2'>
        <div className='flex justify-between mb-2'>
          <Tooltip content='Close sidebar' positioning={{ placement: 'right' }} showArrow>
            <IconButton variant='ghost' onClick={toggleSidebar}>
              <SidebarIcon fontSize='2xl' color='fg.muted' />
            </IconButton>
          </Tooltip>
        </div>

        <div className='flex-1 px-2 space-y-2 overflow-y-auto'>
          {/* 新對話按鈕 */}
          <div className='relative group mb-4'>
            <button
              onClick={() => createNewConversation()}
              className='w-full flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600'
            >
              <div className='w-6 h-6 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center mr-3'>
                <Icon as={SmallGPTIcon} fontSize='md' className='text-gray-400' />
              </div>
              <span className='text-sm text-white'>新對話</span>
            </button>
          </div>

          {/* 對話歷史列表 */}
          {conversations.map((conversation) => (
            <div key={conversation.id} className='relative group'>
              <button
                onClick={() => setCurrentConversationId(conversation.id)}
                className={`w-full flex flex-col p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                  currentConversationId === conversation.id ? 'bg-gray-700' : ''
                }`}
              >
                <div className='flex items-center'>
                  <div className='w-6 h-6 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center mr-3'>
                    <Icon as={SmallGPTIcon} fontSize='md' className='text-gray-400' />
                  </div>
                  <div className='flex-1 text-left'>
                    <span className='text-sm text-white line-clamp-1'>{conversation.title}</span>
                    <span className='text-xs text-gray-400'>{formatTimestamp(conversation.last_updated)}</span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
