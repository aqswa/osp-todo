import React from 'react'; 
import  StackNavigation  from './Stack';
import { NavigationContainer } from '@react-navigation/native';



const App_navi = () =>{
    return(
    <NavigationContainer>
        <StackNavigation/>
    </NavigationContainer>
    );
};

export default App_navi;