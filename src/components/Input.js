import React from "react";
import {Dimensions, StyleSheet, TextInput} from 'react-native';
import {theme} from '../theme';

const Input = ({value, onChangeText, onSubmitEditing, onBlur}) => {
    return (
        <TextInput style={inputStyle.textInput}
        placeholder= "+ Add a task"
        placeholderTextColor= {theme.main}
        maxLength={20}
        keyboardAppearance="dark"
        value={value} onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}>
        </TextInput>
    );
};

const inputStyle = StyleSheet.create({
    textInput: {
        fontSize: 25,
        width: Dimensions.get('window').width-20,
        height: 30,
        marginTop: 10,
        marginLeft: 3,
        paddingLeft: 15,
        paddingTop:2,
        borderRadius: 10,
        backgroundColor: theme.itemBackground,
        color: theme.text,
    },
});

export default Input;