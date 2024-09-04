import { Text, TabPanel, VStack, TabPanels } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FriendContext } from './Home'

const Chat = () => {
    const {friendList} = useContext(FriendContext);
  return friendList.length > 0 ? (
    <VStack>
        <TabPanel>friend one</TabPanel>
    </VStack>
  ) : (
    <VStack
        justify="center"
        pt="5rem"
        w="100%"
        textAlign="center"
        fontSize="lg"
    >
      <TabPanels>
        <TabPanel>
          <Text>No Friends :( Click add friend to start chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
    );
}

export default Chat