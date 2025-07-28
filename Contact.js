// script-carousel.js (Aucune modification à faire, il fonctionne tel quel)

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide img'); // Sélectionne toutes les images du carrousel
    let currentSlide = 0; // Index de l'image actuellement affichée

    function showNextSlide() {
        if (slides.length === 0) return; // S'assurer qu'il y a des images

        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        slides[0].classList.add('active'); // S'assure que la première image est visible au chargement
        setInterval(showNextSlide, 5000); // Démarre le carrousel
    }
});