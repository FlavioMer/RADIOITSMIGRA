import RadioPlayer from "@/components/RadioPlayer";
import StationInfo from "@/components/StationInfo";
import { RADIO_CONFIG } from "@/constants/Config";
import { Audio } from "expo-av";
import React, { useEffect } from "react";
import { ScrollView, StatusBar, View } from "react-native";

export default function HomeScreen() {

    useEffect(() => {
        const configureAudio = async () => {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
            });
        };
        configureAudio();
    }, []);

    return (
        <ScrollView
            style={{ backgroundColor: RADIO_CONFIG.colors.background }}
            contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
        >
            <View>
                <StatusBar 
                    barStyle={"light-content"} 
                    backgroundColor={RADIO_CONFIG.colors.background}
                />

                <StationInfo />
                <RadioPlayer />
            </View>
        </ScrollView>
    );
}