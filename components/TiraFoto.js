import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Cores from '../cores/Cores';

const TiraFoto = (props) => {

    const [imagemURI, setImagemURI] = useState();
    
    const tirarFoto = async() => {
        const foto = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect:[16,9],
            quality: 1
        });
        //console.log(foto);
        setImagemURI(foto.uri);
        props.onFotoTirada(foto.uri);
    }

    return (
        <View style={estilos.principal}>
            <View style={estilos.previewDaImagem}>
                {
                    !imagemURI ?
                    <Text>Nenhuma Foto.</Text>
                    :
                    <Image 
                    style={estilos.imagem} 
                    source={{uri:imagemURI}}
                />

                }
            </View>
            <Button 
                title='Tirar foto'
                color={Cores.corBotao}
                onPress={tirarFoto}
            />
        </View>
    )
};

export default TiraFoto;

const estilos = StyleSheet.create({
    principal:{
        alignItems: 'center',
        marginBottom: 15
    },
    previewDaImagem:{
        width: '100%',
        height: 200,
        justifyContent: 'center',
        marginBottom: 10,
        borderColor: Cores.corHeader,
        borderWidth: 1
    },
    imagem: {
        width: '100%',
        height: '100%'
    }
});
