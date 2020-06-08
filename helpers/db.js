import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("contatos.db")


export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) =>{
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS tb_contato (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, telefone NUM NOT NULL, imagemUri TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL, data TEXT NOT NULL);',
                [],
                () => {resolve()},
                (_, err) => {reject(err)}
            );
        });  
    });
    return promise;
}

export const inserirContato = (nomeContato, telefoneContato, imagemUri, latitude, longitude, data) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO tb_contato(nome, telefone, imagemUri, latitude, longitude, data) VALUES (?,?,?,?,?,?);",
                [nomeContato, telefoneContato, imagemUri, latitude, longitude, data],
                (_, resultado) => {resolve(resultado)},
                (_, err) => { reject(err)}
            );
        });
    });
    return promise;
}

export const buscarContatos = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM tb_contato',
                [],
                (_, resultado) => {resolve(resultado)},
                (_, err) => {reject(err)}
            );
        });
    });
    return promise;
} 