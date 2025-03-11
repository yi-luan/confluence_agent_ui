import { Tooltip } from './components/ui/tooltip';
import { ConfluenceAIMenu } from './confluenceAIMenu';
import { SidebarIcon } from './icons/sidebar-icons';
import { useSidebarContext } from './sidebar-context';

export function TopSection() {
  const { sideBarVisible, toggleSidebar } = useSidebarContext();
  return (
    <div className='flex justify-between items-center p-2 bg-white border-b border-gray-200'>
      {!sideBarVisible && (
        <div className='flex items-center'>
          <Tooltip content='Open sidebar' positioning={{ placement: 'right' }} showArrow>
            <button
              onClick={toggleSidebar}
              className='p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <SidebarIcon className='text-2xl' />
            </button>
          </Tooltip>
          <ConfluenceAIMenu />
        </div>
      )}
      {sideBarVisible && <ConfluenceAIMenu />}
    </div>
  );
}
