import { MovieManager } from "../src/movieManager"; // Assure-toi du bon chemin
import { Movie } from "../src/movieManager"; // Import de l'interface Movie

describe("MovieManager", () => {
    let movieManager: MovieManager;

    beforeEach(() => {
        // Jeux de test avec quelques films
        movieManager = new MovieManager([
            { id: 1, title: "Inception", release_date: "2010-07-16", overview: "Un film de Nolan", director: "Christopher Nolan", cast: ["Leonardo DiCaprio"], poster_path: "/inception.jpg" },
            { id: 2, title: "Interstellar", release_date: "2014-11-07", overview: "Voyage dans l'espace", director: "Christopher Nolan", cast: ["Matthew McConaughey"], poster_path: "/interstellar.jpg" }
        ]);
    });

    test("Récupérer un film par ID", () => {
        const movie = movieManager.getMoviesById([1]);
        expect(movie).toHaveLength(1);
        expect(movie[0].title).toBe("Inception");
    });

    test("Ajouter un film qui n'existe pas", () => {
        const newMovie: Movie = { id: 3, title: "Dunkirk", release_date: "2017-07-21", overview: "Film de guerre", director: "Christopher Nolan", cast: ["Tom Hardy"], poster_path: "/dunkirk.jpg" };

        const added = movieManager.addMovie(newMovie);
        expect(added).toBe(true);

        const movie = movieManager.getMoviesById([3]);
        expect(movie).toHaveLength(1);
        expect(movie[0].title).toBe("Dunkirk");
    });

    test("Ne pas ajouter un film qui existe déjà", () => {
        const duplicateMovie: Movie = { id: 4, title: "Inception", release_date: "2010-07-16", overview: "Un film de Nolan", director: "Christopher Nolan", cast: ["Leonardo DiCaprio"], poster_path: "/inception.jpg" };

        const added = movieManager.addMovie(duplicateMovie);
        expect(added).toBe(false);
    });

    test("Modifier un film existant", () => {
        const updated = movieManager.updateMovie(1, { overview: "Film culte de Nolan" });
        expect(updated).toBe(true);

        const movie = movieManager.getMoviesById([1]);
        expect(movie[0].overview).toBe("Film culte de Nolan");
    });

    test("Ne pas modifier un film inexistant", () => {
        const updated = movieManager.updateMovie(99, { overview: "Film inconnu" });
        expect(updated).toBe(false);
    });

    test("Supprimer un film existant", () => {
        const deleted = movieManager.deleteMovie(2);
        expect(deleted).toBe(true);

        const movie = movieManager.getMoviesById([2]);
        expect(movie).toHaveLength(0);
    });

    test("Ne pas supprimer un film inexistant", () => {
        const deleted = movieManager.deleteMovie(99);
        expect(deleted).toBe(false);
    });
});
