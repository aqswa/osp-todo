import React, {useState} from 'react';
import {StatusBar, View, Text, SafeAreaView, Dimensions, ScrollView} from 'react-native';
import {viewStyles, textStyles} from './styles';
import Input from './components/Input';
import {images} from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';
import { object } from 'prop-types';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';


export default function App() {
    const width =Dimensions.get('window').width;

    const [isReady, setIsReady] = useState(false);

    const [newTask, setNewTask] =useState('');

    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    };

    //function getRandomColor() {
      //  return "#" + Math.floor(Math.random() * 16777215).toString(16);
    //}

    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };

    //const [tasks, setTasks] = useState({
    //    '1': {id: '1', text: "Todo item #1", completed: false},
    //    '2': {id: '2', text: "Todo item #2", completed: true},
    //});

    const _addTask = ()=> {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };

        setNewTask('');
       // setTasks({...tasks, ...newTaskObject});
        _saveTasks({...tasks, ...newTaskObject});
    }

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
       // setTasks(currentTasks);
       _saveTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        //setTasks(currentTasks);
        _saveTasks(currentTasks);
    };

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        //setTasks(currentTasks);
        _saveTasks(currentTasks);
    };

    const _onBlur = () => {
        setNewTask('');
    };

    const _handleTextChange = text => {
        setNewTask(text);
    };
    function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777217).toString(16);
        //return "#" + Math.floor(Math.random() * 16777216).toString(16);
    }

    return isReady ? (
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" style={textStyles.StatusBar}/>
            <Text style = {textStyles.title}>Category</Text>
            <Input value={newTask} onChangeText={_handleTextChange}
            onSubmitEditing={_addTask} onBlur={_onBlur}/>
            <ScrollView width = {width-20}>
                {Object.values(tasks).reverse().map(item => (
                    <Task backstyle={getRandomColor()} key={item.id} item={item} deleteTask={_deleteTask}
                    toggleTask = {_toggleTask} updateTask={_updateTask}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    ) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish={()=>setIsReady(true)}
            onError={console.error}/>
    );
}
  
