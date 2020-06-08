import React, {useState} from 'react';
import { View, StyleSheet, Alert} from 'react-native';

//import { useDispatch } from 'react-redux';

import ContatoInput from '../components/ContatoInput';
import Medidas from '../medidas/Medidas';

//import * as contatosActions from '../store/contatos-actions';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import db from '../helpers/Firebase';




const NovoContatoTela = (props) => {

  //const dispatch = useDispatch ();
  
  const adicionaContato = async(contato, telefone, imagemURI) => {

    const localizacao = await capturarLocalizacao();

    let latitude = localizacao.coords.latitude;
    let longitude = localizacao.coords.longitude;

    let data = new Date().toString();

    db.collection('contatos').add({
      nome: contato,
      telefone: telefone,
      imagem: imagemURI,
      lat: latitude,
      lng: longitude,
      data: data
  })

    props.navigation.goBack();
  }

  const capturarLocalizacao = async() => {
    const temPermissao = await verificaPermissoes();
    if(temPermissao){
      try{
        const localizacao = await Location.getCurrentPositionAsync({timeout: 8000});
        return localizacao;
      }
      catch(err){
        Alert.alert(
          "Impossível obter localização",
          "Tente novamente mais tarde ou escolha uma no mapa",
          [{ text: "Ok" }]
        )
      }

    }

  }

  const verificaPermissoes = async () => {
    const resultado = await Permissions.askAsync(Permissions.LOCATION);
    if(resultado.status !== "granted"){
      Alert.alert(
        'Sem permissão para uso do mecanismo de localização',
        'É preciso liberar acesso ao mecanismo de localização',
        [{text: 'OK'}]
      )
      return false;
    }
    return true;
  }

  return (
      <View style={styles.container}>
        <ContatoInput onAdicionarContato={adicionaContato} />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding:Medidas.fifty,
      },
      
      titulo: {
        fontSize: Medidas.thirty,
        marginBottom:Medidas.twenty
      }
});

export default NovoContatoTela;