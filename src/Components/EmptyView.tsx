// @ts-ignore
import React from 'react';
// @ts-ignore
import EStyleSheet from 'react-native-extended-stylesheet';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../Constants/Colors';

const EmptyView = (): JSX.Element => {
  return (
      <View style={styles.containerEmptyComponent}>
        <Text style={styles.emptyMessageStyle}>
          {'No Shifts Yet\n'}
        </Text>
        <View style={styles.containerSVG}>
          <Icon
            name="folderopen"
            size={styles._iconSize.fontSize}
            color={'black'}
          />
        </View>
        <Text
          style={[
            styles.emptyMessageStyleMiddle
          ]}>
          {'Go to Available Shifts to book the shifts'}
        </Text>
      </View>
  );
};

export default EmptyView;

const styles = EStyleSheet.create({
  containerSVG: {
    alignItems: 'center',
    marginBottom: 20,
  },
  containerEmptyComponent: {
    flex: 1,
  },
  emptyMessageStyle: {
    textAlign: 'center',
    fontSize: '1.8rem',
    color: Colors.black,
    marginTop: '50%',
  },
  emptyMessageStyleMiddle: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: Colors.black,
    paddingHorizontal: '10%',
  },
  emptyMessageStyleBottom: {
    textAlign: 'center',
    fontSize: '0.8rem',
    color: 'gray',
    paddingHorizontal: '10%',
  },
  iconSize: {
    fontSize: '3.5rem',
  },
});
