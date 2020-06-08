
import { ADD_CONTATO, DEL_CONTATO, ALT_CONTATO, LISTAR_CONTATOS } from "./contatos-actions";
import Contato from '../modelo/Contato';

const estadoInicial = {

    contatos: []

}


export default (estado = estadoInicial, action) => {
    switch (action.type){
        case ADD_CONTATO:
            const c = new Contato (action.dadosContato.id.toString(), action.dadosContato.nomeContato, action.dadosContato.telefoneContato, 
                action.dadosContato.imagem, action.dadosContato.lat, action.dadosContato.lng, action.dadosContato.data)
            console.log(JSON.stringify(c))
            return {

                contatos: estado.contatos.concat(c)
            }
        case LISTAR_CONTATOS:
            return {
                contatos: action.contatos.map(c => new Contato (c.id.toString(), c.nome, c.telefone, c.imagemUri, c.latitude, c.longitude, c.data))
            }
        
        case DEL_CONTATO:
            const key = action.dadosContato.idContato;
            const filter = estado.contatos.filter(contato => contato.id !== key)
            
            return {
                contatos: filter
            }
        case ALT_CONTATO:

            const keyAlt = action.dadosContato.idContato;
            const filterAlt = estado.contatos.filter(contato => contato.id !== keyAlt)
            const cAlt = new Contato (action.dadosContato.idContato, action.dadosContato.nomeContato, action.dadosContato.telefoneContato, action.dadosContato.imagem)

            return {
                contatos: filterAlt.concat(cAlt)
            }
        default:
            console.log('aqui' + JSON.stringify(action))
            return estado
    }

}