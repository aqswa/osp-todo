//Edit Screen
import React, { useState } from 'react'; 
import {StatusBar, SafeAreaView, Text, Dimensions, ScrollView, View} from 'react-native';
import {viewStyles, textStyles, iconStyles} from './styles';
import Input from './components/Input';
import Task from './components/Task';
import IconButton from './components/IconButton';
import { images } from './images';


import { Button } from '@material-ui/core';


export default function App() {

    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState(''); //const [값, 값을 변경하는 함수] = useState(상태의 초기 값)

    const [tasks, setTasks] = useState({ //tasks 배열의 초기값을 '1', '2'로 초기화
        '1': {id: '1', text: "edit #1", edit_check: false}, 
        '2': {id: '2', text: "edit #2", edit_check: false},
    });

    const _addInput = () =>{

    }

    const _addTask = () =>{ //_addTask stateless 컴포넌트
        alert('Add: ${newTask}'); 
        const ID = Date.now().toString(); //Javascript: Date.now() 메소드는 UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 반환
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, edit_check: false}, 
        }; //생성된 시각이 id인 newTaskObject 생성.
        setNewTask(''); //newTask 값을 ''으로 갱신함
        setTasks({...tasks, ...newTaskObject}); //...: spread syntax.
    };

    const _deleteTask = id => { //_deleteTask 컴포넌트
        const currentTasks = Object.assign({}, tasks); //currentTasks 변수에 tasks 배열을 입력함
        delete currentTasks[id]; //currentTasks 중에서 id가 id인 task를 지움.
        setTasks(currentTasks); //tasks 배열을 currentTasks로 갱신함. 
    };

    const _toggleTask = id => { 
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[id]['edit_check'] = !currentTasks[id]['edit_check']; //id가 id인 task의 complete 여부를 토글함.
        setTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
    };

    const _updateTask = item =>{ //item을 속성으로 받는 컴포넌트
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[item.id] = item; //넘겨받은 item의 id를 갖는 task를 item으로 변경함. 
        setTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
    };

    const _onBlur = () => {
        setNewTask(''); //newTask값을 ''으로 갱신함. 
    }

    const _handleTextChange = text => { //test를 속성으로 받는 컴포넌트
        setNewTask(text); //newTask값을 text로 갱신함. 
    };

    //XML 마크업 구조에 {}로 자바스크립트 코드를 감싸는 형태의 문법
    //onSubmitEditing: submit 버튼이 눌리면 _addTask가 실행됨. 
    //onBlur: item이 focus를 잃으면 실행됨. 
    return(
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" style={textStyles.statusBar}/>
            <View style={iconStyles.bottomicon}>  
            <IconButton type={images.left}/>
            <Text style={textStyles.title}>NOV 1</Text>
            <IconButton type={images.left}/>
            </View>
            <Button variant="outlined" color="primary" size="small"> Select All  </Button>
                <ScrollView width = {width-20}>
                    {Object.values(tasks).map(item => (
                        <Task key = {item.id} item={item} deleteTask={_deleteTask} 
                        toggleTask={_toggleTask} updateTask={_updateTask}/>
                    ))}
                    <View style={iconStyles.bottomicon}>
                    <IconButton type={images.delete}/>
                    <IconButton type={images.edit_save}/>
                    </View>
                </ScrollView>
        </SafeAreaView>
    );
};
