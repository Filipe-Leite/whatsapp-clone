import React from 'react';
import { Formik } from 'formik';

const ChatBox = () => {
  return (
    <Formik initialValues={{ message: "" }}
            validationSchema={Yup.object({
                message: Yup.string().min(1).max(255)
            })}
            onSubmit={(values, actions) => {
                console.log(values.message);
                actions.resetForm();
            }}>
        
    </Formik>
  )
}

export default ChatBox