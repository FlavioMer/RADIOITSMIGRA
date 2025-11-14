import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
//import RadioPlayer from "../components/RadioPlayer"; 
import StationInfo from "@/components/StationInfo";
import { RADIO_CONFIG } from "@/constants/Config";

//Exportar la pantalla principal
export default function HomeScreen(){
    return (
        <ScrollView>
            <View style= {styles.container}>
                <StatusBar barStyle={"light-content"} backgroundColor={RADIO_CONFIG.colors.background}/>
                {/* Seccion de la Información */}
                <StationInfo/>
                {/* Seccion del Reproductor */}
                
            </View>
        </ScrollView>
    )
}




//Definimos una hoja de estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: RADIO_CONFIG.colors.background
    }
});