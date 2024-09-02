import React, { Component, useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import AsyncStorage from '@react-native-async-storage/async-storage' 


const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function UserCredScreen() {


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



    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>

            <SafeAreaView className='w-full mt-5'>
                <View className='flex-row items-center justify-between mx-4'>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='bg-amber-500 rounded-xl p-1'>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView className="max-w-3xl flex text-white mx-[50px] my-[30px] border border-gray-300 p-5">
                {/* Invoice Header */}
                <View className="text-center mb-6">
                    <Text className="text-2xl text-amber-500 text-center font-bold"><Text className = 'text-white'>Welcome</Text> {currentUser}!</Text>
                </View>

                <View>
                    <Image
                        source={{uri: "https://solareximaging.com/wp-content/uploads/2016/04/Blank-Avatar.png"}}
                        style = {{width: width*0.6 , height: height*0.4}}
                        className = 'rounded-3xl'
                    />
                </View>

                {/* Invoice Info */}
                <View className="flex gap-[20px] my-6 w-[65vw]">
                
                        <TouchableOpacity className='bg-amber-500 p-3 rounded'>
                            <Text className="text-black font-bold text-center font-bold">Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-amber-500 p-3 rounded'>
                            <Text className="text-black font-bold text-center font-bold">User Manual</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-amber-500 p-3 rounded'>
                            <Text className ="text-black font-bold text-center font-bold">Help & Feedback</Text>
                        </TouchableOpacity>
                    
                </View>

            </ScrollView>

            
        </ScrollView>
    );
}
