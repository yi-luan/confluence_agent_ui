import { Button } from '@/components/ui/button';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { Box, Circle, HStack, Stack, Text } from '@chakra-ui/react';
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
      <Circle size='8' bg='bg.muted'>
        {icon}
      </Circle>
      <Stack gap='0' flex='1'>
        <Text>{title}</Text>
        <Text fontSize='xs' color='fg.muted'>
          {description}
        </Text>
      </Stack>
      <Box>{element}</Box>
    </HStack>
  );
};

export const ConfluenceAIMenu = () => {
  const { workspace: selectedWorkspace, setWorkspace } = useWorkspace();
  console.log(selectedWorkspace);

  const handleSelect = (value: string) => {
    setWorkspace(value);
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant='ghost' fontSize='lg' fontWeight='bold' color='fg.muted'>
          CohesionData Confluence AI <MenuIcon />
        </Button>
      </MenuTrigger>
      <MenuContent minW='320px' borderRadius='2xl'>
        <MenuItem value='AIRS' py='2' onClick={() => handleSelect('AIRS')}>
          <MenuItemDetail title='AIRS' icon={<ChatGPTMenuIcon />} description='AIRS WorkSpace' element={selectedWorkspace === 'AIRS' ? <HiCheck size={24} /> : <></>} />
        </MenuItem>

        <MenuItem value='AIRD' py='2' onClick={() => handleSelect('AIRD')}>
          <MenuItemDetail title='AIRD' icon={<ChatGPTMenuIcon />} description='AIRD WorkSpace' element={selectedWorkspace === 'AIRD' ? <HiCheck size={24} /> : <></>} />
        </MenuItem>

        <MenuItem value='GPUSCHED' py='2' onClick={() => handleSelect('GPUSCHED')}>
          <MenuItemDetail title='GPUSCHED' icon={<ChatGPTMenuIcon />} description='GPUSCHED WorkSpace' element={selectedWorkspace === 'GPUSCHED' ? <HiCheck size={24} /> : <></>} />
        </MenuItem>

        <MenuItem value='~C2024009' py='2' onClick={() => handleSelect('~C2024009')}>
          <MenuItemDetail title='ALLEN' icon={<ChatGPTMenuIcon />} description='ALLEN WorkSpace' element={selectedWorkspace === '~C2024009' ? <HiCheck size={24} /> : <></>} />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
