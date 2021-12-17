
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
import {StatusBar, SafeAreaView, Text, Dimensions, ScrollView, View, Component} from 'react-native';
import {viewStyles, textStyles, iconStyles, btnStyles} from '../styles';
import Input from './Input';
import Task from './Task';
import IconButton from './IconButton';
import { images } from '../images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {useEffect} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FILTER_MAP = {
    0: () => true,
    1: item => !item.completed,
    2: item => item.completed
};
//const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function Main({navigation, route}) {

    //const navigation = useNavigation();
    
    const width = Dimensions.get('window').width;
    const [isReady, setIsReady] = useState(false);
    const [newTask, setNewTask] = useState(''); //const [값, 값을 변경하는 함수] = useState(상태의 초기 값)
    const [tasks, setTasks] = useState({ //tasks 배열의 초기값을 '1', '2'로 초기화
        '1': {id: '1', text: "Todo item #1", completed: false, emotion: '❔',category: ':', year: currentYear, month: currentMonth, day: currentDay}, //complete되지 않은 상태
        '2': {id: '2', text: "Todo item #2", completed: true, emotion: '❔',category: ':', year: currentYear, month: currentMonth, day: currentDay}, //complete한 상태
    });

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

    const SHOWSTATES = ['show all', 'incomplete', 'complete'];
    const [sortStateIndex, setSortStateIndex] = useState(0);

    const _addTask = () =>{ //iconButton onPressOUt에 대한 콜백 함수
        const ID = Date.now().toString(); //Javascript: Date.now() 메소드는 UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 반환
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false, emotion:'❔',category: ':', year: currentYear, month: currentMonth, day: currentDay}, 
        }; //생성된 시각이 id인 newTaskObject 생성.
        setNewTask(''); //newTask 값을 ''으로 갱신함
        _saveTasks({...tasks, ...newTaskObject}); //...: spread syntax.
    };

    const _deleteTask = id => { //_deleteTask 컴포넌트
        const currentTasks = Object.assign({}, tasks); //currentTasks 변수에 tasks 배열을 입력함
        delete currentTasks[id]; //currentTasks 중에서 id가 id인 task를 지움.
        _saveTasks(currentTasks); //tasks 배열을 currentTasks로 갱신함. 
    };

    const _toggleTask = id => { 
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[id]['completed'] = !currentTasks[id]['completed']; //id가 id인 task의 complete 여부를 토글함.
        _saveTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
    };

    const _updateTask = item => { //item을 속성으로 받는 컴포넌트
        const currentTasks = Object.assign({}, tasks); 
        currentTasks[item.id] = item; //넘겨받은 item의 id를 갖는 task를 item으로 변경함. 
        _saveTasks(currentTasks); //tasks 배열을 변경된 currentTasks로 갱신함. 
    };

    const _onBlur = () => {
        setNewTask(''); //newTask값을 ''으로 갱신함. 
    }

    const _handleTextChange = text => { //test를 속성으로 받는 컴포넌트
        setNewTask(text); //newTask값을 text로 갱신함. 
    };

    const _setSortStateIndex = () => {
        setSortStateIndex((sortStateIndex+1)%3);
    }
    
    const _updateEmotion = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    }
    
    const _updateCate = item =>{
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    }
 
    const [currentYear, setYear] = useState(route.params.dayYear)
    const [currentMonth, setMonth] = useState(route.params.dayMonth)
    const [currentDay, setDay] = useState(route.params.dayDay)

    const _setDateLeft = () => {
        if(currentDay==1){
            if((currentMonth-1) < 8){
                if((currentMonth-1) %2 ==1){
                    setMonth((currentMonth-1))
                    setDay(31)
                }
                else if((currentMonth-1) == 2) {
                    setMonth(currentMonth-1)
                    setDay(28)
                }
                else if((currentMonth-1) == 0){
                    setMonth(12)
                    setDay(31)
                }
                else{
                    setMonth((currentMonth-1))
                    setDay(30)
                }
            }
            else{
                if((currentMonth-1) %2 ==0){
                    setMonth((currentMonth-1))
                    setDay(31)
                }
                else{
                    setMonth((currentMonth-1))
                    setDay(30)
                }
            }
        }
        else
            setDay((currentDay-1));
    }

    const _setDateRight = () => {
        if(currentMonth<8) {
            if((currentMonth%2) == 1){
                if(currentDay==31){
                    setMonth((currentMonth+1)%12)
                    setDay(1);
                }
                else setDay((currentDay+1));
            }
            else {
                if(currentDay==30){
                    setMonth((currentMonth+1)%12)
                    setDay(1);
                }
                else if(currentMonth == 2 && currentDay == 28){
                    setMonth((currentMonth+1)%12)
                    setDay(1);
                }
                else setDay((currentDay+1));
            }
        }
        else{
            if((currentMonth%2) == 0){
                if(currentDay==31){
                    setMonth((currentMonth+1)%12)
                    setDay(1);
                }
                else setDay((currentDay+1));
            }
            else {
                if(currentDay==30){
                    if(currentMonth+1 == 12){
                        setMonth(12)
                        setDay(1);
                        
                    }
                    else{
                        setMonth((currentMonth+1)%12)
                        setDay(1);
                    }
                }
                else setDay((currentDay+1));
            }
        }
        
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) setIsReady(false);
    }, [isFocused]);

    //XML 마크업 구조에 {}로 자바스크립트 코드를 감싸는 형태의 문법
    //onSubmitEditing: submit 버튼이 눌리면 _addTask가 실행됨. 
    //onBlur: item이 focus를 잃으면 실행됨. 
    return isReady ? (
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar barStyle="light-content" style={textStyles.statusBar}/>
            <View style={btnStyles.bottomicon}>  
            <IconButton type={images.left} onPressOut={_setDateLeft}/>
            <Text style={textStyles.title}>{currentMonth}/{currentDay}</Text>
            <IconButton type={images.right} onPressOut={_setDateRight}/>
            </View>

            <TouchableOpacity style={btnStyles.selectall} onPress={_setSortStateIndex}>
            <Text style={textStyles.select}>{SHOWSTATES[sortStateIndex]}</Text>
            </TouchableOpacity>

                <ScrollView width = {width-20}>
                    {Object.values(tasks).filter(FILTER_MAP[sortStateIndex]).filter((item) => item.day === currentDay && item.month === currentMonth).map(item => (
                        <Task key = {item.id} item={item} deleteTask={_deleteTask}  //리액트 컴포넌트가 여러 컴포넌트를 구분하라 수 있도록 id값 설정
                        toggleTask={_toggleTask} updateTask={_updateTask} updateEmotion={_updateEmotion} updateCate={_updateCate}/>
                    ))}
                    <View style={btnStyles.bottomicon}>
                        <TouchableOpacity onPress = {() => navigation.push('editScreen',{
                                                dayYear: currentYear,
                                                dayMonth: currentMonth,
                                                dayDay: currentDay,
                        })}>
                            <IconButton type={images.update} />
                        </TouchableOpacity>
                    {/*<IconButton type={images.update} onPressOut={() => navigation.navigate('editScreen')}/>*/}
                    <IconButton type={images.add} onPressOut={_addTask}/>
                    </View>
                </ScrollView>
        </SafeAreaView>
    ) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish={()=> setIsReady(true)}
            onError={console.error}/>
    );
};
