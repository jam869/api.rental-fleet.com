import AuthenticationManager from '../utils/authentication-manager.js';
import UserModel from '../models/user.js';

const validateKey = async (req, res) => {
    try {
        // a. Récupérer la "possible" clé d'API dans les en-têtes
        const key = req.headers['x-api-key'];

        // b. Si la clé existe, on tente de récupérer l'utilisateur
        if (key) {
            const hashedKey = AuthenticationManager.hashKey(key);
            const user = await UserModel.selectByHash(hashedKey);

            // c. Si l'utilisateur existe, on attache son id
            if (user) {
                res.locals.user = {
                    id: user['id']
                };
            }
        }

        // d. Si l'utilisateur n'existe pas ou pas de clé, on ne fait rien
        // La fonction se termine simplement sans appeler next()

    } catch (error) {
        console.error('Error validating API key:', error);
        throw error; // Relance l'erreur pour que runMiddlewares puisse la capturer
    }
};

export default validateKey;