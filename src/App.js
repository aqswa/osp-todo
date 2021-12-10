import React from 'react'; 
import  StackNavigation  from './Stack';
import { NavigationContainer } from '@react-navigation/native';



const App = () =>{
    return(
    <NavigationContainer>
        <StackNavigation/>
    </NavigationContainer>
    );
};

export default App;