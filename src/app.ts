// Classe représentant un utilisateur (administrateur)
class Users{
    constructor(
        public username: string,
        public password: string,
        public role: 'read' | 'write'
    ) {}
}

// Classe représentant un client
class Clients {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string
    ) {}
}

// Classe représentant un film
class Films {
    constructor(
        public id: number,
        public title: string,
        public duration: string,
        public category: string,
        public actors: string[]
    ) {}
}

// Gestion de l'application
//
// Note: Les classes CSS 'active' et 'inactive' montrent et cachent (respectivement)
// une portion de la page HTML
//
export class App {
    private users: Users[] = [
        new Users('RobertDacier', 'e3R44r*1e!', 'read'),
        new Users('ThomasCook', 'frf2f4@f24n', 'read'),
        new Users('ChristopheColomb', '42r@@rwcw2r', 'write'),
        new Users('JustinBieber', '453tT#t3q1@', 'write'),
    ];
    private clients: Clients[] = [
        new Clients(1, 'Jean', 'Dupont', 'jean.dupont@example.com'),
        new Clients(2, 'Marie', 'Durand', 'marie.durand@example.com'),
        new Clients(3, 'Marthy', 'McFly', 'marthy.mcfly@bttf.com'),
        new Clients(4, 'Beef', 'Tanen', 'beef.tanen@bttf.com'),
        new Clients(5, 'Doc', 'Holiday', 'doc.holiday@western.com'),
        new Clients(6, 'Joe', 'Dalton', 'joe.dalton@western.com')
    ];
    private films: Films[] = [
        new Films(1, 'La joie de vivre', '120 min', 'Comédie', ['Pierre Dugenoux', 'Paul Beauregard', 'Sarah Fil']),
        new Films(2, 'La peur du vide', '122 min', 'Action', ['Sophie Mixée', 'Luc Douteux', 'Jean Mange-Beaucoup']),
        new Films(3, 'Le début de la fin', '143 min', 'Action', ['Sophie Dérangé', 'Luc Fafard-Allard', 'Michael Ademain']),
        new Films(4, 'Le mur', '150 min', 'Aventure', ['Pierre Dugenoux', 'Luc Douteux', 'Michael Ademain']),
        new Films(5, 'Cache-cache caché', '155 min', 'Suspens', ['Luc Douteux', 'Sophie Dérangé', 'Sarah Fil']),
        new Films(6, 'Compte à rebours', '144 min', 'Thriller', ['Sophie Mixée', 'Luc Douteux', 'Jean Mange-Beaucoup']),
        new Films(7, 'Le tour du monde', '112 min', 'Comédie', ['Sophie Dérangé', 'Luc Fafard-Allard']),
        new Films(8, 'La vie devant toi', '131 min', 'Romance', ['Sarah Fil', 'Luc Douteux'])
    ];
    private currentUser: Users | null = null;

    constructor() {
        this.initializeEventListeners();
    }

    private initializeEventListeners() {
        // Cache la portion "application" dans la page
        document.getElementById('appPage')!.classList.add('inactive');

        // Montre la portion "login" dans la page
        document.getElementById('loginForm')!.classList.add('active');
        document.getElementById('loginForm')!.addEventListener('submit', (e) => {
            e.preventDefault();
            // Récupération des valeurs entrées dans les champs du formulaire de login
            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;

            // Validation de l'identifiant et mot de passe de l'administrateur
            const user = this.users.find((u) => u.username === username && u.password === password);

            if (user) {
                this.currentUser = user;
                this.showAppPage();
            } else {
                (document.getElementById('error') as HTMLElement).innerText = 'Nom d\'utilisateur ou mot de passe incorrect.';
            }
        });

        // Gestion des boutons de l'application
        document.getElementById('logoutButton')!.addEventListener('click', () => {
            this.currentUser = null;
            this.showLoginPage();
        });

        document.getElementById('clientButton')!.addEventListener('click', () => {
            this.showClientModal();
        });

        document.getElementById('closeClientModal')!.addEventListener('click', () => {
            this.hideClientModal();
        });

        // Gestion du formulaire clients
        document.getElementById('clientForm')!.addEventListener('submit', (e) => {
            e.preventDefault();
            // Récupération des entrées du formulaire client
            const clientName = (document.getElementById('clientName') as HTMLInputElement).value;
            const clientLastName = (document.getElementById('clientLastName') as HTMLInputElement).value;
            const clientEmail = (document.getElementById('clientEmail') as HTMLInputElement).value;

            // Validation du formulaire
            if (this.validateClientForm(clientName, clientLastName, clientEmail)) {
                const newClient = new Clients(
                    this.clients.length + 1,
                    clientName,
                    clientLastName,
                    clientEmail
                );
                this.clients.push(newClient);
                this.hideClientModal();
                this.populateClientsTable();
            } else {
                // Affichage d'une erreur
                document.getElementById('clientError')!.innerHTML = 'Il semble y avoir un erreur dans le formulaire.';
            }
        });
    }

    // Validation du formulaire "Client"
    private validateClientForm(name: string, lastName: string, email: string): boolean {
        return name.length > 2 && lastName.length > 2 && /\S+@\S+\.\S+/.test(email);
    }

    // Montre la portion "Application"
    private showAppPage() {
        // Cache la portion "Login"
        let login = document.getElementById('loginPage');
        login!.classList.remove('active')
        login!.classList.add('inactive');

        // Montre la portion "Application"
        let app = document.getElementById('appPage')
        app!.classList.remove('inactive');
        app!.classList.add('active');

        this.populateClientsTable();
        this.populateFilmsTable();
    }

    private showLoginPage() {
        // Montre la portion "Login"
        let login = document.getElementById('loginPage')
        login!.classList.remove('inactive');
        login!.classList.add('active');

        // Cache la portion "Application"
        let app = document.getElementById('appPage')
        app!.classList.remove('active');
        app!.classList.add('inactive');
    }

    // Construction et affichage de la table "Clients"
    private populateClientsTable() {
        const table = document.getElementById('clientsTable')! as HTMLTableElement;
        table.innerHTML = `
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
            </tr>
        `;

        this.clients.forEach((client) => {
            const row = table.insertRow();
            row.insertCell(0).innerText = client.firstName;
            row.insertCell(1).innerText = client.lastName;
            row.insertCell(2).innerText = client.email;
        });
    }

    // Construction et affichage de la table "Films"
    private populateFilmsTable() {
        const table = document.getElementById('filmsTable')! as HTMLTableElement;

        table.innerHTML = `
            <tr>
                <th>Titre</th>
                <th>Durée</th>
                <th>Catégorie</th>
                <th>Acteurs</th>
            </tr>
        `;

        this.films.forEach((film) => {
            const row = table.insertRow();
            row.insertCell(0).innerText = film.title;
            row.insertCell(1).innerText = film.duration;
            row.insertCell(2).innerText = film.category;
            const actorsCell = row.insertCell(3);
            // actorsCell.innerHTML = `<button onclick="app.showActors('${film.actors.join(', ')}')">Voir acteurs</button>`;
            actorsCell.innerHTML = `
                <button class="ftx-header-img" onclick="app.showActors('${film.actors.join(', ')}')">
                    <img src="../assets/more-info.svg" alt="Voir les acteurs" title="Voir les acteurs" height="5rem"/>
                </button>
            `;
        });
    }

    // Affiche les acteurs au clic du bouton (dans la modale)
    private showActors(actors: string) {
        alert('Acteurs : ' + actors);
    }

    // Affiche la modale
    private showClientModal() {
        document.getElementById('clientModal')!.classList.add('active');
    }

    // Cache la modale
    private hideClientModal() {
        document.getElementById('clientModal')!.classList.add('inactive');
    }
}
