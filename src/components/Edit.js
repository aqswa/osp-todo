import React, { useState } from 'react'; 
import {StatusBar, SafeAreaView, Text, Dimensions, ScrollView, View,FlatList} from 'react-native';
import {viewStyles, textStyles, btnStyles} from '../styles';
import Edit_Task from './Edit_task';
import IconButton from './IconButton';
import { images } from '../images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading'; 

import { TouchableOpacity } from 'react-native-gesture-handler';


function Edit({navigation, route}) {
    //const navigation = useNavigation();
    //AsyncStorage.clear();
    const [isReady1, setIsReady1] = useState(false);
    const width = Dimensions.get('window').width;

    const [tasks, setTasks] = useState(tasks);
    //Using for select/deselect all
    const [count,setCount] = useState(0);
    //Using for Changing order of items
    const [num,setNum] = useState(10000);

    const [currentYear, setYear] = useState(route.params.dayYear)
    const [currentMonth, setMonth] = useState(route.params.dayMonth)
    const [currentDay, setDay] = useState(route.params.dayDay)

    //Store data
    const _saveTasks = async tasks => {
        try{
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        }catch (e){
            console.error(e);
        }
    }

    const _saveNum = async num => {
        try{
            await AsyncStorage.setItem('num', JSON.stringify(num));
            setNum(num);
        }catch (e){
            console.error(e);
        }
    }

    //Load data
    const _loadTasks = async () => {
        console.log('Edit loading')
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
        const loadedNum = await AsyncStorage.getItem('num');
        setNum(JSON.parse(loadedNum || '{}'));
    };

    const SHOWSTATES = ['select all', 'deselect all'];
    const [selectStateIndex, setSelectStateIndex] = useState(0);
    
    const _selectAllTask = () => {
        const currentTasks = Object.assign({}, tasks); 
        if(count%2==0){
            Object.values(currentTasks).map(item => {
                if(item.edit_check != true){
                    var id = item.id;    
                    console.log(id);
                    currentTasks[id]['edit_check'] = !currentTasks[id]['edit_check'];           
                }
            })
        }

        else{
            Object.values(currentTasks).map(item => {
                    var id = item.id;    
                    currentTasks[id]['edit_check'] = !currentTasks[id]['edit_check'];          
            })
        }
        setCount(count+1);
        setSelectStateIndex((selectStateIndex+1)%2);
        setTasks(currentTasks);
    };
 

    const _edit_deleteTask = () => {
        const currentTasks = Object.assign({}, tasks); 

        Object.values(currentTasks).map(item => {
            if(item.edit_check == true){
                var id = item.id;    
                delete currentTasks[id];
            }
        })
        
        _saveTasks(currentTasks);
    };

    const _edit_toggleTask = id => { 
        //console.log(currentTasks.key);
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[id]['edit_check'] = !currentTasks[id]['edit_check']; //id가 id인 task의 check 여부를 토글함.
        setCount(0);
        setTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함.     
    };

    const _edit_updateTask = item => { //item을 속성으로 받는 컴포넌트
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[item.id] = item; //넘겨받은 item의 id를 갖는 task를 item으로 변경함. 
        _saveTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
    };

    const _edit_updateCate = item =>{
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    }

     const _edit_change = id => { //_deleteTask 컴포넌트
        console.log('------------');
        alert("Move to the top");
        
        const currentTasks = Object.assign({}, tasks);
        var ID = num.toString();
        console.log(ID);

        const newTaskObject = {
            [ID]: {id: ID, text: currentTasks[id]['text'], completed: currentTasks[id]['completed'], emotion:currentTasks[id]['emotion'], category: currentTasks[id]['category'], 
            year: currentTasks[id]['year'], month: currentTasks[id]['month'], day: currentTasks[id]['day']},
        };
        delete currentTasks[id];

        _saveTasks({...currentTasks, ...newTaskObject}); //...: spread syntax.
        _saveNum(num-1);
        console.log('------------');
    };

    return isReady1 ? (
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" style={textStyles.statusBar}/>

            <View style={btnStyles.bottomicon}>  
                <Text style={textStyles.title}> {currentMonth}/{currentDay}</Text> 
            </View>

            
            <TouchableOpacity style={btnStyles.selectall} onPress={ _selectAllTask}>
            <Text style={textStyles.select}>{SHOWSTATES[selectStateIndex]}</Text>
            </TouchableOpacity>
           

          <ScrollView width = {width-20}>
              {Object.values(tasks).filter((item) => item.day === currentDay && item.month === currentMonth).map(item => (
                  <Edit_Task key = {item.id} item={item}  
                  edit_toggleTask={_edit_toggleTask} edit_deleteTask={_edit_deleteTask} edit_change={_edit_change} 
                  edit_updateTask={_edit_updateTask} edit_updateCate={_edit_updateCate}  />
              ))}
                
                  <View style={btnStyles.bottomicon}>
                    <IconButton type={images.delete} onPressOut={_edit_deleteTask}  />
                    <TouchableOpacity onPress={() => navigation.navigate( 'MainScreen', {
                                                tasks : tasks,                                        
                                                dayYear: currentYear,
                                                dayMonth: currentMonth,
                                                dayDay: currentDay,
                    })}>
                    <IconButton type={images.edit_save} />
         
                    </TouchableOpacity>
                </View>
          </ScrollView>
                
        </SafeAreaView>

   ): (
    <AppLoading
        startAsync = {_loadTasks}
        onFinish={()=> setIsReady1(true)}
        onError={console.error}/>
    );


};

export default Edit;