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
      <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'>
        {icon}
      </div>
      <Stack gap='0' flex='1'>
        <Text className='text-gray-900'>{title}</Text>
        <Text className='text-xs text-gray-500'>
          {description}
        </Text>
      </Stack>
      <div className='text-gray-600'>{element}</div>
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
          className='text-lg font-bold text-gray-700 hover:bg-gray-100'
        >
          CohesionData Confluence AI <MenuIcon />
        </Button>
      </MenuTrigger>
      <MenuContent 
        className='min-w-[320px] rounded-xl bg-white border border-gray-200 shadow-lg'
      >
        <MenuItem 
          value='AIRS' 
          className='py-2 hover:bg-gray-50' 
          onClick={() => handleSelect('AIRS')}
        >
          <MenuItemDetail 
            title='AIRS' 
            icon={<ChatGPTMenuIcon />} 
            description='AIRS WorkSpace' 
            element={selectedWorkspace === 'AIRS' ? <HiCheck size={24} /> : <></>} 
          />
        </MenuItem>

        <MenuItem 
          value='AIRD' 
          className='py-2 hover:bg-gray-50' 
          onClick={() => handleSelect('AIRD')}
        >
          <MenuItemDetail 
            title='AIRD' 
            icon={<ChatGPTMenuIcon />} 
            description='AIRD WorkSpace' 
            element={selectedWorkspace === 'AIRD' ? <HiCheck size={24} /> : <></>} 
          />
        </MenuItem>

        <MenuItem 
          value='GPUSCHED' 
          className='py-2 hover:bg-gray-50' 
          onClick={() => handleSelect('GPUSCHED')}
        >
          <MenuItemDetail 
            title='GPUSCHED' 
            icon={<ChatGPTMenuIcon />} 
            description='GPUSCHED WorkSpace' 
            element={selectedWorkspace === 'GPUSCHED' ? <HiCheck size={24} /> : <></>} 
          />
        </MenuItem>

        <MenuItem 
          value='~C2024009' 
          className='py-2 hover:bg-gray-50' 
          onClick={() => handleSelect('~C2024009')}
        >
          <MenuItemDetail 
            title='ALLEN' 
            icon={<ChatGPTMenuIcon />} 
            description='ALLEN WorkSpace' 
            element={selectedWorkspace === '~C2024009' ? <HiCheck size={24} /> : <></>} 
          />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
