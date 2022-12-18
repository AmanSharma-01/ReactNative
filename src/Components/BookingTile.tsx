import React, { useContext } from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ApiFunctions from '../APIs/ApiFunction';
import Colors from '../Constants/Colors';
import { CompleteDataContext, ICompleteData } from '../Context/AllDataContext';
import { EPath } from '../Screens/AvailableShifts';
import SnackbarUtil, { EDuration } from '../Utils/SnackBar';
import BookingButton from './BookingButton';
const moment = require('moment');

interface IProps {
    item: ICompleteData;
    path: EPath;
}

const BookingTile = ({item, path}: IProps) => {
    const {getAllShiftsData} = useContext(CompleteDataContext);
    const date: string = moment(item?.startTime).format("MMM Do YY");

    const getTime = (time: number): string => {
        const t = moment(time).format("HH:mm");
        return t;
    }

    const handlePress = async () => {
        if(item && item?.booked) {
            const res = await ApiFunctions.cancelSingleShift(item?.id);
            if(res && res?.error) {
                SnackbarUtil.showSnackbar(`Error: ${res?.message}`, EDuration.Short, 'Hide', Colors.offWhite, Colors.darkRed);
            }else if(res && !res?.error) {
                getAllShiftsData();
                // show snack bar with a success message.
                SnackbarUtil.showSnackbar(`Shift Cancelled Succesfully!`, EDuration.Short);
            }
        } else {
            const res = await ApiFunctions.bookSingleShift(item?.id);
            if(res && res?.error) {
                SnackbarUtil.showSnackbar(`Error: ${res?.message}`, EDuration.Short, 'Hide', Colors.offWhite, Colors.darkRed);
            }else if(res && !res?.error) {
                getAllShiftsData();
                // show snack bar with a success message.
                SnackbarUtil.showSnackbar(`Shift Booked Succesfully!`, EDuration.Short);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <View
                    style={[styles.iconContainer, {backgroundColor: Colors.mediumBlue}]}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
                    <View style={{width: '50%', justifyContent: 'flex-start'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View><Text style={styles.text}>{date}</Text></View>
                            <View style={styles.marginLeft}><Text style={styles.text}>{getTime(item?.startTime)} - {getTime(item?.endTime)}</Text></View>
                        </View>
                    </View>
                    <View style={{width: '40%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        {item?.booked ? (
                            <View style={{flex:1}}>
                                <Text style={styles.text}>
                                    {path === EPath.myShifts ? `${item?.area}` : `Booked`}
                                </Text>
                            </View>
                        ) : (
                            <View style={{flex:1}} />
                        )}

                        <View>
                            <BookingButton item={item} onPress={handlePress} />
                        </View>
                    </View>
                    
                </View>

            </View>

        </View>
    )
};

export default BookingTile;

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: Colors.offWhite,
        marginHorizontal: '.93rem',
        marginVertical: '.5rem',
        borderRadius: 4,
    },
    textContainer: {
        paddingRight: '1rem',
        flexDirection: 'row',
        flex: 1,
    },
    iconContainer: {
        height: '3rem',
        width: '.5rem',
        marginRight: '.5rem',
        borderBottomLeftRadius: '.4rem',
        borderTopLeftRadius: '.4rem',
    },
    titleText: {
        fontSize: '1rem',
        color: 'black',
        marginLeft: '.5rem',
        marginTop: '.2rem',
    },
    iconSize: {
        fontSize : '1.5rem',
    },
    text: {
        fontSize: '.7rem',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    }, 
    marginLeft: {
        marginLeft: '1rem'
    }
})