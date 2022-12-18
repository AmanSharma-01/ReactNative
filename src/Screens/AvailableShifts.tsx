import React, {useContext, useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {CompleteDataContext, ICompleteData} from '../Context/AllDataContext';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../Constants/Colors';
import BookingTile from '../Components/BookingTile';

export enum EPath {
    'Available' = 'Available',
    'myShifts' = 'MyShift',
}

let globalCity: string = '';

const AvailableShifts = () : JSX.Element => {
    const {completeData} = useContext(CompleteDataContext);
    const [recordPerCity, setRecordPerCity] = useState<Record<string, ICompleteData[]>>({});
    const [selectedCity, setSelectedCity] = useState<string>(globalCity)

    useEffect(() => {
        const citySet = new Set<string>();
        completeData.forEach(element => {
            citySet.add(element?.area);
        });
        const cityArray : Array<string> = Array.from(citySet);
        if(!globalCity){
            setSelectedCity(cityArray[0])
            globalCity = cityArray[0]// sets the selectedCity as zero'th element
        }
        const record : Record<string, Array<ICompleteData>> = {};
        cityArray.map((city : string) => {
            record[city] = completeData?.filter(data => data.area === city)
        });
        setRecordPerCity(record);
    }, [completeData])

    const renderItems = ({item}: {item : ICompleteData}): JSX.Element => {
        return (
            <View key = {item.id}>
                <BookingTile item={item} path={EPath.Available} />
            </View>
        );
      };

    const onPressHeader = (city : string) : void => {
         setSelectedCity(city);
         globalCity = city;
    }

    return (
        <View>

            <ScrollView horizontal>
                {Object.keys(recordPerCity).map((city: string)=>
                    <TouchableOpacity key={city} onPress={() => onPressHeader(city)}>
                        <Text style={[styles.headerText, {color: selectedCity === city ? Colors.activeTint : Colors.gray}]}>{`${city} (${recordPerCity[city]?.length})`}</Text>
                    </TouchableOpacity>

                )}
            </ScrollView>

            <FlatList
              data={recordPerCity[selectedCity]}
              keyExtractor={(item) => item?.id.toString()}
              renderItem={renderItems}
              contentContainerStyle={styles.flatList}
            />
        </View>
    )
};

const styles = EStyleSheet.create({
    headingAndIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '.5rem',
    },
    headerText: {
        fontSize: '1.4rem',
        color : Colors.gray,
        padding: '.6rem',
    },
    text: {
        textAlign: 'center',
        color: Colors.darkBlue,
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    iconContainer: {
        backgroundColor:'white',
        padding: '.5rem',
        borderRadius: '.3rem'
    },
    icon: {
        fontSize: '1.2rem'
    },
    flatList: {
        paddingBottom: '6rem'
    }
});

export default AvailableShifts;
