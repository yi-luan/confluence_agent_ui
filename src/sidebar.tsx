import { Icon, IconButton } from '@chakra-ui/react';
import { Tooltip } from './components/ui/tooltip';
import { SidebarIcon, SmallGPTIcon } from './icons/sidebar-icons';
import { useSidebarContext } from './sidebar-context';

export function Sidebar() {
  const { sideBarVisible, toggleSidebar } = useSidebarContext();

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

        <div className='flex-1 px-2 space-y-2'>
          <div className='relative group'>
            <a
              href='#'
              className='flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors'
            >
              <div className='w-6 h-6 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center mr-3'>
                <Icon as={SmallGPTIcon} fontSize='md' className='text-gray-400' />
              </div>
              <span className='text-sm text-white'>History Conversation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
