import React, { useState } from "react";
import { StatusBar, Pressable, StyleSheet, View,Text, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { theme } from "../theme";
import PropTypes from 'prop-types';
import { images } from "../images";
import IconButton from "./IconButton";
import { btnStyles, barStyles } from '../styles';
import { textStyles, viewStyles } from "../styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import { filter } from "dom-helpers";


const Task = ({item, toggleTask, deleteTask}) => {
    const [text, setText] = useState(item.text); //text 변수를 item의 text 값으로 초기화함.
    const [emotion, setChooseData] = useState(item.emotion);
    return (
        <View style = {taskStyle.container}>
            <IconButton type={item.completed ? images.completed : images.uncompleted}
            id = {item.id} onPressOut = {toggleTask} completed={item.completed}/>
            <Text style={[taskStyle.contents,
                {color: (item.completed ? theme.done : theme.text)},
                {textDecorationLine: (item.completed? 'line-through' : 'none')}]}
                >
                {item.text}
            </Text>
            <Text id = {item.id} value={emotion} style={btnStyles.emotionIcon}>{item.emotion}</Text>
            <IconButton type={images.delete} id = {item.id} onPressOut = {deleteTask}/>
        </View>
    )
}

const Category = () => {

    const width = Dimensions.get('window').width;
    const [tasks, setTasks] = useState({});
    const [isReady, setIsReady] = useState(false);

    const _saveTasks = async tasks => {
        try{
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        }catch (e){
            console.error(e);
        }
    }
    
    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };

    const _toggleTask = id => { 
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[id]['completed'] = !currentTasks[id]['completed']; //id가 id인 task의 complete 여부를 토글함.
        _saveTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
    };
    const _deleteTask = id => { //_deleteTask 컴포넌트
        const currentTasks = Object.assign({}, tasks); //currentTasks 변수에 tasks 배열을 입력함
        delete currentTasks[id]; //currentTasks 중에서 id가 id인 task를 지움.
        _saveTasks(currentTasks); //tasks 배열을 currentTasks로 갱신함. 
    };

    const SHOWSTATES = ['All','Study', 'Daily', 'Health', 'Work', 'Buddy', 'Etc'];
    const [sortStateIndex, setSortStateIndex] = useState(0);
    const _setSortStateIndex = () => {
        setSortStateIndex((sortStateIndex+1)%7);
    }


    return isReady ?(
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" style = {barStyles.statusbar} />
            <ScrollView width={width-20}>
                <Text style = {textStyles.select}> Study </Text>
                {Object.values(tasks).filter((item) => item.category == 'Study').map(item =>
                <Task key = {item.id} item = {item} deleteTask={_deleteTask} toggleTask={_toggleTask}/> 
                )}
                <Text style = {textStyles.select}> Daily </Text>
                {Object.values(tasks).filter((item) => item.category == 'Daily').map(item =>
                <Task key = {item.id} item = {item} deleteTask={_deleteTask} toggleTask={_toggleTask}/> 
                )}
                <Text style = {textStyles.select}> Health </Text>
                {Object.values(tasks).filter((item) => item.category == 'Health').map(item =>
                <Task key = {item.id} item = {item} deleteTask={_deleteTask} toggleTask={_toggleTask}/> 
                )}
                <Text style = {textStyles.select}> Work </Text>
                {Object.values(tasks).filter((item) => item.category == 'Work').map(item =>
                <Task key = {item.id} item = {item} deleteTask={_deleteTask} toggleTask={_toggleTask}/> 
                )}
                <Text style = {textStyles.select}> Buddy </Text>
                {Object.values(tasks).filter((item) => item.category == 'Buddy').map(item =>
                <Task key = {item.id} item = {item} deleteTask={_deleteTask} toggleTask={_toggleTask}/> 
                )}
                <Text style = {textStyles.select}> Etc </Text>
                {Object.values(tasks).filter((item) => item.category == 'Etc').map(item =>
                <Task key = {item.id} item = {item} deleteTask={_deleteTask} toggleTask={_toggleTask}/> 
                )}
                <Text style = {textStyles.select}> None Select </Text>
                {Object.values(tasks).filter((item) => item.category == ':').map(item =>
                <Task key = {item.id} item = {item} deleteTask={_deleteTask} toggleTask={_toggleTask}/> 
                )}
            </ScrollView>

        </SafeAreaView>
    ) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish={()=> setIsReady(true)}
            onError={console.error}/>
        );
}

const taskStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.itemBackground,
        borderRadius: 10,
        padding: 5,
        marginTop: 3,
        marginLeft: 0,
    },

    contents: {
        flex: 1,
        fontSize: 24,
        color: theme.text,
    },

});
export default Category;