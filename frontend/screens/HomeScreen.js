import { StatusBar } from 'expo-status-bar' 
import React, { Component, useEffect, useState } from 'react'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import InvoiceManager from '../components/invoiceManager' 
import AffiliatedInstitute from '../components/affiliatedInstitute' 
import AffiliatedVendor from '../components/affiliatedVendor' 
import { useNavigation } from '@react-navigation/native' 
import Loading from '../components/loading' 

import AsyncStorage from '@react-native-async-storage/async-storage' 



const ios = Platform.OS == 'ios' 

export default function HomeScreen(){



    const [currentUser, setCurrentUser] = useState(null) 

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user') 
            if (storedUser) {
                setCurrentUser(storedUser) 
            }
        } 
        loadUser() 
    }, []) 

    const logout = async () => {
        await AsyncStorage.removeItem('user') 
        setCurrentUser(null) 
    } 
 
    const navigation = useNavigation() 





    return(
    <View className = 'flex-1 bg-neutral-800'>   

        <SafeAreaView className = {ios ? '-mb-2' : 'mb-3'}>

            <StatusBar style = 'light'/>

            <View className = 'flex-row items-center justify-between mx-4'>
                {
                    currentUser ? (<TouchableOpacity onPress={logout}><Text className = 'text-red-500'>Logout</Text></TouchableOpacity>)
                    : (<TouchableOpacity onPress={()=>navigation.navigate('Login', {setCurrentUser: setCurrentUser})}><Text className = 'text-white'>Sign In</Text></TouchableOpacity>)
                }
                <Text className = 'text-white text-3xl font-bold'><Text className = 'text-amber-500'>In</Text>voix</Text>
                {
                    currentUser ? (<View><TouchableOpacity onPress = {() => navigation.navigate('UserCred')}><Text className = 'text-amber-600'>Account</Text></TouchableOpacity></View>) 
                    : (<TouchableOpacity onPress={()=>navigation.navigate('Register', {setCurrentUser: setCurrentUser})}><Text className = 'text-white'>Register</Text></TouchableOpacity>)
                }
            </View>

        </SafeAreaView>



        <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle = {{paddingbutton: 10}}>

            <InvoiceManager />
            <AffiliatedInstitute />
            <AffiliatedVendor />
    
        </ScrollView>               
  


    </View>     
    )
}
