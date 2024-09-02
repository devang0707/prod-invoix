import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddInvoiceScreen from '../screens/AddInvoiceScreen';
import AddInvoiceTwoScreen from '../screens/AddInvoiceTwoScreen';
import AllInvoiceScreen from '../screens/AllInvoiceScreen';
import AllInvoiceTwoScreen from '../screens/AllInvoiceTwoScreen';
import UserCredScreen from '../screens/UserCredScreen';



export default function Navigation(){
    return(
    <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown:false}}>   
            <Stack.Screen  name="Home"  component={HomeScreen} />
            <Stack.Screen  name="Login"  component={LoginScreen} />
            <Stack.Screen  name="Register"  component={RegisterScreen} />
            <Stack.Screen  name="AddInvoice"  component={AddInvoiceScreen} />
            <Stack.Screen  name="AddInvoiceTwo"  component={AddInvoiceTwoScreen} />
            <Stack.Screen  name="AllInvoice"  component={AllInvoiceScreen} />
            <Stack.Screen  name="AllInvoiceTwo"  component={AllInvoiceTwoScreen} />
            <Stack.Screen  name="UserCred"  component={UserCredScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

