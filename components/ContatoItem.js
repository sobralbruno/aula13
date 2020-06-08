import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import Cartao from './Cartao';
import Cores from '../cores/Cores';
import Medidas from '../medidas/Medidas';

const ContatoItem = (props) => {

    const excluirContato = () =>{

        Alert.alert(

            'Excluir Contato',
            'Deseja realmente Excluir esse Contato',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => props.onDelete(props.keys)
                }
            ],

            { cancelable: false }
        )
    } 

    return(
        <TouchableOpacity 
            style={styles.contatoItem}
            onLongPress={excluirContato} 
            onPress={props.contSelecionado.bind(this, props.keys)}
        >
            <Image style={styles.imagem} source={{uri:props.imagem}}/>
            <View style={styles.infoContainer}>
                <Text>{'Nome:       ' + props.contato}</Text>
                <Text>{'Telefone:   ' + props.telefone}</Text>
                <Text>{'latitude:   ' + props.lat}</Text>
                <Text>{'longitude:  ' + props.lng}</Text>
                <Text>{'Data:       ' + props.data}</Text>
            </View>
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
    infoContainer: {
        marginLeft:25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    imagem:{
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor: '#ccc',
        borderColor: Cores.corHeader,
        borderWidth: 1
    },
    contatoItem:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection:'row',
        alignItems: 'center'
    }

});

export default ContatoItem;

