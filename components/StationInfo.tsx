import { StyleSheet } from "react-native";
import { RADIO_CONFIG } from "../constants/Config";


//Hojas de Estilo
const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingTop: 60,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    titleContainer: {
        flex: 1,
    },
    stationName: {
        fontSize: 24,
        fontWeight: "bold",
        color: RADIO_CONFIG.colors.text,
        marginBottom: 4,
    },
    slogan: {
        fontSize: 16,
        color: "#94A3B8",
        fontStyle: "italic",
    },
    contactContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 24,
    },
    contactButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    contentText: {
        color: RADIO_CONFIG.colors.text,
        marginLeft: 8,
        fontSize: 14,
    },
    welcomeContainer: {
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: RADIO_CONFIG.colors.primary,
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: RADIO_CONFIG.colors.text,
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 14,
        color: "#94A3B8",
        lineHeight: 20,
    },
}

);