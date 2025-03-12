import { IconButton } from '@chakra-ui/react';
import { Tooltip } from './components/ui/tooltip';
import { ConfluenceAIMenu } from './confluenceAIMenu';
import { SidebarIcon } from './icons/sidebar-icons';
import { useSidebarContext } from './sidebar-context';

export function TopSection() {
  const { sideBarVisible, toggleSidebar } = useSidebarContext();
  return (
    <div className='flex justify-between items-center p-2 bg-[#343541] border-b border-gray-700'>
      {!sideBarVisible && (
        <div className='flex items-center'>
          <Tooltip content='開啟側邊欄' positioning={{ placement: 'right' }} showArrow>
            <IconButton variant='ghost' onClick={toggleSidebar}>
              <SidebarIcon fontSize='2xl' color='gray.400' />
            </IconButton>
          </Tooltip>
          <ConfluenceAIMenu />
        </div>
      )}
      {sideBarVisible && <ConfluenceAIMenu />}
    </div>
  );
}
