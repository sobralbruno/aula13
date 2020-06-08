import React, { useState, useEffect } from 'react';

import { View, StyleSheet, Text, Button, FlatList, TextInput, Image} from 'react-native';
//import { useSelector, useDispatch } from 'react-redux';

import Cartao from '../components/Cartao';
import ContatoInput from '../components/ContatoInput'
//import * as contatosActions from '../store/contatos-actions';
import { ScrollView } from 'react-native-gesture-handler';
import db from '../helpers/Firebase';

const Contatos = (props) => {
    const nome  = props.navigation.getParam('nome');

    const[contato, setContato] = useState([]);

    //const dispatch = useDispatch()

    //const contatos = useSelector(estado => estado.contatos.contatos )

    console.log(nome)
    useEffect(() => {
        db.collection('contatos').where('nome', '==', nome).get()
        .then((snapshot) => {
            let aux =[];
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
            setContato(aux)
        });
      }, []);


    const[altera, setAltera] = useState(false)
    

    const alterarOContato = async(nome, telefone, imagemURI) => {

        db.collection('contatos').doc(contato.chave).delete()

        const localizacao = await capturarLocalizacao();

        let latitude = localizacao.coords.latitude;
        let longitude = localizacao.coords.longitude;

        let data = new Date().toString();

        db.collection('contatos').add({
        nome: nome,
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

    let alteraContato = <View/>;
    
    if(altera){

        alteraContato =
             <View style={estilos.cadastroContato}>
                <ContatoInput onAdicionarContato={alterarOContato} />
            </View>
    }

    return(
        <View style={estilos.container}>
            <ScrollView>
                <FlatList
                    data = {contato}
                    renderItem = {cont => ( 
                        <View>
                            <Image  style={estilos.imagem} source={{uri:cont.item.imagem}}/>
                            <Cartao estilos={estilos.itemNaLista}>
                                <Text style={estilos.texto}>Nome: {cont.item.nome} </Text>
                                <Text style={estilos.texto}> Telefone: {cont.item.telefone} </Text>
                            </Cartao>
                        </View>
                    )}/>
            <View style={estilos.botoes}>
                <View style={estilos.botao}> 
                    <Button 
                        title = 'Alterar'
                        onPress = {() =>{setAltera(true)}}
                    />
                </View>
                <View style={estilos.botao}>
                    <Button 
                        title='Voltar'
                        onPress ={() => {props.navigation.navigate('Inicio')}}
                    />
                </View> 
            </View>
            <View style={estilos.alterarContato}>
                    {alteraContato}
                        
            </View>
            </ScrollView>
         </View>
    );
};




const estilos = StyleSheet.create({
    imagem: {
        width: 300,
        height: 150,
        borderRadius:15,
        alignSelf: 'center'
    },
    container: {
        padding: 8,
    },
    alterarContato:{
        padding: 10,
        marginTop: 10
    },

    botoes: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    botao: {
        width: 100
    },
    itemNaLista: {
        flexDirection: 'column',
        backgroundColor: '#4F4F4F',
        marginBottom: 4,
        marginTop:4,
        alignItems: 'center'
    },
    texto: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white'
        
    },
    cadastroContato: {
        flexDirection: 'column',
        justifyContent: 'space-between', 
        marginBottom: 20,
    },
    cadastroInputText: {
        fontSize:20,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        padding: 1
    
      }
})

export default Contatos;
