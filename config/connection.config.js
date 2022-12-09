import Sequelize from 'sequelize';
import { db } from './config.js';

const sequelizeClient = (() => {
    
            return new Sequelize(db.database, db.user, "12345678P", {
                host: db.host,
                port: db.portdb,
                dialect: 'postgres',
            });

        
})();



sequelizeClient.sync({ alert: true })
//forse
    .then(() => {
        console.log('Conectado')
    })
    .catch((err) => {
        console.log('No se conecto', err)
    });

export const getData = { sequelizeClient };
