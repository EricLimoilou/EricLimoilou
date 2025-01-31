var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "395eba7d6aad64a03ca7497c05f1c016";
const BASE_URL = "https://api.themoviedb.org/3";
// Classe pour la gestion des films
export class MovieManager {
    constructor() {
        this.movies = [];
        // this.movies = moviesData as unknown as Movie[]; // Conversion en type 'unknown' puis en 'Movie[]'
        this.loadMovies();
    }
    loadMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("../collect/movies.json");
                this.movies = yield response.json();
            }
            catch (error) {
                console.error("Erreur de chargement du fichier JSON des films.", error);
            }
        });
    }
    fetchMovieDetails(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits`);
                return yield response.json();
            }
            catch (error) {
                console.error("Erreur de récupération des détails du film :", error);
                return null;
            }
        });
    }
    // Affiche les films sous forme de table HTML.
    displayMovies() {
        // const table = document.createElement("table");
        // table.innerHTML = `
        //     <tr>
        //         <th>ID</th>
        //         <th>Affiche</th>
        //         <th>Titre</th>
        //         <th>Date de sortie</th>
        //         <th>Actions</th>
        //     </tr>
        // `;
        // this.movies.forEach(movie => {
        //     const row = document.createElement("tr");
        //     row.innerHTML = `
        //         <td>${movie.id}</td>
        //         <td><img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" /></td>
        //         <td>${movie.title}</td>
        //         <td>${movie.release_date}</td>
        //         <td>
        //             <button onclick="openModal(${movie.id})">Voir</button>
        //             <button onclick="deleteMovie(${movie.id})">Supprimer</button>
        //         </td>
        //     `;
        //     table.appendChild(row);
        // });
        // document.body.appendChild(table);
        const tableContainer = document.getElementById("tableContent");
        let tableHTML = `
            <table border="1">
                <thead>
                    <tr class="ftx-table-row">
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Date de sortie</th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
            <tbody>
        `;
        this.movies.forEach(movie => {
            tableHTML += `
                <tr class="ftx-table-row">
                    <td>${movie.id}</td>
                    <td>${movie.title}</td>
                    <td>${movie.release_date}</td>
                    <td>${movie.vote_average}/10</td>
                    <td>
                        <button class="ftx-header-img" onclick="openModal(${movie.id})">
                            <img src="../assets/more-info.svg" alt="Plus de détails" title="Plus de détails" height="5rem"/>
                        </button>
                    </td>
                </tr>
            `;
        });
        tableHTML += `</tbody></table>`;
        if (tableContainer)
            tableContainer.innerHTML = tableHTML;
    }
    // Récupère un ou plusieurs films via leur ID.
    getMoviesById(ids) {
        return this.movies.filter(movie => ids.includes(movie.id));
    }
    // Ajoute un nouveau film s'il n'existe pas déjà.
    addMovie(newMovie) {
        const exists = this.movies.some(movie => movie.title === newMovie.title);
        if (exists) {
            console.error("Ce film existe déjà !");
            return false;
        }
        this.movies.push(newMovie);
        this.saveMovies();
        console.log("Film ajouté avec succès !");
        return true;
    }
    // Modifie un film existant.
    updateMovie(id, updatedData) {
        const index = this.movies.findIndex(movie => movie.id === id);
        if (index === -1) {
            console.error("Film introuvable !");
            return false;
        }
        this.movies[index] = Object.assign(Object.assign({}, this.movies[index]), updatedData);
        this.saveMovies();
        console.log("Film mis à jour !");
        return true;
    }
    // Supprime un film.
    deleteMovie(id) {
        const index = this.movies.findIndex(movie => movie.id === id);
        if (index === -1) {
            console.error("Film introuvable !");
            return false;
        }
        this.movies.splice(index, 1);
        this.saveMovies();
        console.log("Film supprimé !");
        return true;
    }
    // Sauvegarde les modifications dans le fichier JSON (uniquement utilisable en backend).
    saveMovies() {
        const json = JSON.stringify(this.movies, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "movies.json";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
// Instancier MovieManager et attacher globalement
const movieManager = new MovieManager();
window.movieManager = movieManager;
