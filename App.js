import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MainApp from './src/App';
import { NavigationContainer } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');

const App = () => {

  EStyleSheet.build({
    $rem: width / 25,
  });

  return (
    <NavigationContainer>
        <SafeAreaView style={styles.backgroundStyle}>
          <MainApp />
        </SafeAreaView>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#fff', 
    flex: 1,
  }
});

export default App;
