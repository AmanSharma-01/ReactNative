import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ApiFunctions from './APIs/ApiFunction';
import Colors from './Constants/Colors';
import {CompleteDataContext, ICompleteData, initialDataContext} from './Context/AllDataContext'
import TabNavigator from './Navigation/TabNavigator';
import SnackbarUtil, { EDuration } from './Utils/SnackBar';

const App = () => {
    const [shiftData, setShiftData] = useState<Array<ICompleteData>>([]);

    const getAllShiftsData = async () => {
        const res = await ApiFunctions.getAllShifts();
        if(res?.error) {
            SnackbarUtil.showSnackbar(`Error: ${res?.message}`, EDuration.Short, 'Hide', Colors.offWhite, Colors.darkRed);
        }else if(res && res.length > 0) {
            setShiftData(res);
        }
    }

    useEffect(() => {
        // fetch all the data
        getAllShiftsData();
    }, []);

    return (
        <View style={styles.container}>
            <CompleteDataContext.Provider
                value={{
                    ...initialDataContext,
                    completeData: shiftData,
                    getAllShiftsData: getAllShiftsData
                }}
            >
                <TabNavigator />
            </CompleteDataContext.Provider>
        </View>
    )
};

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    textStyle: {
      color: '#333'
    },
  });

export default App;
