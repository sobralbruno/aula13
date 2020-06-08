import React from 'react';
import ContatoNavigator from './navegacao/ContatoNavigator';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import contatosReducer from './store/contatos-reducer';



/*init()
  .then(()=> {
    console.log("Criação da base ocorreu com sucesso.");
  }).catch((err) => {
    console.log('Criação da base falhou.' + err);
  });*/

//const rootReducer = combineReducers({

 // contatos: contatosReducer

//});

//const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {

  return (  
    //<Provider store={store}>

      <ContatoNavigator />

    //</Provider>
           
  );
}


