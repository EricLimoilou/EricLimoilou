**FLETNIX**

Testé sur Chrome, Firefox et Safari.
Développé sous Visual Studio Code, avec l'extension 'Live Server' (lancer l'extension sur 'index.html').


- Lancer par un double click sur 'index.html'.

- Page LOGIN
    - Un utilisateur a un IDENTIFIANT et un MOT DE PASSE.
    - 2 types d'employés: Admin (lecteur seule) et SuperAdmin (Lecture et écriture)

- Page Principale
    - Une fois connecté, l'admin (ou super-admin) a la possibilité de consulter la liste des clients, ou la liste des films proposés.
    - En haut et à droite se trouve le bouton de déconnection (qui ramène au login).

- Page Client
    - Les actions MODIFIER, SUPPRIMER, et CRÉER sont disponibles.
        - 1 client existe avec un nom, prénom, et courriel (unique).
        - 2 clients ne peuvent avoir le même courriel
    
- Page Films
    - Visualisation des films proposés sur la plateforme.
    - À droite de chaque film, un bouton permet l'ouverture d'une fenêtre qui affichera le détail du film, soit: le titre, la durée, la catégorie, les acteurs et d'autres renseignements pertinents.
        
-----------------------------------------------------------------------------------------------------------

**Languages utilisés:** HTML, CSS (Less) et Javascript (Typescript)

**Structure:**
- index.html            ->  Page d'accueil
- dossier 'assets'      ->  Contient les fichiers SVG
- dossier 'collect'     ->  Contient les collections (Users)
- dossier 'images'      ->  Contient les images des films proposés
- dossier 'js'          ->  Contient les fichier Javascript principaux
- dossier 'dist'        ->  Contient les fichiers Typescript convertis en Javascript    
- dossier 'src'         ->  Contient les fichiers Typescript originaux
- dossier 'pages'       ->  Contient les différentes pages HTML qui composent la plat