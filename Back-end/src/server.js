import { index } from './index.js';

if (!process.env.JWT_SECRET){
    console.error('JWT_SECRET  manquant : copie .env.exemple en .env et définissez JWT_SECRET');
    process.exit(1);
    
}

const PORT = process.env.PORT || 3000;
index.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});