import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../Constants/Colors';
import { ICompleteData } from '../Context/AllDataContext';

interface IProps {
    item: ICompleteData;
    onPress: Function;
}

const BookingButton = ({item, onPress}: IProps): JSX.Element => {
    const getTitle = (): string => {
        if(item?.booked === true) {
            return 'Cancel'
        }
        return 'Book';
    };

    const getDisable = (): boolean => {
        const currentTime = Date.now();
        if(item?.startTime <= currentTime) {
            return true;
        }
        return false;
    }

    const getColor = (): string => {
        if(item?.booked === true) {
            return getDisable() ? Colors.gray : Colors.mediumRed;
        }
        return getDisable() ? Colors.gray : Colors.mediumGreen;
    }

    const handlePress = (): void => {
        getDisable() ? null : onPress();
    }


    return (
        <TouchableOpacity style={[styles.container, {borderColor: getColor()}]} onPress={handlePress}>
            <Text style={[styles.text ,{color: getColor()}]}>
                {getTitle()}
            </Text>
        </TouchableOpacity>
    )
};

export default BookingButton;

const styles = EStyleSheet.create({
    container: {
        borderWidth: '.1rem', 
        paddingHorizontal: '.3rem', 
        borderRadius: '.3rem', 
        paddingVertical: '.2rem',
    }, 
    text: {
        fontSize: '.9rem',
        fontWeight: 'bold'
    }
})
