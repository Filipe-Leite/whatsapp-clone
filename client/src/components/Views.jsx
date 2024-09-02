import { Text } from "@chakra-ui/layout";
import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import PrivateRoutes from "./Login/PrivateRoutes";
import { AccountContext } from "./AccountContext";
import Home from "./Home/Home";

const Views = () => {
  const {user} = useContext(AccountContext);

  return user.loggedIn === null ? (
    
    <Text>Loading...</Text>

  ) : (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='*' element={<Login/>}/>
      <Route element={<PrivateRoutes/>}>
        <Route path='/home' element={<Home/>}/>
      </Route>
    </Routes>
  );
};

export default Views;