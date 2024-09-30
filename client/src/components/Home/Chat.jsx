import { Text, TabPanel, VStack, TabPanels } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FriendContext } from './Home'
import ChatBox from './ChatBox';

const Chat = ({userid}) => {
    const {friendList} = useContext(FriendContext);
    const {messages} = useContext(MessagesContext);

  return friendList.length > 0 ? (
    <VStack h="100%" justify="end">
      <TabPanels overflow="scroll">
        {friendList.map(friend => (
          <VStack 
            flexDir="column-reverse"
            as={TabPanel}
            key={`chat:${friend.username}`}
            w="100%"
          >
            {messages
              .filter(
                msg => msg.to === friend.userid || msg.from === friend.userid
              )
              .map((message, idx) => (
                <Text key={`msg:${friend.username}`} fontSize="lg">
                  {message.content}
                </Text>
              ))}
          </VStack>
        ))}
      </TabPanels>
      <ChatBox userid={userid}/>
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