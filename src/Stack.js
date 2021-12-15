import React from 'react'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Main from './Main';
import Edit from './Edit';

const Stack = createNativeStackNavigator();

const StackNavigation = () =>{
    return(
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name = "Home" component={Main} />
        <Stack.Screen name = "Edit" component={Edit} />
    </Stack.Navigator>
    );
};

export default StackNavigation;