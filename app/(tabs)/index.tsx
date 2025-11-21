import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import StationInfo from "@/components/StationInfo";
import RadioPlayer from "@/components/RadioPlayer";
import { RADIO_CONFIG } from "@/constants/Config";

export default function HomeScreen() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar 
                    barStyle={"light-content"} 
                    backgroundColor={RADIO_CONFIG.colors.background}
                />

                {/* Sección de la Información */}
                <StationInfo />

                {/* Sección del Reproductor */}
                <RadioPlayer />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: RADIO_CONFIG.colors.background
    }
});
