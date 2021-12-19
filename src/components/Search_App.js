/*This is an Example of SearchBar in React Native*/
import React, {useState, useEffect} from 'react';
import { StatusBar, FlatList, Text, SafeAreaView, StyleSheet, View, TextInput, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';
import { images } from "../images";
import IconButton from "./IconButton";
import { textStyles, viewStyles, btnStyles, barStyles } from "../styles";
import { ScrollView } from 'react-native-gesture-handler';
//import { SearchBar } from 'react-native-elements';

const Input = ({value, onChangeText, onSubmitEditing, onBlur}) => {
    return (
        <View style = {taskStyle.TextInput}>
        <TextInput 
            placeholder = "Search a task"
            placeholderTextColor = {theme.main}
            maxLength={20}
            keyboardAppearance="dark"
            value = {value} onChangeText= {onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur} >
        </TextInput> 
        </View>
    );
};

const Task = ({item, toggleTask, deleteTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState('');
    const [emotion, setChooseData] = useState(item.emotion);
    const [category, setChooseCate] = useState(item.category);

    const _handleUpdateButtonPress = () => { //update 버튼이 눌리면 isEditing 변수를 true로 갱신함.
        setIsEditing(true);
    };
    const _onBlur = () => {
        if(isEditing) {
            setIsEditing(false);
            setText(search);
        }
    };

    return(
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

const Search = () => {
    const width = Dimensions.get('window').width;

    const [tasks, setTasks] = useState({});
    const [isReady, setIsReady] = useState(false);
    const [search, setSearch] = useState('');

    
    const _saveTasks = async tasks => {
        try{
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        }catch (e){
            console.error(e);
        }
    }


    const _saveSearch = text => {
        setSearch(text);
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

    const _updateSearch = () => { //item을 속성으로 받는 컴포넌트
        const currentSearch = Object.assign({}, tasks); 
        currentSearch = 
        _saveTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
    };

    return isReady? (
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" />
            <View style = {taskStyle.searchcontainer}>
                <Input value = {search} onChangeText={_saveSearch} />
                <IconButton type={images.search} />
        </View>
            <ScrollView width = {width-20}>
                {Object.values(tasks).filter((item) => !item.text.indexOf(search)).map(item =>
                <Task key = {item.id} item = {item} deleteTask={_deleteTask} toggleTask={_toggleTask}/> 
                )}

            </ScrollView>
        </SafeAreaView>
    ): (
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
    TextInput: {
        fontSize: 25,
        width: Dimensions.get('window').width-75,
        height: 60,
        marginTop: 3,
        marginLeft: 3,
        paddingLeft: 15,
        paddingTop: 0,
        borderRadius: 10,
        backgroundColor: theme.itemBackground,
        color: theme.text,
        flexDirection: 'row',
        //justifyContent: 'flex-end',
    },
    searchcontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: theme.itemBackground,
        borderRadius: 10,
        padding: 0,
        marginTop: 3
    },
});

export default Search;