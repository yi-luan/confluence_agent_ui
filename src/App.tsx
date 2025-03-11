import { Box, Flex, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BottomSection } from './bottom-section';
import { MiddleSection } from './middle-section';
import { Sidebar } from './sidebar';
import { SidebarProvider } from './sidebar-context';
import { TopSection } from './top-section';
import { ConversationProvider } from './context/conversation-context';

const App = () => {
  useEffect(() => {
    document.title = 'Confluence AI';
  }, []);

  return (
    <ConversationProvider>
      <SidebarProvider>
        <Flex minH='100dvh'>
          <Sidebar />

          <Box flex='1'>
            <Stack h='full'>
              <TopSection />
              <MiddleSection />
              <BottomSection />
            </Stack>
          </Box>
        </Flex>
      </SidebarProvider>
    </ConversationProvider>
  );
};

export default App;
