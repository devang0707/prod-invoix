import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import AsyncStorage from '@react-native-async-storage/async-storage' 



var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function AddInvoiceScreen() {

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

    const [rows, setRows] = useState([{ description: '', quantity: 0, unitPrice: 0, amount: 0 }]);
    const [tax, setTax] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);

    const handleAddRow = () => {
        setRows([...rows, { description: '', quantity: 0, unitPrice: 0, amount: 0 }]);
    };

    const handleDeleteRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
        calculateSubtotal(newRows);
    };

    const handleRowChange = (index, field, value) => {
        const newRows = [...rows];
    
        if (field === 'quantity' || field === 'unitPrice') {
            const numericValue = parseFloat(value);
            newRows[index][field] = isNaN(numericValue) ? 0 : numericValue;
        } 
        else {
            newRows[index][field] = value;
        }
    
        if (field === 'quantity' || field === 'unitPrice') {
            newRows[index].amount = newRows[index].quantity * newRows[index].unitPrice;
        }
    
        setRows(newRows);
        calculateSubtotal(newRows);
    };


    const calculateSubtotal = (newRows) => {
        const newSubtotal = newRows.reduce((sum, row) => sum + (row.amount || 0), 0);
        setSubtotal(newSubtotal);
        setTotal(newSubtotal + (newSubtotal * (parseFloat(tax) / 100)));
    };



    const handleTaxChange = (value) => {
        const taxValue = parseFloat(value);
        setTax(isNaN(taxValue) ? 0 : taxValue);
        setTotal(subtotal + (subtotal * (isNaN(taxValue) ? 0 : taxValue) / 100));
    };



    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [setDate, setSetDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cityStateZip, setCityStateZip] = useState('');

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false) 

    const submit = async () => {
        const invoice = {
            currentUser: currentUser,
            invoiceNumber: invoiceNumber,
            setDate: setDate,
            dueDate: dueDate,
            phone: phone,
            billTo: {
                name: name,
                address: address,
                cityStateZip: cityStateZip
            },
            items: rows.map(row => ({
                description: row.description,
                quantity: row.quantity,
                unitPrice: row.unitPrice
            })),
            taxPercentage: tax
        };
    
        try {
            const res = await axios.post('http://192.168.1.3:8394/api/invoices', invoice);
            setError(false)  
            setSuccess(true) 
            setTimeout(() => setSuccess(false), 1500);
        } catch (err) {
            setError(true)
            setTimeout(() => setError(false), 1500);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
            <SafeAreaView className='w-full mt-5'>
                <View className='flex-row items-center justify-between mx-4'>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='bg-amber-500 rounded-xl p-1'>
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView className="max-w-3xl text-white mx-auto my-[30px] border border-gray-300 p-5">
                <View className="text-center mb-6">
                    <Text className="text-2xl text-amber-500 font-bold">INVOICE</Text>
                </View>

                <View className="flex justify-between mb-6">
                    <View>
                        <View className="my-2 flex-row items-center">
                            <Text className="font-semibold text-white">Invoice #:</Text>
                            <TextInput onChangeText={setInvoiceNumber} placeholder="001" className="ml-2 p-2 border border-gray-300 rounded w-20 bg-white" />
                        </View>
                        <View className="my-2 flex-row items-center">
                            <Text className="font-semibold text-white">Set Date:</Text>
                            <TextInput onChangeText={setSetDate} placeholder="DD-MM-YYYY" className="ml-2 p-2 border border-gray-300 rounded bg-white" />
                        </View>
                        <View className="my-2 flex-row items-center">
                            <Text className="font-semibold text-white">Due Date:</Text>
                            <TextInput onChangeText={setDueDate} placeholder="DD-MM-YYYY" className="ml-2 p-2 border border-gray-300 rounded bg-white" />
                        </View>
                        <View className="my-2 flex-row items-center">
                            <Text className="font-semibold text-white">Phone:</Text>
                            <TextInput onChangeText={setPhone} placeholder="+91XXXXXXXXX" className="ml-2 p-2 border border-gray-300 rounded bg-white" />
                        </View>
                    </View>
                </View>
                <View>
                    <Text className="text-lg text-amber-500 font-semibold">Bill To:</Text>
                    <TextInput onChangeText={setName} placeholder="Name" className="w-[80vw] my-2 p-2 border border-gray-300 rounded bg-white" />
                    <TextInput onChangeText={setAddress} placeholder="Street Address" className="w-[80vw] my-2 p-2 border border-gray-300 rounded bg-white" />
                    <TextInput onChangeText={setCityStateZip} placeholder="City, State, ZIP" className="w-[80vw] my-2 p-2 border border-gray-300 rounded bg-white" />
                </View>

                <View className="w-[90vw] mt-[50px] border-collapse">
                    <View className="flex-row bg-gray-200">
                        <Text className="border border-gray-300 p-2 w-[20vw] text-[10px] text-center font-bold">Description</Text>
                        <Text className="border border-gray-300 p-2 w-[20vw] text-[10px] text-center font-bold">Quantity</Text>
                        <Text className="border border-gray-300 p-2 w-[20vw] text-[10px] text-center font-bold">Unit Price</Text>
                        <Text className="border border-gray-300 p-2 w-[20vw] text-[10px] text-center font-bold">Amount</Text>
                        <Text className="border border-gray-300 p-2 w-[10vw] text-[10px] text-center font-bold"></Text>
                    </View>

                    {rows.map((row, index) => (
                        <View key={index} className="flex-row">
                            <TextInput
                                placeholder="Desc"
                                value={row.description}
                                onChangeText={(text) => handleRowChange(index, 'description', text)}
                                className="border border-gray-300 p-2 bg-white w-[20vw] text-center"
                            />
                            <TextInput
                                placeholder="0"
                                value={String(row.quantity)}
                                onChangeText={(text) => handleRowChange(index, 'quantity', parseFloat(text))}
                                keyboardType="numeric"
                                className="border border-gray-300 p-2 w-[20vw] text-center bg-white"
                            />
                            <TextInput
                                placeholder="0.00"
                                value={String(row.unitPrice)}
                                onChangeText={(text) => handleRowChange(index, 'unitPrice', parseFloat(text))}
                                keyboardType="numeric"
                                className="border border-gray-300 p-2 w-[20vw] text-center bg-white"
                            />
                            <Text className="border border-gray-300 p-2 w-[20vw] text-center bg-white">{row.amount.toFixed(2)}</Text>
                            <TouchableOpacity onPress={() => handleDeleteRow(index)} className='w-[10vw] bg-red-500 p-3'>
                                <Text className="text-white text-center text-black font-bold">X</Text>
                            </TouchableOpacity>
                        </View>
                    ))}

                    <View className="my-4 w-[90vw]">
                        <TouchableOpacity onPress={handleAddRow} className='bg-amber-500 p-3 rounded'>
                            <Text className="text-black font-bold text-center font-bold">Add Row</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row mt-[20px] w-[90vw]">
                        <Text className="border border-gray-300 p-2 flex-1 font-semibold text-white">Subtotal</Text>
                        <Text className="border border-gray-300 p-2 w-28 text-right text-white">{subtotal.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row w-[90vw]">
                        <Text className="border border-gray-300 p-2 flex-1 font-semibold text-white">Tax (%)</Text>
                        <TextInput
                            placeholder="tax%"
                            value={String(tax)}
                            onChangeText={handleTaxChange}
                            keyboardType="numeric"
                            className="border border-gray-300 p-2 w-28 text-right bg-white"
                        />
                    </View>
                    <View className="flex-row w-[90vw]">
                        <Text className="border border-gray-300 p-2 flex-1 font-semibold text-white">Total</Text>
                        <Text className="border border-gray-300 p-2 w-28 text-right text-white">{total.toFixed(2)}</Text>
                    </View>

                    <View className="my-4 w-[90vw]">
                        <TouchableOpacity onPress={submit} className='bg-emerald-500 p-3 rounded'>
                            <Text className="text-black font-bold text-center font-bold">Save</Text>
                        </TouchableOpacity>
                    </View>

                    {success && <Text className='text-green-500 text-center'>Saved Successfully!</Text>}
                    {error && <Text className = 'text-red-500 text-center'>Process Failed!</Text>}
                </View>

            </ScrollView>
        </ScrollView>
    );
}
