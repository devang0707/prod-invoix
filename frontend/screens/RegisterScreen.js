import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';  

export default function RegisterScreen({ route }) {

    const { setCurrentUser } = route.params;
    const navigation = useNavigation();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        const newUser = {
            username: username,
            email: email,
            password: password,
        };

        try {
            const res = await axios.post('http://192.168.1.3:8394/api/users/register', newUser);
            setError(false);
            setSuccess(true);
            await AsyncStorage.setItem('user', res.data.username);
            setCurrentUser(res.data.username);
        } catch (err) {
            console.log("Error registering user:", err.response ? err.response.data : err.message);
            setError(true);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigation.navigate('Home');
            }, 1000); 

            return () => clearTimeout(timer);
        }
    }, [success, navigation]);

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
            <SafeAreaView className='w-full mt-5'>
                <View className='flex-row items-center justify-between mx-4'>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='bg-amber-500 rounded-xl p-1'>
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View className='flex gap-[40px] my-[80px] mx-[10px]'>
                <Text className='text-[40px] font-bold items-center text-amber-500'>Sign Up</Text>

                <View className='flex flex-col gap-[30px]'>
                    <TextInput
                        onChangeText={setUsername}
                        className='border-[2px] py-[10px] px-[20px] rounded-[5px] bg-white'
                        placeholder='Username'
                        placeholderTextColor='#999'
                    />
                    <TextInput
                        onChangeText={setEmail}
                        className='border-[2px] py-[10px] px-[20px] rounded-[5px] bg-white'
                        placeholder='Email'
                        placeholderTextColor='#999'
                    />
                    <TextInput
                        onChangeText={setPassword}
                        className='border-[2px] p-[10px] rounded-[5px] bg-white'
                        placeholder='Password'
                        placeholderTextColor='#999'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={submit}>
                        <Text className='border-[1px] font-bold rounded-[5px] bg-amber-600 p-[10px] text-center text-[13px]'>Click to Register</Text>
                    </TouchableOpacity>

                    {success && <Text className='text-green-500'>Successfully Registered</Text>}
                    {error && <Text className='text-red-500'>Something's Wrong</Text>}
                </View>
            </View>
        </ScrollView>
    );
}
