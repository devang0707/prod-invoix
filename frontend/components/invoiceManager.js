import { View,Text, TouchableWithoutFeedback, Dimensions , Image } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import InvoiceCard from "./invoiceCard";


const data= [
    {
        id: 1, 
        screen: "AddInvoice",
        img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        title: "Create Format #1"
    },
    {
        id: 2, 
        screen: "AllInvoice",
        img: "https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?cs=srgb&dl=pexels-minan1398-1629212.jpg&fm=jpg",
        title: "All Invoices #1"
    },
    {
        id: 3, 
        screen: "AddInvoiceTwo",
        img: "https://i.postimg.cc/Gp8Kj8Fn/t1.png",
        title: "Create Format #2"
    },
    {
        id: 4, 
        screen: "AllInvoiceTwo",
        img: "https://images.squarespace-cdn.com/content/v1/5f1ddd617db10668dbabf02d/a04befcc-3f7d-47f0-a607-9913772a4843/sticky-notes",
        title: "All Invoices #2"
    },
]

var {width , height} = Dimensions.get('window');  

export default function InvoiceManager({trendingData}){

    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie',item)   
    }

    return ( 
        <View className = 'mb-7 mt-7'>

            <Text className = 'text-amber-500 text-xl mx-4 mb-5'>INVOICE MANAGER</Text>

            <Carousel
                data={data}
                renderItem = {({item}) => <InvoiceCard item={item} />}  
                firstItem = {1}
                inactiveSlideOpacity = {0.60}
                sliderWidth = {width}
                itemWidth = {width*0.60} 
                slideStyle = {{display:'flex',alignItems:'center'}}
                />

        </View>
    )
}


