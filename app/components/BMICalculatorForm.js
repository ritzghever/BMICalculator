import React from 'react';
import {StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class BMICalculatorForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            height: '',
            weight: '',
            isMetric: true,
            bmi:'',
            bmiCategory:'',
        };
    }

    clearFields = () => {
        this.setState({
            height: '',
            weight: '',
            isMetric: true,
            bmi: '',
            bmiCategory: '',
        });
    };

    // Toggle between Metric and Imperial
    toggleMeasurementSystem = () => {
        this.setState((prevState) => ({
            isMetric:!prevState.isMetric
        }));
    };

    calculateBMI = () => {
        const {height, weight, isMetric} = this.state;

        // Convert Meters to Centimeters if Metric and Meters to Inches if Imperial
        const heightInMeters = isMetric ? parseFloat(height) / 100 : parseFloat(height) * 0.0254;
        // Convert to Kilograms if Metric and Kilograms to Pounds if Imperial
        const weightInKilograms = isMetric ? parseFloat(weight) : parseFloat(weight) * 0.453592;
        // Calculate the BMI
        const bmi = weightInKilograms / (heightInMeters * heightInMeters);

        // BMI Category
        let bmiCategory = '';
        if (bmi < 18.50) {
            bmiCategory = 'Underweight';
        } else if (bmi < 24.9) {
            bmiCategory = 'Normal';
        } else if (bmi < 29.9) {
            bmiCategory = 'Overweight';
        } else if (bmi > 29.9) {
            bmiCategory = 'Obese';
        } else{
            bmiCategory = '';
        }

        this.setState({bmi, bmiCategory});
    };

    render(){
        return (
        <View style={styles.bmiform}>

        <Text style={styles.header}>BMI Calculator</Text>

        <View style={styles.switchcontainer}>
            <Text style={styles.switchlabelimperial}>Imperial</Text>
            <Switch
            value={this.state.isMetric}
            onValueChange={this.toggleMeasurementSystem}
            trackColor={{true: '#313544',false: '#313544'}}
            />
            <Text style={styles.switchlabelmetric}>Metric</Text>
        </View>

        <View style={styles.inputcontainer}>
        <Text style={styles.unittextheight}>Height : </Text>
            <TextInput 
                style={styles.textinput}
                value={this.state.height}
                onChangeText={(text) => this.setState({ height: text })}
            />
            <Text style={styles.unittextheight}>
            {this.state.isMetric ? 'cm' : 'in'}
            </Text>
        </View>
        
        <View style={styles.inputcontainer}>
            <Text style={styles.unittextweight}>Weight : </Text>
            <TextInput  
                style={styles.textinput} 
                value={this.state.weight}
                onChangeText={(text) => this.setState({ weight: text })}
            />
            <Text style={styles.unittextweight}>
                {this.state.isMetric ? 'kg' : 'lbs'}
            </Text>
        </View>

        <View style={styles.resultcontainer}>
            <Text style={styles.resulttextcategory}>{this.state.bmiCategory}</Text>
            <Text style={styles.resulttextbmi}>{this.state.bmi? this.state.bmi.toFixed(1): ''}</Text>
        </View>

        <TouchableOpacity style={styles.calculatebutton} onPress={this.calculateBMI}>
            <Text style={styles.buttontext}>Calculate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearbutton} onPress={this.clearFields}>
            <Text style={styles.buttontext}>Clear</Text>
        </TouchableOpacity>
        
        </View>
        );
    }
}

const styles = StyleSheet.create({
    bmiform: {
        alignSelf: 'stretch'
    },
    header:{
        alignSelf: 'center',
        fontSize: 20,
        color: '#cfc9c2',
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 50,
        borderColor: 'transparent',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        fontWeight: 'bold'
    },
    switchcontainer:{
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContents: 'center',
        marginBottom: 40,
    },
    switchlabelimperial:{
        color: '#e0af68',
        fontSize: 20,
        marginRight: 10,
        marginLeft: 10
    },
    switchlabelmetric:{
        color: '#9ece6a',
        fontSize: 20,
        marginRight: 10,
        marginLeft: 10
    },
    inputcontainer:{
        alignItems: 'center',
        flexDirection:'row',
        marginBottom: 10,
    },
    textinput: {
        textAlign: 'center',
        alignSelf: 'stretch',
        fontSize: 20,
        height: 40,
        width: 150,
        marginBottom: 10,
        marginRight : 10,
        padding: 10,
        color: '#d5d6db',
        borderColor: 'transparent',
        borderBottomColor: '#d5d6db',
        borderWidth: 1,
    },
    unittextheight:{
        color: '#d5d6db',
        fontSize: 20,
        marginBottom: 30,
    },
    unittextweight:{
        color: '#d5d6db',
        fontSize: 20,
        marginBottom: 30,
    },
    resultcontainer:{
        backgroundColor: '#1a1b25',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 40,
        margin: 5,
        height: 250,
    },
    resulttextcategory:{
        textAlign: 'center',
        color: '#565a6e',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resulttextbmi:{
        textAlign: 'center',
        color: '#d5d6db',
        fontSize: 80,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    calculatebutton: {
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#cfc9c2',
        marginTop: 20,
        width: 200,
        borderRadius: 10,
    },
    clearbutton: {
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#8c4351',
        marginTop: 20,
        width: 200,
        borderRadius: 10,
    },
    buttontext: {
    color: '#1a1b25',
    fontWeight: 'bold',
    fontSize: 15,
    }
});
