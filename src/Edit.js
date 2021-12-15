import React, { useState } from 'react'; 
import {StatusBar, SafeAreaView, Text, Dimensions, ScrollView, View} from 'react-native';
import {viewStyles, textStyles, iconStyles} from './styles';
import Task from './components/Task';
import IconButton from './components/IconButton';
import { images } from './images';
import { Button } from '@material-ui/core';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

export default function App() {

    const width = Dimensions.get('window').width;

    //to do list 화면에서 data 가져오기
    const [tasks, setTasks] = useState({ //tasks 배열의 초기값을 '1', '2'로 초기화
        '1': {id: '1', text: " #1", edit_check: false}, 
        '2': {id: '2', text: "#2", edit_check: false}, 
    });

    const [count, setCount] = useState(0);

    //Store data
    const _saveTasks = async tasks => {
        try{
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        }catch (e){
            console.error(e);
        }
    }
    //Load data
    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };

    const _selectAllTask = () => {
    
        const currentTasks = Object.assign({}, tasks);
        var cnt = count;
        var m= parseInt('2'); //task의 개수 받기

        if(cnt%2 == 0){
            for(var i=1; i<= m; i++){
                var j = String(i);
                if(currentTasks[j]['edit_check'] == false){
                    currentTasks[j]['edit_check'] = !currentTasks[j]['edit_check']; 
                    setTasks(currentTasks);
                }
            } 
        }      

        else {
            for(var i=1; i<= m; i++){
                var j = String(i);
                currentTasks[j]['edit_check'] = !currentTasks[j]['edit_check']; 
                setTasks(currentTasks);
            }
        }
        setCount(count+1);
        //_saveTasks({...tasks, ...newTaskObject}); 
    };
 

    const _edit_deleteTask = () => {
        const currentTasks = Object.assign({}, tasks); 
        var m= parseInt('2'); //task의 개수 받기

        for(var i=1; i <= m; i++){
            var j = String(i);
             if(currentTasks[j]['edit_check'] == true){
                delete currentTasks[j]; 
                //setTasks(currentTasks);
                console.log(j);
            }
        }setTasks(currentTasks);

    };

 
    const _edit_toggleTask = id => { 
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[id]['edit_check'] = !currentTasks[id]['edit_check']; //id가 id인 task의 check 여부를 토글함.
        setTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
        setCount(0);
    };


    return(
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" style={textStyles.statusBar}/>

            <View style={iconStyles.bottomicon}>  
                <IconButton type={images.left}/>
                <Text style={textStyles.title}>NOV 1</Text>
                <IconButton type={images.right}/>   
            </View>

            <Button  variant="outlined" color = "primary" onClick = {_selectAllTask} >
                 All  
            </Button>  
               
                <ScrollView width = {width-20}>

                    {Object.values(tasks).map(item => (
                        <Task key = {item.id} item={item}  
                        edit_toggleTask={_edit_toggleTask} edit_deleteTask={_edit_deleteTask}/>
                    ))}

                </ScrollView>
                <View style={iconStyles.bottom}>
                    <IconButton type={images.delete} onPressOut={_deleteTask}  />
                    <IconButton type={images.edit_save} />
                </View>
               
        </SafeAreaView>

    


    );


};

