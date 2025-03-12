import { Button } from '@/components/ui/button';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { HiCheck } from 'react-icons/hi';
import { useWorkspace } from './context/workspace-context';
import { ChatGPTMenuIcon, MenuIcon } from './icons/other-icons';

interface MenuItemDetailProps {
  icon: React.ReactElement;
  title: string;
  description?: string;
  element: React.ReactElement;
}

const MenuItemDetail = (props: MenuItemDetailProps) => {
  const { icon, title, description, element, ...rest } = props;
  return (
    <HStack w='100%' {...rest}>
      <div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center'>
        {icon}
      </div>
      <Stack gap='0' flex='1'>
        <Text className='text-gray-100'>{title}</Text>
        <Text className='text-xs text-gray-400'>
          {description}
        </Text>
      </Stack>
      <div className='text-[#19c37d]'>{element}</div>
    </HStack>
  );
};

export const ConfluenceAIMenu = () => {
  const { workspace: selectedWorkspace, setWorkspace } = useWorkspace();

  const handleSelect = (value: string) => {
    setWorkspace(value);
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button 
          variant='ghost' 
          className='text-lg font-bold text-gray-200 hover:bg-[#40414f] p-5'
        >
          CohesionData Confluence AI <MenuIcon />
        </Button>
      </MenuTrigger>
      <MenuContent 
        className='min-w-[320px] rounded-xl bg-[#202123] border border-gray-700 shadow-lg'
      >
        <MenuItem 
          value='AIRS' 
          className='py-2 hover:bg-[#40414f]' 
          onClick={() => handleSelect('AIRS')}
        >
          <MenuItemDetail 
            title='AIRS' 
            icon={<ChatGPTMenuIcon className="text-gray-300" />} 
            description='AIRS WorkSpace' 
            element={selectedWorkspace === 'AIRS' ? <HiCheck size={24} /> : <></>} 
          />
        </MenuItem>

        {/* <MenuItem 
          value='AIRD' 
          className='py-2 hover:bg-[#40414f]' 
          onClick={() => handleSelect('AIRD')}
        >
          <MenuItemDetail 
            title='AIRD' 
            icon={<ChatGPTMenuIcon className="text-gray-300" />} 
            description='AIRD WorkSpace' 
            element={selectedWorkspace === 'AIRD' ? <HiCheck size={24} /> : <></>} 
          />
        </MenuItem>

        <MenuItem 
          value='GPUSCHED' 
          className='py-2 hover:bg-[#40414f]' 
          onClick={() => handleSelect('GPUSCHED')}
        >
          <MenuItemDetail 
            title='GPUSCHED' 
            icon={<ChatGPTMenuIcon className="text-gray-300" />} 
            description='GPUSCHED WorkSpace' 
            element={selectedWorkspace === 'GPUSCHED' ? <HiCheck size={24} /> : <></>} 
          />
        </MenuItem> */}

        <MenuItem 
          value='~C2024009' 
          className='py-2 hover:bg-[#40414f]' 
          onClick={() => handleSelect('~C2024009')}
        >
          <MenuItemDetail 
            title='ALLEN' 
            icon={<ChatGPTMenuIcon className="text-gray-300" />} 
            description='ALLEN WorkSpace' 
            element={selectedWorkspace === '~C2024009' ? <HiCheck size={24} /> : <></>} 
          />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
