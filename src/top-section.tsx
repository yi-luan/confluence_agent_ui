import { Flex, IconButton } from '@chakra-ui/react';
import { Tooltip } from './components/ui/tooltip';
import { ConfluenceAIMenu } from './confluenceAIMenu';
import { SidebarIcon } from './icons/sidebar-icons';
import { useSidebarContext } from './sidebar-context';

export function TopSection() {
  const { sideBarVisible, toggleSidebar } = useSidebarContext();
  return (
    <Flex justify='space-between' align='center' p='2' ml='2'>
      {!sideBarVisible && (
        <Flex>
          <Tooltip content='Close sidebar' positioning={{ placement: 'right' }} showArrow>
            <IconButton variant='ghost' onClick={toggleSidebar}>
              <SidebarIcon fontSize='2xl' color='fg.muted' />
            </IconButton>
          </Tooltip>
          <ConfluenceAIMenu />
        </Flex>
      )}
      {sideBarVisible && <ConfluenceAIMenu />}
    </Flex>
  );
}
