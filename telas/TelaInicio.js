import React, { useState, useEffect } from 'react';
import {StyleSheet, View, FlatList, Platform} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import ContatoItem from '../components/ContatoItem';
import Medidas from '../medidas/Medidas';
import BotaoCabecalho from '../components/BotaoCabecalho';


import db from '../helpers/Firebase';


const TelaInicio = (props) => {

  const [contatos, setContatos] = useState([]);


  useEffect(() => {
    db.collection('contatos').onSnapshot((snapshot) => {
      let aux = [];
      snapshot.forEach(doc => {
        aux.push({
          nome: doc.data().nome,
          telefone: doc.data().telefone,
          imagem: doc.data().imagem,
          lat: doc.data().lat,
          lng: doc.data().lng,
          data:doc.data().data,
          chave: doc.id
        });
      });
      setContatos(aux)
    });
  }, []);

  const removerContato = (keyASerRemovida) => {

    db.collection('contatos').doc(keyASerRemovida).delete()

    };

        
    return(
        <View style={styles.container}>
            <View>
                <FlatList
                data = {contatos}
                keyExtractor={contato => contato.chave}
                renderItem = {contato => (
                    <ContatoItem 
                      keys={contato.item.chave} 
                      contato={contato.item.nome} 
                      telefone ={contato.item.telefone}
                      lat={contato.item.lat}
                      lng={contato.item.lng}
                      data={contato.item.data}
                      onDelete={removerContato}
                      imagem={contato.item.imagem}
                      contSelecionado={() => props.navigation.navigate('Contato', {nome: contato.item.nome})}
                    />
                )}
                />
            </View>
        </View>
    );
    
}

TelaInicio.navigationOptions = dadosNav => {
  return{
    headerTitle: 'Lista Contatos',
    headerRight: () => (
      <HeaderButtons 
        HeaderButtonComponent={BotaoCabecalho}
      >
        <Item 
          title="Adicionar"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {dadosNav.navigation.navigate('NovoContato')}}
        />
      </HeaderButtons>
    )
  }

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


export default TelaInicio;
