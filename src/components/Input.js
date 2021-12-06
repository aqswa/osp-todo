import React from "react";
import {StyleSheet, TextInput, Dimensions, View} from 'react-native';
import {theme} from '../theme';
import { images } from '../images';
import IconButton from './IconButton';

const Input = ({value, onChangeText, onSubmitEditing, onBlur}) => {
    return (
        <View style = {InputStyle.TextInput}>

        
        <TextInput 
            placeholder = "+ Add a task"
            placeholderTextColor = {theme.main}
            maxLength={20}
            keyboardAppearance="dark"
            value = {value} onChangeText= {onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur} >
        </TextInput>
       
        </View>
    );
};

const InputStyle = StyleSheet.create({
    TextInput: {
        fontSize: 25,
        width: Dimensions.get('window').width-100,
        height: 60,
        marginTop: 3,
        marginLeft: 3,
        paddingLeft: 15,
        paddingTop: 0,
        borderRadius: 10,
        backgroundColor: theme.itemBackground,
        color: theme.text,
        flexDirection: 'row',
        //justifyContent: 'flex-end',
    },
});

export default Input;