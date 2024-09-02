import React, { useContext, useState } from 'react';
import {
  VStack,
  ButtonGroup,
  Heading,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Text
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { formSchema } from '../../common';
import TextField from '../TextField';
import { useNavigate } from 'react-router';
import { AccountContext } from '../AccountContext';

const Login = () => {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  const [ error, setError ] = useState(null);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        const vals = { ...values };

        actions.resetForm();
        fetch('http://localhost:4000/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(vals),
        })
          .catch(err => {
            return;
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then(data => {
            if (!data) return;
            setUser({...data});
            if (data.status){
              setError(data.status);
            } else if (data.loggedIn) {
              navigate("/home");
            }
          });
      }}
    >
      {formik => (
        <VStack
          as="form"
          w={{ base: '90%', md: '500px' }}
          m="auto"
          justify="center"
          h="100vh"
          spacing="1rem"
          onSubmit={formik.handleSubmit}
        >
          <Heading>Log In</Heading>

          <Text as="p" color = "red.500" fontWeight={"bold"}>
            {error}
          </Text>

          <TextField
            name="username"
            placeholder="Enter Username"
            autoComplete="off"
            label="Username"
          />

          <TextField
            name="password"
            placeholder="Enter password"
            autoComplete="off"
            label="Password"
            type="password"
          />

          <ButtonGroup pt="1rem">
            <Button colorScheme="teal" type="submit">
              Log In
            </Button>
            <Button onClick={() => navigate('/register')}>Create Account</Button>
          </ButtonGroup>
        </VStack>
      )}
    </Formik>
  );
};

export default Login;