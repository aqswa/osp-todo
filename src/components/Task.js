import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, Image, Pressable, Modal, TextInput, ImageEditor} from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';
import Input from './Input';
import { ModalPicker } from './ModalPicker';
import { btnStyles } from '../styles';
import { CategoryPicker } from './CategoryPicker';

const Task = ({item, deleteTask, toggleTask, updateTask, updateEmotion, updateCate}) => { //속성이 있는 경우 컴포넌트를 화살표 함수로 만드는 것이 편함. 속성값이 객체일 때 {}로 감쌈. 
    const [isEditing, setIsEditing] = useState(false); //isEditing 변수를 false로 초기화함.
    const [text, setText] = useState(item.text); //text 변수를 item의 text 값으로 초기화함.

    const _handleUpdateButtonPress = () => { //update 버튼이 눌리면 isEditing 변수를 true로 갱신함.
        setIsEditing(true);
    };
    const _onSubmitEditing = () => {
        if (isEditing) {
            const editedTask = Object.assign({}, item, {text}); //Object.assign() 메서드는 출처 객체들의 모든 열거 가능한 자체 속성을 복사해 대상 객체에 붙여넣습니다. 그 후 대상 객체를 반환합니다.
            setIsEditing(false);
            updateTask(editedTask);
        }
    };
    const _onBlur = () => {
        if(isEditing) {
            setIsEditing(false);
            setText(item.text);
        }
    };

    const [emotion, setChooseData] = useState(item.emotion);
    const [category, setChooseCate] = useState(item.category);

    const [isModalVisible, setisModalVisible] = useState(false);
    const [isCateVisible, setisCateVisible] = useState(false);
    const changeModalVisibility = (bool) => {
        setisModalVisible(bool)
    }
    const changeCateVisibility = (bool) => {
        setisCateVisible(bool)
    }

    const setData = (option) => {
        setChooseData(option);
        
    }

    useEffect ( () => {
        const editedEmotion = Object.assign({}, item, {emotion});
        updateEmotion(editedEmotion);
    }, [emotion] );

    const setCate = (cateoption) => {
        setChooseCate(cateoption);
        
    }

    useEffect ( () => {
        const editedCate = Object.assign({}, item, {category});
        updateCate(editedCate);
    }, [category] );
    

    return isEditing ? (
        <Input value={text} onChangeText={text => setText(text)}
        onSubmitEditing={_onSubmitEditing}
        onBlur={_onBlur}/>
    ) : (
        <View style={taskStyle.container}>
            <IconButton type={item.completed ? images.completed : images.uncompleted}
            id = {item.id} onPressOut = {toggleTask} completed={item.completed}/>
            <Text style={[taskStyle.contents,
                {color: (item.completed ? theme.done : theme.text)},
                {textDecorationLine: (item.completed? 'line-through' : 'none')}]}
                //editable = {item.completed? false : true}
                //selectTextOnFocus = {item.completed? false : true}
                //placeholder="Type your task"
                >
                {item.text}
            </Text>
            {item.completed || <IconButton type={images.update} id = {item.id} onPressOut={_handleUpdateButtonPress}/>}
            <IconButton type={images.delete} id = {item.id} onPressOut = {deleteTask}/>
            
            <TouchableOpacity
                onPress={() => changeModalVisibility(true)}>
                <Text id = {item.id} value={emotion} style={btnStyles.emotionIcon}>{item.emotion}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={() => changeCateVisibility(true)}>
                <Text id = {item.id} value={category} style={btnStyles.CateIcon}>{item.category}</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                nRequestClose={() => changeModalVisibility(false)}
            >
                <ModalPicker
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}
                    updateEmotion={updateEmotion}
                    emotion={emotion}
                    cTask={item}
                />
                
            </Modal>

            <Modal
                transparent={true}
                animationType='fade'
                visible={isCateVisible}
                nRequestClose={() => changeCateVisibility(false)}
            >
                <CategoryPicker
                    changeCateVisibility={changeCateVisibility}
                    setCate={setCate}
                    updateCate={updateCate}
                    category={category}
                    cTask={item}
                />
            </Modal>
        </View>

    );
};

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

Task.propTypes = {
    item: PropTypes.string.isRequired,
    deleteTask: PropTypes.func.isRequired,
    //updateCate: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
};

export default Task; //같은 파일에서 컴포넌트를 사용하려는 경우 컴포넌트를 내보내지 않아도 됨.
