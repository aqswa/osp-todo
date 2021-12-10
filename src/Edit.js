import React, { useState } from 'react'; 
import {StatusBar, SafeAreaView, Text, Dimensions, ScrollView, View,Button} from 'react-native';
import {viewStyles, textStyles, iconStyles, btnStyles} from './styles';
import Task from './components/Edit_Task';
import IconButton from './components/IconButton';
import { images } from './images';
//import { Button } from '@material-ui/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();


function Edit() {
    const [isReady, setIsReady] = useState(false);
    const width = Dimensions.get('window').width;

    //to do list 화면에서 data 가져오기
    const [tasks, setTasks] = useState({ //tasks 배열의 초기값을 '1', '2'로 초기화
        '1': {id: '1', text: " #1", edit_check: false}, 
        '2': {id: '2', text: "#2", edit_check: false}, 
    });

    //_selectAllTask에 사용
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
        _saveTasks({...tasks, ...newTaskObject}); 
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
        _saveTasks({...tasks, ...newTaskObject});
    };

 
    const _edit_toggleTask = id => { 
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[id]['edit_check'] = !currentTasks[id]['edit_check']; //id가 id인 task의 check 여부를 토글함.
        setTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
        setCount(0);
        _saveTasks({...tasks, ...newTaskObject});
    };


    return  isReady ?(
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" style={textStyles.statusBar}/>

            <View style={btnStyles.bottomicon}>  
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
                <View style={btnStyles.bottom}>
                    <IconButton type={images.delete} onPressOut={_edit_deleteTask}  />
                    <IconButton type={images.edit_save} />
                </View>
               
        </SafeAreaView>

   ): (
    <AppLoading
        startAsync = {_loadTasks}
        onFinish={()=> setIsReady(true)}
        onError={console.error}/>
    );


};

export default Edit;