import { Modal, ModalBody, ModalContent, ModalFooter, 
         ModalHeader, ModalOverlay, Button, 
         ModalCloseButton} from "@chakra-ui/react"
import TextField from "../TextField"
import { Formik, Form } from "formik"
import { friendSchema } from "../../common"

const AddFriendModal = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                Add a friend
            </ModalHeader>
            <ModalCloseButton/>
            <Formik initialValues={{ friendName: ""}}
                    onSubmit={ values => {
                        // alert(JSON.stringify(values, null, 2));
                        onClose();
                    } }
                    validationSchema={friendSchema}
                    >
                <Form>
                    <ModalBody>
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