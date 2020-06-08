import React from 'react';
import {View, StyleSheet} from 'react-native';
import Medidas from '../medidas/Medidas'


const Cartao = (props) => {
    return (
    <View style={{...estilos.cartao, ...props.estilos}}>{props.children}</View>
    );


};

const estilos = StyleSheet.create({
    cartao: {
        shadowColor: 'black',
        shadowOffset: {
        width: Medidas.zero,
        height: Medidas.two
        },
        shadowRadius: Medidas.six,
        shadowOpacity: Medidas.cartaoShadow,
        backgroundColor: 'white',
        elevation: Medidas.four,
        padding: Medidas.twelve,
        borderRadius: Medidas.twelve
    }

});

export default Cartao;