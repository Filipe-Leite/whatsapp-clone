import { Modal, ModalBody, ModalContent, ModalFooter, 
         ModalHeader, ModalOverlay, Button, 
         ModalCloseButton,
         Heading} from "@chakra-ui/react";
import TextField from "../TextField";
import { Formik, Form } from "formik";
import { friendSchema } from "../../common";
import socket from '../../socket';
import {useCallback, useContext, useState} from 'react';
import { FriendContext } from "./Home";

const AddFriendModal = ({isOpen, onClose}) => {
    const [error, setError] = useState("");
    const closeModal = useCallback(
        () => {
            setError("");
            onClose();
        },
        [onClose]
    );
    const {setFriendList} = useContext(FriendContext);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add a friend</ModalHeader>
                <ModalCloseButton/>
                <Formik initialValues={{ friendName: ""}}
                        onSubmit={ values => {
                            // alert(JSON.stringify(values, null, 2));
                            socket.emit(
                                "add_friend", 
                                values.friendName, 
                                ({ errorMsg, done, newFriend }) => {
                                    if (done) {
                                        setFriendList(c => [newFriend, ...c]);
                                        closeModal();
                                        return;
                                    }
                                    
                                    setError(errorMsg);
                                    });
                        } }
                        validationSchema={friendSchema}
                        >
                    <Form>
                        <ModalBody>
                         <Heading fontSize="xl" color="red.500" textAlign="center">
                          {error}
                         </Heading>
                            <TextField
                            label="Friend's name"
                            placeholder="Enter friend's username..."
                            autoComplete="off"
                            name="friendName"/>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' 
                                    mr={3} 
                                    type="submit">
                                submit
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    )
}

export default AddFriendModal