import {Button, StyleSheet, Text, TextInput, View, Alert, PanResponder, ActivityIndicator} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';

const key = 'P7MVzVTNJP6qiMNzaHKBulK2p5WkkhvEsFaIgd5p' ;
type prop={
  navigation: NavigationProp<any,any>
}
type state={
  idValue: string, loader: boolean
}


export default class InputForm extends Component< prop, state>{
     // const [idValue, setIdValue] = useState('');
     // const [dataList, setDataList] = useState<any>();
     constructor(props : prop){
          super(props);
          this.state={
               idValue: '',
               loader: false
          }
     }

     setInputHandler(enteredText: any){
      if(isNaN(enteredText)){
        return;
      }
          this.setState({idValue: enteredText})
     }

     async apiHandler(){
          if(this.state.idValue===""){
            Alert.alert('Input Field Empty', 'Please enter the required input')
            return;
          }
          this.setState({loader: true})
          let name;

          try{
            
          const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${this.state.idValue}?api_key=${key}`);
          name = response.data.name;
          console.log(name)
        }
        catch(error){
          Alert.alert('Network issue', 'API call failed');
          this.setState({loader: false})
          this.setState({idValue: ''})
          return;
          
        }
        this.setState({loader: false})
          
          this.setState({idValue: ''})

          this.props.navigation.navigate('Display',{
            state:{ name: name}
          })
          

     }


     async randomApihandler() {
      const [maximum, minimum]= [19,0];
      var randomValue = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      this.setState({loader: true})
      let name;

      try{
      const response= await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${key}`);
      name = response.data.near_earth_objects[randomValue].name;
      console.log(name);
      }
      catch(error){
        Alert.alert('Network issue', 'API call failed');
        this.setState({loader: false});
        return;
      }

      this.setState({loader: false})

      this.props.navigation.navigate('Display',{
        state:{ name: name}
      })
    }

render(){
  return (
    <>
    <View style={styles.textContainer}>
        <Text style={styles.text}>Asteroid App</Text>
      </View>
    
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Enter ID</Text>
      </View>

      <TextInput
        placeholder="ENTER ASTEROID ID "
        onChangeText={this.setInputHandler.bind(this)}
        // onFocus={(abc)=>console.log(abc)}
        value={this.state.idValue}
        style={styles.textInput}
      />

      

      <View style={styles.buttonContainer}>
          <View style={{width: '35%', justifyContent: 'space-between'}}>
        <Button title="Search" onPress={this.apiHandler.bind(this)} />
          </View>
          <View style={{width: '60%', justifyContent: 'space-between' }}>
        <Button title="Generate Random" onPress={this.randomApihandler.bind(this)}/>
          </View>
      </View>
      <View style={styles.containerLoader}>
        <ActivityIndicator animating={this.state.loader} size="large" color='green' />
      </View>
    </View>
    </>
  );
}
}

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    // justifyContent: "center",
    marginBottom: 18
  },
     container:{ borderColor: 'black', borderWidth: 3,backgroundColor: '#b3b3ff' , marginHorizontal: 40 ,marginTop:100, borderRadius:8 , padding:6 },
     label:{ fontSize: 18, margin: 10, fontWeight:'bold'},

  textInput: {
    backgroundColor: 'white',
    height: 40,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer:{
     // margin: 15,
     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
     margin: 15,
     marginTop: 15,
     marginBottom: 5
  },
  textContainer:{
    marginTop: 90,
    // borderBottomColor: 'yellow',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 9,
    marginHorizontal: 50
  },
  text: {
    fontSize: 41,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },


});
