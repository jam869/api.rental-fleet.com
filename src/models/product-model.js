import pool from '#infrastructure/db.js';
import { handleDBError } from '#utils/handle-db-errors.js';

const ProductModel = {

    selectAll: async () => {

        try {
            
            const query = `SELECT id, name, picture, price FROM product`;

            const rows = await pool.query(query);
            
            return rows; // MariaDB retourne un tableau de résultats

        } catch(err) {

            handleDBError(err);

        }  
    },

    selectById: async (id) => {
        
        try{
            
            /* 
                
                En JS, si on construit un objet en ne passant que des variables, ça va créer des attributs
                ayant le nom de la variable et la valeur de la variable. C'est simplement un racouci.

                const params = {
                    id : id
                };

                Même chose que

                const params = {
                    id
                };

                On peut même combiner les ajout automatiques et manuels

                const params = {
                id,
                name : "Bob"
            };

            */
            const params = {
                id
            };

            // const [row] = va extraire la première ligne avec les données
            const [row] = await pool.query("SELECT id, name, picture, price FROM product WHERE id = :id", params);
            return row; // MariaDB retourne un tableau de résultats

        } catch(err) {

            handleDBError(err);
            
        }  
    },

    insertOne: async (name, picture, price) => {

        try {

            const params = {
                name,
                picture,
                price
            };

            const result = await pool.query("insert into product (name, picture, price) values (:name,:picture,:price)", params);
            return Number(result.insertId);        

        } catch(err) {

            handleDBError(err);

        }  

    },

    deleteById: async (id) => {
        
        try{
            
            const params = {
                id
            };

            // const [row] = va extraire la première ligne avec les données
            const result = await pool.query("DELETE FROM product WHERE id = :id", params);
            return result.affectedRows > 0; // MariaDB retourne un tableau de résultats

        } catch(err) {

            handleDBError(err);
            
        }  
    },    

    updateById: async (id, name, picture, price) => {

        try {

            const params = {
                id,
                name,
                picture,
                price                
            };

            const result = await pool.query("update product set name = :name, picture = :picture, price = :price where id = :id", params);
            return result.affectedRows > 0;             

        } catch(err) {

            handleDBError(err);

        }  

    },

    modifyById: async (id, data) => {

        const params = {
            id,
            ...data
        };

        try {

            const fields = Object.entries(data)
            .map(([key]) => `${key} = :${key}`)
            .join(', ');

            const query = "update product set " + fields  + " where id = :id";
            
            const result = await pool.query(query, params);
            return result.affectedRows > 0;        

        } catch(err) {

            handleDBError(err);

        }  

    },
    
    
};

export default ProductModel;