import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';
import { CategoryPicker } from './CategoryPicker';

//deleteTask
const Task = ({item, toggleTask, updateTask, updateCate }) => { //속성이 있는 경우 컴포넌트를 화살표 함수로 만드는 것이 편함. 속성값이 객체일 때 {}로 감쌈. 
    const [isEditing, setIsEditing] = useState(false); //isEditing 변수를 false로 초기화함.
    const [text, setText] = useState(item.text); //text 변수를 item의 text 값으로 초기화함.
    const [category, setChooseCate] = useState(item.category);
    const changeCateVisibility = (bool) => {
        setisCateVisible(bool)
    }
    const setCate = (cateoption) => {
        setChooseCate(cateoption);
        
    }

    useEffect ( () => {
        const editedCate = Object.assign({}, item, {category});
        updateCate(editedCate);
    }, [category] );
    
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

    return isEditing ? (
        <Input value={text} onChangeText={text => setText(text)}
        onSubmitEditing={_onSubmitEditing}
        onBlur={_onBlur}/>
    ) : (
        
        //Check - Uncheck
        <View style={taskStyle.container}>
                    <IconButton type={item.edit_check ? images.edit_check : images.edit_uncheck}
                        id={item.id} onPressOut={toggleTask} edit_check={item.edit_check} />

                    <Text style={[taskStyle.contents]}> {item.text} </Text>
                    <TouchableOpacity
                       onPress={() => changeCateVisibility(true)}>
                       <Text id = {item.id} value={category} style={btnStyles.CateIcon}>{item.category}</Text>
                    </TouchableOpacity>

                    <IconButton type={images.edit_list}></IconButton>
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
    toggleTask: PropTypes.func.isRequired,
};

export default Task;
