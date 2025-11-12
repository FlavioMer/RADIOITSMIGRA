//Exportar la configuración de la Radio

import { Background } from "@react-navigation/elements";

export const RADIO_CONFIG = {
    station: {
        name: "Radio ITSMIGRA",
        frecuency: "96.5 FM",
        location: "San Miguel el Grande",
        streamURL: "https://www.smiguelgde.tecnm.mx/stream",
        website: "https://www.smiguelgde.tecnm.mx/radio.html",
        phone: "+52 9533079303",
        logo: require("../assets/images/Logo_Radio.png")
    },
    colors:{
        primary: "#1E40AF", //Azul Institucional
        secondary: "#DC2626", //Rojo    
        background: "#0F172A", //Fondo Oscuro
        text: "#F8FAFC", //Texto Claro
    }
}   