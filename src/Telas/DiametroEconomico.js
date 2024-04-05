import react from 'react';
import {
    View, Text, TextInput, TouchableOpacity, 
    StyleSheet, ScrollView, Dimensions,
} from 'react-native';

import VoltarTela from "./VoltarTela";

const DiametroEconomico = ({ navigator}) => {
    const [flowRate, setFlowRate] = React.useState("");
    const [pipeDiameter, setPipeDiameter] = React.useState("");
    const [pipeLength, setPipeLength] = React.useState("");
    const [viscosity, setViscosity] = React.useState("");
    const [density, setDensity] = React.useState("");
    const [result, setResult] = React.useState("");

    const calculateDarcy = () => {
        // Cálculos dos parâmetros necessários
        const flowArea = Math.PI * Math.pow(pipeDiameter / 2, 2);
        const velocity = flowRate / flowArea;
        const reynoldsNumber = (velocity * pipeDiameter * density) / viscosity;
    }

}

export default DiametroEconomico

