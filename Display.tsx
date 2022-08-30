import { Component, ReactNode } from "react";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";

type prop ={
     route : any
}

class Display extends Component<prop>{
     constructor(props: any){
          super(props);
     }
     render(){
          return(
               <View style={styles.nameContainer}>
                    <Text style={styles.name}>{this.props.route.params.state.name}</Text>
               </View>
          )
     }
}
export default Display;

const styles = StyleSheet.create({
     nameContainer:{
          flex: 1,
          // justifyContent: 'center',
          marginTop: 80,
          alignItems: 'center'
     },
     name:{
          color: 'yellow',
          fontSize: 30
     }
})