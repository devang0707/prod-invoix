import { View,Text, TouchableWithoutFeedback, Dimensions , Image } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import AffiliatedCard from "./affiliatedCard";

const data= [
    {
        id: 1, 
        title: "NSUT",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e4/NSUT_logo.png" 
    },
    {
        id: 2, 
        title: "iim",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThnWEFNAwfrO_g7WZj4XMyiecwYFcsObAMFw&s"
    },
    {
        id: 3, 
        title: "IIT",
        img: "https://logowik.com/content/uploads/images/iit-delhi-indian-institute-of-technology-delhi5001.jpg"
    },
    {
        id: 4, 
        title: "DTU",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5y6OMY5OgnND8SVeb_CyrqJpp_ALQc-2SA&s"
    },
    {
        id: 5, 
        title: "IPU",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd87SaJcm-KUfhhPPg7tnciR00eziwi6ROXA&s"
    },
    {
        id: 6, 
        title: "IGDTUW",
        img: "https://d2lk14jtvqry1q.cloudfront.net/media/large_Department_of_Management_Studies_Indira_Gandhi_Delhi_Technical_University_for_Women_IGDTUW_Delhi_3792cc2387_41cda05cc3.png"
    },
    {
        id: 7, 
        title: "MIT",
        img: "https://brand.mit.edu/sites/default/files/styles/image_text_2x/public/2023-08/MIT-logo-red-textandimage.png?itok=RNoAwZvy"
    },
    {
        id: 8, 
        title: "DU",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/University_of_delhi_logo.png"
    },
    {
        id: 9, 
        title: "HARVARD",
        img: "https://yt3.googleusercontent.com/ytc/AIdro_kaLXmYGRSc00QkYIy6xm0t1zA0cemhHCL-mOrYHbLl8Do=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        id: 10, 
        title: "STANDFORD",
        img: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/SU_SealColor_web3.png"
    }
]

var {width , height} = Dimensions.get('window');  

export default function AffiliatedInstitute(){

    const navigation = useNavigation();

    return ( 
        <View className = 'mb-7 mt-3'>

            <Text className = 'text-amber-500 text-xl mx-4 mb-5'>AFFILIATED INSTITUTES</Text>

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


