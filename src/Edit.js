import React, { useState, useEffect } from 'react'; 
import {StatusBar, SafeAreaView, Text, Dimensions, ScrollView, View, Button} from 'react-native';
import {viewStyles, textStyles, iconStyles} from './styles';
import Task from './components/Task';
import IconButton from './components/IconButton';
import { images } from './images';

//import { Button } from '@material-ui/core';


export default function editScreen() {

    const width = Dimensions.get('window').width;
    const [tasks, setTasks] = useState({ //tasks 배열의 초기값을 '1', '2'로 초기화
        '1': {id: '1', text: " #1", edit_check: false}, 
        '2': {id: '2', text: "#2", edit_check: false}, 
    });
    const [count, setCount] = useState(0);

    const _selectAllTask = () => {
    
        const currentTasks = Object.assign({}, tasks);
        var m= parseInt('2'); //task의 개수 받기
    
        if(count%2 == 0){console.log("select Enter "+selectAll);
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
    };


    const _deleteTask = id => { //_deleteTask 컴포넌트
        const currentTasks = Object.assign({}, tasks); //currentTasks 변수에 tasks 배열을 입력함
        var m= parseInt('2'); //task의 개수 받기

        for(var i=1; i <= m; i++){
            var j = String(i);
             if(currentTasks[j]['edit_check'] == true){
                delete currentTasks[j]; 
                setTasks(currentTasks);
            }
        }
    };

    const _toggleTask = id => { 
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[id]['edit_check'] = !currentTasks[id]['edit_check']; //id가 id인 task의 check 여부를 토글함.
        setTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
        setCount(count=0);
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
                        toggleTask={_toggleTask} deleteTask={_deleteTask}/>
                    ))}

                </ScrollView>
                <View style={iconStyles.bottom}>
                    <IconButton type={images.delete}   onPressOut={_deleteTask}  />
                    <IconButton type={images.edit_save} />
                </View>
               
        </SafeAreaView>

    );

};