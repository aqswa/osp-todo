import React, {useState} from 'react';
<<<<<<< Updated upstream
import {StyleSheet, View, Text, Button, TouchableOpacity, Image, Pressable, Modal} from 'react-native';
=======
import {StyleSheet, View, Text, Button, TouchableOpacity, Image, Pressable, Modal, TextInput, ImageEditor} from 'react-native';
>>>>>>> Stashed changes
import {theme} from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';
import Input from './Input';
import { ModalPicker } from './ModalPicker';
import { btnStyles } from '../styles';

const Task = ({item, deleteTask, toggleTask, updateTask}) => { //속성이 있는 경우 컴포넌트를 화살표 함수로 만드는 것이 편함. 속성값이 객체일 때 {}로 감쌈. 
    const [isEditing, setIsEditing] = useState(false); //isEditing 변수를 false로 초기화함.
    const [text, setText] = useState(item.text); //text 변수를 item의 text 값으로 초기화함.

    const _handleUpdateButtonPress = () => { //update 버튼이 눌리면 isEditing 변수를 true로 갱신함.
        setIsEditing(true);
    };
    const _onSubmitEditing = () => {
        if (isEditing) {
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

    const [chooseData, setChooseData] = useState('❔');
    const [isModalVisible, setisModalVisible] = useState(false);
    const changeModalVisibility = (bool) => {
        setisModalVisible(bool)
    }
    const setData = (option) => {
        setChooseData(option)
    }

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
<<<<<<< Updated upstream
                {textDecorationLine: (item.completed? 'line-through' : 'none')}]}>
                {item.text}</Text>
            {item.completed || (<IconButton type={images.update} onPressOut={_handleUpdateButtonPress}/>)}

=======
                {textDecorationLine: (item.completed? 'line-through' : 'none')}]}
                //editable = {item.completed? false : true}
                //selectTextOnFocus = {item.completed? false : true}
                //placeholder="Type your task"
                >
                    {item.text}
            </Text>
            {item.completed || <IconButton type={images.update} id = {item.id} onPressOut={_handleUpdateButtonPress}/>}
            <IconButton type={images.delete} id = {item.id} onPressOut = {deleteTask}/>
>>>>>>> Stashed changes
            <TouchableOpacity
                onPress={() => changeModalVisibility(true)}
            >
                <Text style={btnStyles.emotionIcon}>{chooseData}</Text>
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
    toggleTask: PropTypes.func.isRequired,
};

export default Task; //같은 파일에서 컴포넌트를 사용하려는 경우 컴포넌트를 내보내지 않아도 됨.