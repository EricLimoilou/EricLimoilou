// Classe représentant un utilisateur (administrateur)
class Users {
    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
// Classe représentant un client
class Clients {
    constructor(id, firstName, lastName, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
// Classe représentant un film
class Films {
    constructor(id, title, duration, category, actors) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.category = category;
        this.actors = actors;
    }
}
// Gestion de l'application
//
// Note: Les classes CSS 'active' et 'inactive' montrent et cachent (respectivement)
// une portion de la page HTML
//
export class App {
    constructor() {
        this.users = [
            new Users('RobertDacier', 'e3R44r*1e!', 'read'),
            new Users('ThomasCook', 'frf2f4@f24n', 'read'),
            new Users('ChristopheColomb', '42r@@rwcw2r', 'write'),
            new Users('JustinBieber', '453tT#t3q1@', 'write'),
        ];
        this.clients = [
            new Clients(1, 'Jean', 'Dupont', 'jean.dupont@example.com'),
            new Clients(2, 'Marie', 'Durand', 'marie.durand@example.com'),
            new Clients(3, 'Marthy', 'McFly', 'marthy.mcfly@bttf.com'),
            new Clients(4, 'Beef', 'Tanen', 'beef.tanen@bttf.com'),
            new Clients(5, 'Doc', 'Holiday', 'doc.holiday@western.com'),
            new Clients(6, 'Joe', 'Dalton', 'joe.dalton@western.com')
        ];
        this.films = [
            new Films(1, 'La joie de vivre', '120 min', 'Comédie', ['Pierre Dugenoux', 'Paul Beauregard', 'Sarah Fil']),
            new Films(2, 'La peur du vide', '122 min', 'Action', ['Sophie Mixée', 'Luc Douteux', 'Jean Mange-Beaucoup']),
            new Films(3, 'Le début de la fin', '143 min', 'Action', ['Sophie Dérangé', 'Luc Fafard-Allard', 'Michael Ademain']),
            new Films(4, 'Le mur', '150 min', 'Aventure', ['Pierre Dugenoux', 'Luc Douteux', 'Michael Ademain']),
            new Films(5, 'Cache-cache caché', '155 min', 'Suspens', ['Luc Douteux', 'Sophie Dérangé', 'Sarah Fil']),
            new Films(6, 'Compte à rebours', '144 min', 'Thriller', ['Sophie Mixée', 'Luc Douteux', 'Jean Mange-Beaucoup']),
            new Films(7, 'Le tour du monde', '112 min', 'Comédie', ['Sophie Dérangé', 'Luc Fafard-Allard']),
            new Films(8, 'La vie devant toi', '131 min', 'Romance', ['Sarah Fil', 'Luc Douteux'])
        ];
        this.currentUser = null;
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        // Cache la portion "application" dans la page
        document.getElementById('appPage').classList.add('inactive');
        // Montre la portion "login" dans la page
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Récupération des valeurs entrées dans les champs du formulaire de login
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            // Validation de l'identifiant et mot de passe de l'administrateur
            const user = this.users.find((u) => u.username === username && u.password === password);
            if (user) {
                this.currentUser = user;
                this.showAppPage();
            }
            else {
                document.getElementById('error').innerText = 'Nom d\'utilisateur ou mot de passe incorrect.';
            }
        });
        // Gestion des boutons de l'application
        document.getElementById('logoutButton').addEventListener('click', () => {
            this.currentUser = null;
            this.showLoginPage();
        });
        document.getElementById('clientButton').addEventListener('click', () => {
            this.showClientModal();
        });
        document.getElementById('closeClientModal').addEventListener('click', () => {
            this.hideClientModal();
        });
        // Gestion du formulaire clients
        document.getElementById('clientForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Récupération des entrées du formulaire client
            const clientName = document.getElementById('clientName').value;
            const clientLastName = document.getElementById('clientLastName').value;
            const clientEmail = document.getElementById('clientEmail').value;
            // Validation du formulaire
            if (this.validateClientForm(clientName, clientLastName, clientEmail)) {
                const newClient = new Clients(this.clients.length + 1, clientName, clientLastName, clientEmail);
                this.clients.push(newClient);
                this.hideClientModal();
                this.populateClientsTable();
            }
            else {
                // Affichage d'une erreur