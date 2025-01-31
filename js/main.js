import { UserManager } from '../dist/userManager.js';
import { generateUserTable } from '../dist/generateTable.js';
// import { generateMovieTable } from '../dist/generateTableMovie.js';
import { MovieManager } from '../dist/movieManager.js';


let str = 'accessGranted';
let grant = localStorage.getItem('FletnixAdminHasAccessGranted', str);

if (grant != str) {
    window.location.href = "../index.html";   
} else {
    let clients = document.getElementById('clients');
    // let content = document.getElementById('content');
    let logout = document.getElementById('logout');

    clients.addEventListener('click', function() {
        readClients();
    });

    content.addEventListener('click', function() {
        readMovies();
    });

    logout.addEventListener('click', function() {
        let str = '';
        localStorage.setItem('FletnixAdminHasAccessGranted', str);
        window.location.href = "../index.html";
    })
}

function readClients() {
    generateUserTable();
}

// function readMovies() {
//     // Crée le bouton dans le menu
//     let content = document.getElementById('content');
//     content?.addEventListener('click', function() {

//         // Instanciation et affichage des films
//         const movieManager = new MovieManager();
//         movieManager.displayMovies();

//         // Exposer certaines fonctions globalement (pour les boutons de modale)
//         (window as any).openModal = (id: number) => {
//             const movie = movieManager.getMoviesById([id])[0];
//             if (!movie) return;
            
//             const modal = document.createElement("div");
//             modal.style.position = "fixed";
//             modal.style.top = "50%";
//             modal.style.left = "50%";
//             modal.style.transform = "translate(-50%, -50%)";
//             modal.style.backgroundColor = "white";
//             modal.style.padding = "20px";
//             modal.style.border = "1px solid black";
//             modal.innerHTML = `
//                 <h2>${movie.title} (${movie.release_date})</h2>
//                 <p><strong>Résumé :</strong> ${movie.overview}</p>
//                 <p><strong>Réalisateur :</strong> ${movie.director}"}</p>
//                 <p><strong>Acteurs principaux :</strong> ${movie.actors}</p>
//                 <p><strong>Note :</strong> ${movie.vote_average}/10</p>
//                 <p><strong>Durée :</strong> ${movie.runtime} minutes</p>
//                 <button onclick="closeModal()">Fermer</button>
//             `;
//             document.body.appendChild(modal);
//         };
//     });
// }

function readMovies() {
    window.movieManager.displayMovies();

    // Exposer certaines fonctions globalement (pour les boutons de modale)
        (window).openModal = async (id) => {
            const movie = movieManager.getMoviesById([id])[0];
            if (!movie) return;
            
            const modal = document.getElementById("movie-modal");
            const modalContent = document.getElementById("modal-content");

            if (!modal || !modalContent) {
                console.error("Élément de la modale introuvable !");
                return;
            }

            // Interroge l'API pour obtenir des infos supplémentaires sur le film
            const movieDetail = await movieManager.fetchMovieDetails(id);
            if (!movieDetail) return;

            // Récupération des acteurs et réalisateur
            const director = movieDetail.credits.crew.find((person) => person.job == "Director");
            const actors = movieDetail.credits.cast.slice(0, 5).map((actor) => actor.name).join(", ");

            modalContent.innerHTML = `
                <h2>${movieDetail.title} (${movieDetail.release_date})</h2>
                <p><strong>Résumé :</strong> ${movieDetail.overview}</p>
                <p><strong>Réalisateur :</strong> ${director.name}</p>
                <p><strong>Acteurs principaux :</strong> ${actors}</p>
                <p><strong>Note :</strong> ${movieDetail.vote_average}/10</p>
                <p><strong>Durée :</strong> ${movieDetail.runtime} minutes</p>
                <button onclick="closeModal()">Fermer</button>
            `;
            modal.style.display = "block";
        };
}

function closeModal() {
    const modal = document.getElementById("movie-modal");
    if (modal) modal.style.display = "none";
}