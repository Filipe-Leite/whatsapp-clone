import { ChatIcon } from '@chakra-ui/icons';
import { Button, Text, Heading, Divider, HStack, Tab, VStack, Circle, TabList, useDisclosure } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FriendContext } from './Home';
import AddFriendModal from './AddFriendModal';

const Sidebar = () => {
    const { friendList } = useContext(FriendContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <VStack py="1.4rem">
            <HStack justify="space-evenly" w="100%">
                <Heading size="md">
                    Add Friend
                </Heading>
                <Button onClick={onOpen}>
                    <ChatIcon />
                </Button>
            </HStack>
            <Divider />
            <VStack as={TabList}>
                {friendList.map(friend => (
                    <HStack as={Tab} key={`friend:${friend}`}>
                        <Circle
                            bg={friend.connected ? "green.700" : "red.500"}
                            w="20px"
                            h="20px"
                        />
                        <Text>{friend}</Text>
                    </HStack>
                ))}
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose}/>
        </VStack>
    );
};

export default Sidebar;