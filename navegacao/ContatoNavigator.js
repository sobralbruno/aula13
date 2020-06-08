import { createStackNavigator } from "react-navigation-stack";
import ContatoAlterar from '../telas/ContatoAlterar';
import TelaInicio from '../telas/TelaInicio';
import NovoContatoTela from '../telas/NovoContatoTela';
import Cores from '../cores/Cores'
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";


const ContatoNavigator = createStackNavigator({

    Inicio: TelaInicio,
    Contato: ContatoAlterar,
    NovoContato: NovoContatoTela
},{
    defaultNavigationOptions: {
        headerStyle:{
            backgroundColor:Platform.OS === 'android' ? Cores.corHeader : ''
        },
        headerTintColor:Platform.OS === 'android' ? 'white' : Cores.corHeader 
    }
});

export default createAppContainer(ContatoNavigator);