import { View,Text, TouchableWithoutFeedback, Dimensions , Image } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import AffiliatedCard from "./affiliatedCard";

const data= [
    {
        id: 1, 
        title: "AMD",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcEU8QoalInq-cgSQnl406IpWBN6gUS8vEhg&s"
    },
    {
        id: 2, 
        title: "Paypal",
        img: "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png"
    },
    {
        id: 3, 
        title: "HP",
        img: "https://h30434.www3.hp.com/t5/image/serverpage/image-id/289671i7793896194528AA9?v=v2"
        
    },
    {
        id: 4, 
        title: "Stripe",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s"
    },
    {
        id: 5, 
        title: "Apple",
        img: "https://images.unsplash.com/photo-1621768216002-5ac171876625?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
    },
    {
        id: 6, 
        title: "Oracle",
        img: "https://yt3.googleusercontent.com/exYm9eUqwXUf15Q69vqlqpju_jVkhalW8oouEUXrXVHWUz-9V4_JjgrIkv61olAnyz9os29e=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        id: 7, 
        title: "Google",
        img: "https://static.vecteezy.com/system/resources/previews/013/760/951/original/colourful-google-logo-in-dark-background-free-vector.jpg"
    },
    {
        id: 8, 
        title: "Webex",
        img: "https://play-lh.googleusercontent.com/tFFAvb_eZM5BlHYFiuyVwhM54o7mvfCOFX3AGbgTULfKpEancPmZnP1PRu44CZiZgyI"
    },
    {
        id: 9, 
        title: "Walmart",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8H-PCjoZrQ82P9qFzcaqRopfY4754HnmmA&s"
    },
    {
        id: 10, 
        title: "Microsoft",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-P7PSO_hZpFpHrAtfV3Xvpb13CT7V9kuKxg&s"
    }
]

var {width , height} = Dimensions.get('window');  

export default function AffiliatedVendor({title}){

    const navigation = useNavigation();

    return ( 
        <View className = 'mb-7'>

            <Text className = 'text-amber-500 text-xl mx-4 mb-5'>AFFILIATED VENDORS</Text>

            <Carousel
                data={data}
                renderItem = {({item}) => <AffiliatedCard item={item} />}  
                firstItem = {1}
                inactiveSlideOpacity = {0.60}
                sliderWidth = {width}
                itemWidth = {width*0.4} 
                slideStyle = {{display:'flex',alignItems:'center'}}
                />

            

        </View>
    )
}


