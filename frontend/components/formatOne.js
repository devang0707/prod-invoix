import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';

export default function FormatOne({ invoiceData }) {
    const [currentInvoiceData, setCurrentInvoiceData] = useState(invoiceData);

    useEffect(() => {
        setCurrentInvoiceData(invoiceData);
    }, [invoiceData]);

    const subtotal = currentInvoiceData?.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0;
    const taxAmount = (subtotal * (currentInvoiceData?.taxPercentage || 0)) / 100;
    const total = subtotal + taxAmount;

    const createAndShareFile = async () => {
        if (!currentInvoiceData) {
            Alert.alert('Error', 'No invoice data available to create a file.');
            return;
        }

        const fileContent = `
        INVOICE

        Invoice #: ${currentInvoiceData.invoiceNumber}
        Set Date: ${currentInvoiceData.setDate}
        Due Date: ${currentInvoiceData.dueDate}
        Phone: ${currentInvoiceData.phone}

        Bill To:
        ${currentInvoiceData.billTo.name}
        ${currentInvoiceData.billTo.address}
        ${currentInvoiceData.billTo.cityStateZip}

        Items:
        ${currentInvoiceData.items.map(item => `
        Description: ${item.description}
        Quantity: ${item.quantity}
        Unit Price: ${item.unitPrice.toFixed(2)}
        Amount: ${(item.quantity * item.unitPrice).toFixed(2)}
        `).join('\n')}

        Subtotal: ${subtotal.toFixed(2)}
        Tax (${currentInvoiceData.taxPercentage}%): ${taxAmount.toFixed(2)}
        Total: ${total.toFixed(2)}
        `;

        const fileUri = FileSystem.documentDirectory + `invoice_${currentInvoiceData.invoiceNumber}.txt`;

        try {
            await FileSystem.writeAsStringAsync(fileUri, fileContent, { encoding: FileSystem.EncodingType.UTF8 });
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert('Sharing not available', 'Sharing is not available on this device.');
            }
        } catch (error) {
            console.error('Error creating or sharing file:', error);
            Alert.alert('Error', 'There was an issue creating or sharing the file.');
        }
    };

    const handleDeleteInvoice = async (id) => {
        try {
            await axios.delete(`http://192.168.1.3:8394/api/invoices/${id}`);
            setCurrentInvoiceData(null);
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'There was an issue deleting the invoice.');
        }
    };

    if (currentInvoiceData === null) {
        return <Text className="text-white text-center">[This invoice was deleted]</Text>;
    }

    return (
        <ScrollView className="max-w-3xl text-white mx-auto my-8 border border-gray-300 p-5">
            {/* Invoice Header */}
            <View className="text-center mb-6">
                <Text className="text-2xl text-amber-500 font-bold">INVOICE</Text>
            </View>

            {/* Invoice Info */}
            <View className="mb-6">
                <View className="my-2 flex-row items-center">
                    <Text className="font-semibold text-white w-32">Invoice #:</Text>
                    <Text className="text-white">{currentInvoiceData.invoiceNumber}</Text>
                </View>
                <View className="my-2 flex-row items-center">
                    <Text className="font-semibold text-white w-32">Set Date:</Text>
                    <Text className="text-white">{currentInvoiceData.setDate}</Text>
                </View>
                <View className="my-2 flex-row items-center">
                    <Text className="font-semibold text-white w-32">Due Date:</Text>
                    <Text className="text-white">{currentInvoiceData.dueDate}</Text>
                </View>
                <View className="my-2 flex-row items-center">
                    <Text className="font-semibold text-white w-32">Phone:</Text>
                    <Text className="text-white">{currentInvoiceData.phone}</Text>
                </View>
            </View>

            {/* Bill To */}
            <View className="mb-6">
                <Text className="text-lg text-amber-500 font-semibold mb-2">Bill To:</Text>
                <Text className="text-white mb-1">{currentInvoiceData.billTo.name}</Text>
                <Text className="text-white mb-1">{currentInvoiceData.billTo.address}</Text>
                <Text className="text-white">{currentInvoiceData.billTo.cityStateZip}</Text>
            </View>

            {/* Table */}
            <View className="mt-4 border-collapse">
                {/* Header Row */}
                <View className="flex-row bg-gray-200">
                    <Text className="border border-gray-300 p-2 flex-1 text-[12px] text-center font-bold">Description</Text>
                    <Text className="border border-gray-300 p-2 flex-1 text-[12px] text-center font-bold">Quantity</Text>
                    <Text className="border border-gray-300 p-2 flex-1 text-[12px] text-center font-bold">Unit Price</Text>
                    <Text className="border border-gray-300 p-2 flex-1 text-[12px] text-center font-bold">Amount</Text>
                </View>

                {/* Table Rows */}
                {currentInvoiceData.items.map((item, index) => (
                    <View key={index} className="flex-row">
                        <Text className="border border-gray-300 p-2 flex-1 text-center text-white">{item.description}</Text>
                        <Text className="border border-gray-300 p-2 flex-1 text-center text-white">{item.quantity}</Text>
                        <Text className="border border-gray-300 p-2 flex-1 text-center text-white">{item.unitPrice.toFixed(2)}</Text>
                        <Text className="border border-gray-300 p-2 flex-1 text-center text-white">{(item.quantity * item.unitPrice).toFixed(2)}</Text>
                    </View>
                ))}

                {/* Subtotal */}
                <View className="flex-row mt-4">
                    <Text className="border border-gray-300 p-2 flex-1 font-semibold text-white pr-4">Subtotal</Text>
                    <Text className="border border-gray-300 p-2 w-32 text-right text-white">{subtotal.toFixed(2)}</Text>
                </View>
                {/* Tax */}
                <View className="flex-row">
                    <Text className="border border-gray-300 p-2 flex-1 font-semibold text-white pr-4">Tax ({currentInvoiceData.taxPercentage}%)</Text>
                    <Text className="border border-gray-300 p-2 w-32 text-right text-white">{taxAmount.toFixed(2)}</Text>
                </View>
                {/* Total */}
                <View className="flex-row">
                    <Text className="border border-gray-300 p-2 flex-1 font-semibold text-white pr-4">Total</Text>
                    <Text className="border border-gray-300 p-2 w-32 text-right text-white">{total.toFixed(2)}</Text>
                </View>

                <View className="my-4 w-[90vw]">
                    <TouchableOpacity onPress={createAndShareFile} className='bg-emerald-500 p-3 rounded'>
                        <Text className="text-black font-bold text-center">Share</Text>
                    </TouchableOpacity>
                </View>
                <View className="w-[90vw]">
                    <TouchableOpacity onPress={() => handleDeleteInvoice(currentInvoiceData._id)} className='bg-red-500 p-3 rounded'>
                        <Text className="text-black font-bold text-center">Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
