import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';
import Input from './Input';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

const Task = ({backstyle, item, deleteTask, toggleTask, updateTask })=> {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.text); //이부분이 text 엔터 치면 set 되도록
    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    };
    const _onSubmitEditing = () => {
        if(isEditing) {
            const editedTask = Object.assign({}, item, {text});
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
    
    const taskStyle = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: backstyle,
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

    return isEditing? (
        <Input value= {text} onChangeText={text => setText(text)}
        onSubmitEditing={_onSubmitEditing}
        onBlur={_onBlur}/>
    ) : (
        <View style={taskStyle.container}>
            <IconButton type={item.completed ? images.completed : images.uncompleted}
            id = {item.id} onPressOut = {toggleTask} completed = {item.completed}/>
            <Text style={[taskStyle.contents,
            {color: (item.completed ? theme.done : theme.text)},
            {textDecorationLine: (item.completed? 'line-through' : 'none')}]}>
            {item.text}</Text>
            {item.completed || (<IconButton type = {images.update}
            onPressOut={_handleUpdateButtonPress} />)}
            <IconButton type={images.delete} id={item.id} onPressOut={deleteTask}
            completed={item.completed}/>
        </View>
    );
};

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

Task.prototype={
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
};

export default Task;
