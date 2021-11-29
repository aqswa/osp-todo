import React from 'react';
import {Pressable, StyleSheet, View, Image} from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import {images} from '../images';

const IconButton = ({type, onPressOut, id}) => { //IconButton 컴포넌트. type, onPressOut, id 속성을 가짐. 
    const _onPressOut = () => { //??
        onPressOut(id);
    };

    return (
        <Pressable onPressOut={_onPressOut}>
            <Image source={type} style={iconStyle.icon}/>
        </Pressable>
    );
};

IconButton.defaultProps = { //id가 없어도 에러 메시지 뜨지 않도록 함. 
    onPressOut: () => {},
};

const iconStyle = StyleSheet.create({
    icon: {
        tintColor: theme.text, //changes the color of all the non-transparent pixels to the tintColor
        width: 30,
        height: 30,
        margin: 10,
    },
    icon_large: {
        tintColor: theme.text, //changes the color of all the non-transparent pixels to the tintColor
        width: 50,
        height: 50,
        margin: 10,
    },
});

IconButton.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired, //type 속성의 타입은 images들 중 하나이고 반드시 있어야하는 속성
    onPressOut: PropTypes.func, //onPressOut의 타입은 function
    id: PropTypes.string, //id속성의 타입은 string
};

export default IconButton;