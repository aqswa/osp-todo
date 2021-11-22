import React, { useState } from 'react'; //JSX(Javascript + eXtensible Markup Language) 구문이 있는 코드에 필요한 import문 
//react는 오픈 소스 자바스크립트 라이브러리(페이스북이 지원)
//리액트는 가상 DOM을 사용해 기존 DOM을 대체함. 변경 전후의 가상 DOM을 비교해 차이만 실제 DOM에 적용하는 방식. 
/**
 * View: 리액트 네이티브 컴포넌트 UI 생성 시 가장 기본이 되는 조립 블록. HTML 태그의 div 태그와 비슷함. 
 * Text: HTML 태그의 span 태그와 비슷함. 
 * react와 react-native 패키지는 npm 모듈을 이용해서 사용할 수 있음. 
 * 리액트 네이티브는 컴포넌트 속성이 바뀌면 이를 즉각 화면에 반영해야 함.
 * 리액트와 리액트 네이티브에서 속성은 '클래스 속성 + 재렌더링'을 의미하는 용어. 
 * */
import {StatusBar, SafeAreaView, Text, Dimensions, ScrollView, View} from 'react-native';
import {viewStyles, textStyles, iconStyles} from './styles';
import Input from './components/Input';
import Task from './components/Task';
import IconButton from './components/IconButton';
import { images } from './images';
//hi
export default function App() {

    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState(''); //const [값, 값을 변경하는 함수] = useState(상태의 초기 값)

    const [tasks, setTasks] = useState({ //tasks 배열의 초기값을 '1', '2'로 초기화
        '1': {id: '1', text: "Todo item #1", completed: false}, //complete되지 않은 상태
        '2': {id: '2', text: "Todo item #2", completed: true}, //complete한 상태
    });

    const _addInput = () =>{

    }

    const _addTask = () =>{ //_addTask stateless 컴포넌트
        alert('Add: ${newTask}'); 
        const ID = Date.now().toString(); //Javascript: Date.now() 메소드는 UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 반환
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false}, 
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
        currentTasks[id]['completed'] = !currentTasks[id]['completed']; //id가 id인 task의 complete 여부를 토글함.
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
            <Text style={textStyles.title}>NOV 11</Text>
            <IconButton type={images.right}/>
            </View>
            <Text style={textStyles.select}>select all</Text>

                <ScrollView width = {width-20}>
                    {Object.values(tasks).map(item => (
                        <Task key = {item.id} item={item} deleteTask={_deleteTask} 
                        toggleTask={_toggleTask} updateTask={_updateTask}/>
                    ))}
                    <View style={iconStyles.bottomicon}>
                    <IconButton type={images.update}/>
                    <IconButton type={images.add} onPressOut={_addTask}/>
                    </View>
                </ScrollView>
        </SafeAreaView>
    );
};
