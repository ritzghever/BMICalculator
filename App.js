import React from 'react';
import {StyleSheet, View} from 'react-native';

import BMICalculatorForm from './app/components/BMICalculatorForm';
export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>

        <BMICalculatorForm />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50
  },
});
