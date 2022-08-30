import { ImageBackground, StyleSheet } from 'react-native';
import InputForm from './screens/InputForm';
import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Display from './screens/Display';

const Stack = createNativeStackNavigator();
const navtheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

class App extends Component{

  render(){
  return (
    <>
      
      <ImageBackground source={require('./image/ast5.jpg')} resizeMode='cover' imageStyle={{opacity: 0.90}} style={{flex: 1}} >
      
      
      <NavigationContainer theme={navtheme}>

          <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#b3b3ff'}}}>
              <Stack.Screen name='Home' component={InputForm} />
              <Stack.Screen name='Display' component={Display} />
          </Stack.Navigator>

      </NavigationContainer>
       
      </ImageBackground>
      
    </>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  formContainer: {
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
