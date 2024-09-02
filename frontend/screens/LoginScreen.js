import axios from 'axios' 
import React, { useRef, useState, useEffect } from 'react' 
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native' 
import { ChevronLeftIcon } from "react-native-heroicons/outline" 
import {styles} from '../styles'

import AsyncStorage from '@react-native-async-storage/async-storage' 




var {width , height} = Dimensions.get('window') 
const ios = Platform.OS == 'ios'  
const topMargin = ios ? '' : 'mt-3' 


export default function LoginScreen({ route }){

    const { setCurrentUser } = route.params 


    const navigation = useNavigation() 

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false) 

    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');

    //
    const submit = async () => {
        const user = {
            username: username,
            password: password,
        } 

        try {
            const res = await axios.post('http://192.168.1.3:8394/api/users/login', user) 
            AsyncStorage.setItem('user', res.data.username) 
            setCurrentUser(res.data.username) 
            setError(false)  
            setSuccess(true)           
        } 
        catch (err) {
            setError(true)
            setTimeout(() => {setError(false)}, 1000) 
        }
    } 

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigation.goBack();
            }, 1000); 

            return () => clearTimeout(timer);
        }
    }, [success, navigation]);


    return ( 
        <ScrollView contentContainerStyle={{paddingBottom:20}} className='flex-1 bg-neutral-900'>
            

                <SafeAreaView className = 'w-full mt-5'>

                    <View className = 'flex-row items-center justify-between mx-4'>
                        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-amber-500 rounded-xl p-1'>
                            <ChevronLeftIcon size='28' strokeWidth={2.5} color= 'white' />
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
    
            
                
                <View className = 'flex gap-[40px]  my-[80px] mx-[10px]'>
                    <Text className = 'text-[40px] font-bold items-center text-amber-500'>Sign In</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Register', {setCurrentUser: setCurrentUser})}>
                        <Text className = 'text-[10px] underline text-white'>Don't have an Account?  Click Here</Text>
                    </TouchableOpacity>

                    <View className = 'flex flex-col gap-[30px]'>
                        <TextInput
                        onChangeText={setUsername}
                        className = 'border-[2px] py-[10px] px-[20px] rounded-[5px] bg-white'
                        placeholder='Username'
                        placeholderTextColor='#999'
                        />
                        <TextInput
                        onChangeText={setPassword}
                        className = 'border-[2px] p-[10px] rounded-[5px] bg-white'
                        placeholder='Password'
                        placeholderTextColor='#999'
                        secureTextEntry={true}
                        />
                        <TouchableOpacity onPress={submit}>
                        <Text className = 'border-[1px] font-bold rounded-[5px] bg-amber-600 p-[10px] text-center text-[13px]'>Click to Login</Text>
                        </TouchableOpacity>

                        {success && <Text className='text-green-500'>Sign-in confirmed</Text>}
                        {error && <Text className = 'text-red-500'>Incorrect Username or Password</Text>}
                    </View>
            
                </View>
                    

        </ScrollView>
    )
}