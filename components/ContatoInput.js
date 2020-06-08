import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import Cores from '../cores/Cores';
import Medidas from '../medidas/Medidas';
import TiraFoto from './TiraFoto';


const ContatoInput = (props) => {
    const [contato, setContato] =useState('');
    const [telefone, setTelefone] = useState('');

    const [imagemURI, setImagemURI] = useState();

    const capturaContato = (contato) =>{setContato(contato);}
    const capturaTelefone = (telefone) =>{setTelefone(telefone);}

    const fotoTirada = imagemURI =>{
        
        setImagemURI(imagemURI)
    }

    return(
        <View style={styles.cadastroContato}>
            <TextInput 
                placeholder="Nome" 
                style={styles.cadastroInputText} 
                onChangeText={capturaContato}
                value={contato} 
            />
            <TextInput 
                placeholder="Telefone"
                keyboardType="number-pad" 
                style={styles.cadastroInputText} 
                onChangeText={capturaTelefone}
                value={telefone}
            />
            <TiraFoto onFotoTirada={fotoTirada}/> 
            <Button 
                title="Adicionar"
                color={Cores.corBotao}
                onPress={() => props.onAdicionarContato(contato, telefone, imagemURI)}
            />

        </View>
    );
}


const styles = StyleSheet.create({

    cadastroContato: {
        flexDirection: 'column',
        justifyContent: 'space-between', 
        marginBottom: Medidas.twenty,
    },
    cadastroInputText: {
        fontSize:Medidas.twenty,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: Medidas.one,
        marginBottom: Medidas.five,
        padding: Medidas.one
    
      }
});

export default ContatoInput;