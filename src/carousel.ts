export class Carousel {
    private images: string[];
    private carouselElement: HTMLElement;

    constructor(images: string[], carouselId: string) {
        // Récupère le ID dans le HTML
        this.images = images;
        const element = document.getElementById(carouselId);
        if (!element) {
            throw new Error(`L\'élément avec le ID '${carouselId}' ne semble pas exister.`);
        }
        this.carouselElement = element;
    }

    public initCarousel(): void {
        // Duplication des images pour créer un carousel infini
        const allImages = this.images.concat(this.images);

        // Creation d'une balise image avec les attributs correspondants
        allImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = "Affiche de film.";
            this.carouselElement.appendChild(imgElement);
        });
    }
}