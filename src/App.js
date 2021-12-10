<<<<<<< Updated upstream
import React, {useContext, useState} from 'react';
=======
import React, {useState} from 'react';
>>>>>>> Stashed changes
import {StatusBar, Text, Dimensions, ScrollView, View} from 'react-native';
import { SafeAreaInsetsContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ViewStyles, textStyles } from './styles';
import Input from './components/Input';
import { images } from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';
import Calendar from './components/Calendar';
import { theme } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchEngine from './components/Search_App'
import { ScreenStack } from 'react-native-screens';
<<<<<<< Updated upstream
import Category from './components/Category';
import Main from './components/Main';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import { TouchableOpacity } from 'react-native-gesture-handler';

>>>>>>> Stashed changes

function CalendarScreen(){
    return (
        <SafeAreaView style={ViewStyles.container}>
            <Calendar />
        </SafeAreaView>
    )
}

function SearchScreen(){
    return (
        <SafeAreaView style = {ViewStyles.container}>
            <SearchEngine/>
        </SafeAreaView>
    )
}

<<<<<<< Updated upstream
function categoryScreen(){
    return (
        <SafeAreaView style = {ViewStyles.container}>
            <Category />
        </SafeAreaView>
    )
}

function mainScreen(){
    return (
        <SafeAreaView style = {ViewStyles.container}>
            <Main />
        </SafeAreaView>
    )
}

const Stack = createStackNavigator();




export default function App(props){
=======
const Stack = createStackNavigator();

export default function App(){

    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState('');
    

    const [tasks, setTasks] = useState({
        '1' : {id: '1', text: "Todo item #1", completed: false},
        '2' : {id: '2', text: "Todo item #2", completed: false},
    });

    const _addTask = () => {
        alert(`Add: ${newTask}`);
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        setTasks({...tasks, ...newTaskObject});
    }

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    };

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        setTasks(currentTasks);
    };


    const _onBlur = () => {
        setNewTask('');
    };

    const _handleTextChange = text => {
        setNewTask(text);
    };
>>>>>>> Stashed changes


    return (
        <SafeAreaProvider>
        <NavigationContainer >
                <StatusBar barStyle="light-content" style={textStyles.statusBar}/>
                <Stack.Navigator initialRouteName="calendar" screenOptions = {{headerShown: false}}>
                    <Stack.Screen name = "calendar" component = {CalendarScreen} />
                    <Stack.Screen name = "SearchScreen" component = {SearchScreen} />
<<<<<<< Updated upstream
                    <Stack.Screen name = "CategoryScreen" component = {categoryScreen} />
                    <Stack.Screen name = "MainScreen" component = {mainScreen} />
=======
>>>>>>> Stashed changes
                </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
       
    );
<<<<<<< Updated upstream
};
=======
};
>>>>>>> Stashed changes
