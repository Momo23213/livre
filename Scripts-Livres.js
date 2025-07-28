// script-livres.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Récupérer le conteneur où les livres seront affichés
    const booksContainer = document.getElementById('books-container');

    // 2. Vérifier si des livres existent dans le tableau 'livres' (défini dans data.js)
    if (typeof livres !== 'undefined' && Array.isArray(livres)) {
        // 3. Parcourir chaque livre dans le tableau 'livres'
        livres.forEach(livre => {
            // 4. Créer un élément 'div' pour chaque carte de livre
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card'); // Ajouter la classe CSS 'book-card'

            // 5. Construire le contenu HTML de la carte de livre
            bookCard.innerHTML = `
                <img src="${livre.image}" alt="Couverture de ${livre.titre}">
                <h3>${livre.titre}</h3>
                <p><strong>Auteur :</strong> ${livre.auteur}</p>
                <p><strong>Prix :</strong> ${livre.prix}</p>
                <p>${livre.description}</p>
                <a href="details.html?id=${livre.id}" class="button">Voir les détails</a>
                <a href="paiement.html?id=${livre.id}" class="button primary">Acheter ce livre</a>
            `;

            // 6. Ajouter la carte de livre au conteneur
            booksContainer.appendChild(bookCard);
        });
    } else {
        // Afficher un message si aucun livre n'est trouvé
        booksContainer.innerHTML = '<p>Aucun livre n\'est disponible pour le moment.</p>';
    }
});