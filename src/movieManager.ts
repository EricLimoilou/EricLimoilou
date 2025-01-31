const API_KEY = "395eba7d6aad64a03ca7497c05f1c016";
const BASE_URL = "https://api.themoviedb.org/3";

//Interface pour un film.
export interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    director: string;
    cast: string[];
    poster_path: string;
    vote_average: string;
    actors: string;
    runtime: string;
}

// Classe pour la gestion des films
export class MovieManager {
    private movies: Movie[] = [];

    constructor() {
        this.loadMovies();
    }

    private async loadMovies(): Promise<void> {
        try {
            const response = await fetch("../collect/movies.json");
            this.movies = await response.json();
        } catch (error) {
            console.error("Erreur de chargement du fichier JSON des films.", error);
        }
    }

    async fetchMovieDetails(movieId: number): Promise<any> {
        try {
            const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits`);
            return await response.json();
        } catch (error) {
            console.error("Erreur de récupération des détails du film :", error);
            return null;
        }
    }

    // Affiche les films sous forme de table HTML.
    displayMovies(): void {
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

        if (tableContainer) tableContainer.innerHTML = tableHTML;
    }

    
    // Récupère un ou plusieurs films via leur ID.
    getMoviesById(ids: number[]): Movie[] {
        return this.movies.filter(movie => ids.includes(movie.id));
    }

    // Ajoute un nouveau film s'il n'existe pas déjà.
    addMovie(newMovie: Movie): boolean {
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
    updateMovie(id: number, updatedData: Partial<Movie>): boolean {
        const index = this.movies.findIndex(movie => movie.id === id);
        if (index === -1) {
            console.error("Film introuvable !");
            return false;
        }

        this.movies[index] = { ...this.movies[index], ...updatedData };
        this.saveMovies();
        console.log("Film mis à jour !");
        return true;
    }

    // Supprime un film.
    deleteMovie(id: number): boolean {
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
    private saveMovies(): void {
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
(window as any).movieManager = movieManager;
