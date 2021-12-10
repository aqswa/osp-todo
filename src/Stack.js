import React from 'react'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import App from './App';
import Edit from './Edit';

const Stack = createNativeStackNavigator();

const StackNavigation = () =>{
    return(
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name = "Home" component={App} />
        <Stack.Screen name = "Edit" component={Edit} />
    </Stack.Navigator>
    );
};

export default StackNavigation;