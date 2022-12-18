import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import {View, Text, SectionList, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { CompleteDataContext, ICompleteData } from '../Context/AllDataContext';
import _ from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';
import BookingTile from '../Components/BookingTile';
import EmptyView from '../Components/EmptyView';
import { EPath } from './AvailableShifts';
import Colors from '../Constants/Colors';
const moment = require('moment');

interface ISectionData {
  data: Array<ICompleteData>;
  title: string;
};

interface IListHeader {
  section: ISectionData;
};


const MyShifts = (): JSX.Element => {
    const {completeData} = useContext(CompleteDataContext);
    const getDate = (singleItem): string =>  moment(singleItem?.startTime).format("MMM Do YY");
    const [sectionData, setSectionData] = useState<Array<ISectionData>>([]);

    useEffect(() => {
      getCompaniesList();
    }, [completeData]);

    const getCompaniesList = (): void => {
        const sectionListData = {};
        completeData.map(singleItem => {
            if(singleItem?.booked) {
                if (!_.isEmpty(sectionListData[getDate(singleItem)])) {
                    const data = sectionListData[getDate(singleItem)]?.data;
                    data.push(singleItem);
                    sectionListData[getDate(singleItem)] = {
                      title: getDate(singleItem),
                      data: data, //push the complete project data here
                    };
                  } else {
                    const data = [singleItem];
                    sectionListData[getDate(singleItem)] = {
                      title: getDate(singleItem),
                      data: data, //push the complete project data here
                    };
                  }
            }
          setSectionData(Object.values(sectionListData));
        });
      };

      const renderItem = ({item}: {item: ICompleteData}): JSX.Element => {
        return (
            <View>
                <BookingTile item={item} path={EPath.myShifts} />
            </View>
        );
      };

      const ListHeader = ({item}: {item: IListHeader}): JSX.Element => {
        const [openStatus, setOpenStatus] = useState(true);
        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                setOpenStatus(!openStatus);
              }}
              style={styles.listContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginLeft: 5}}>
                  <Text
                    style={styles.listHeader}>
                    {item?.section?.title} ({item?.section?.data?.length} shifts)
                  </Text>
                </View>
              </View>
              <View>
                <Ionicons
                  name={openStatus ? 'chevron-up' : 'chevron-down'}
                  size={styles._iconSize1.fontSize}
                  color={'black'}
                />
              </View>
            </TouchableOpacity>
            {/*list of shifts for particular date*/}
            <FlatList
              data={item?.section?.data}
              renderItem={openStatus ? renderItem : null}
              initialNumToRender={7}
              removeClippedSubviews={true}
            />
          </View>
        );
      };

    return (
        <View style={{flex: 1}}>
            <SectionList
              sections={sectionData}
              keyExtractor={(item, index) => item + index}
              renderItem={() => <></>}
              renderSectionHeader={section => <ListHeader item={section} />}
              ListEmptyComponent={<EmptyView />}
            />
          </View>
    )
};

const styles = EStyleSheet.create({
    listHeader: {
      fontSize: '1rem',
      color: Colors.black,
      marginTop: '.2rem',
    },
    listContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: '.95rem',
      marginBottom: '.5rem',
      paddingBottom: '.5rem',
      borderBottomWidth: 0.5,
      borderColor: Colors.gray,
    },
    iconSize: {
        fontSize: '1rem',
      },
      iconSize1: {
        fontSize: '1.3rem',
      },
      iconStyles: {
        marginLeft: '.5rem',
        alignSelf: 'center',
      },
  });

export default MyShifts;
