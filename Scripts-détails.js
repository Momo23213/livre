// script-details.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Récupérer l'ID du livre depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id'));

    // 2. Récupérer le conteneur où les détails du livre seront affichés
    const bookDetailsContainer = document.getElementById('book-details-container');

    // Assurez-vous que le tableau 'livres' est disponible (il doit venir de data.js)
    if (typeof livres === 'undefined') {
        console.error("Erreur : Le tableau 'livres' n'est pas défini. Assurez-vous que data.js est chargé AVANT script-details.js.");
        bookDetailsContainer.innerHTML = `<p style="text-align: center; color: red;">Une erreur s'est produite lors du chargement des données des livres.</p>`;
        return; // Arrête l'exécution si les données ne sont pas là
    }

    // 3. Rechercher le livre correspondant dans notre tableau 'livres'
    const livre = livres.find(l => l.id === bookId);

    if (livre) {
        // 4. Si le livre est trouvé, construire le contenu HTML détaillé
        bookDetailsContainer.innerHTML = `
            <div class="detail-content">
                <img src="${livre.image}" alt="Couverture de ${livre.titre}">
                <div>
                    <h2>${livre.titre}</h2>
                    <p><strong>Auteur :</strong> ${livre.auteur}</p>
                    <p><strong>Prix :</strong> ${livre.prix}</p>
                    <p><strong>Description :</strong></p>
                    <p>${livre.description}</p>
                    <a href="paiement.html?id=${livre.id}" class="button primary">Acheter ce livre</a>
                    <a href="livres.html" class="button">Retour à la liste</a>
                </div>
            </div>

            <section class="reviews-section">
                <h3>Laissez votre avis sur ce livre</h3>
                <div class="rating-form">
                    <p>Votre note :</p>
                    <div class="stars" data-rating="0">
                        <span class="star" data-value="1">&#9733;</span>
                        <span class="star" data-value="2">&#9733;</span>
                        <span class="star" data-value="3">&#9733;</span>
                        <span class="star" data-value="4">&#9733;</span>
                        <span class="star" data-value="5">&#9733;</span>
                    </div>
                    <textarea id="commentText" placeholder="Écrivez votre commentaire ici..."></textarea>
                    <button id="submitReview" class="button primary">Envoyer l'avis</button>
                </div>

                <h3>Commentaires des lecteurs</h3>
                <div class="comments-list" id="commentsList">
                    <div class="comment-item">
                        <p class="comment-rating">
                            <span class="star rated">&#9733;</span>
                            <span class="star rated">&#9733;</span>
                            <span class="star rated">&#9733;</span>
                            <span class="star rated">&#9733;</span>
                            <span class="star rated">&#9733;</span>
                        </p>
                        <p class="comment-text">"Ce livre est absolument magnifique, une vraie source d'inspiration. Je le recommande vivement !"</p>
                        <p class="comment-author">- Lecteur Anonyme</p>
                    </div>
                     <div class="comment-item">
                        <p class="comment-rating">
                            <span class="star rated">&#9733;</span>
                            <span class="star rated">&#9733;</span>
                            <span class="star rated">&#9733;</span>
                            <span class="star">&#9733;</span>
                            <span class="star">&#9733;</span>
                        </p>
                        <p class="comment-text">"Lecture intéressante mais j'aurais aimé un peu plus de développement sur certains points."</p>
                        <p class="comment-author">- Lectrice Passionnée</p>
                    </div>
                    </div>
            </section>
            `;
       
        // Mettre à jour le titre de la page avec le titre du livre
        document.title = `Détails - ${livre.titre} - Ma Librairie`;

        // --- CODE JAVASCRIPT POUR GÉRER LES ÉTOILES ET COMMENTAIRES ---
        const starsContainer = document.querySelector('.stars');
        const commentButton = document.getElementById('submitReview');
        const commentText = document.getElementById('commentText');
        const commentsList = document.getElementById('commentsList');

        if (starsContainer) {
            let userRating = 0; // Note sélectionnée par l'utilisateur

            // Gère le clic sur les étoiles
            starsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('star')) {
                    userRating = parseInt(e.target.dataset.value);
                    updateStars(userRating);
                }
            });

            // Gère le survol des étoiles pour prévisualiser la sélection
            starsContainer.addEventListener('mouseover', (e) => {
                if (e.target.classList.contains('star')) {
                    const hoverRating = parseInt(e.target.dataset.value);
                    updateStars(hoverRating, true); // true pour indiquer un survol
                }
            });

            // Gère la sortie de la souris des étoiles pour revenir à la note sélectionnée
            starsContainer.addEventListener('mouseout', () => {
                updateStars(userRating);
            });

            // Fonction pour mettre à jour l'affichage des étoiles
            function updateStars(rating, isHover = false) {
                starsContainer.querySelectorAll('.star').forEach(star => {
                    const starValue = parseInt(star.dataset.value);
                    if (isHover) {
                        star.classList.toggle('hovered', starValue <= rating);
                        star.classList.remove('rated'); // Enlève la classe rated pendant le survol
                    } else {
                        star.classList.toggle('rated', starValue <= rating);
                        star.classList.remove('hovered'); // Enlève la classe hovered
                    }
                });
            }
        }

        // Gère l'envoi du commentaire
        if (commentButton) {
            commentButton.addEventListener('click', () => {
                const comment = commentText.value.trim();
                if (userRating === 0) {
                    alert("Veuillez donner une note en sélectionnant des étoiles !");
                    return;
                }
                if (comment === "") {
                    alert("Veuillez écrire un commentaire !");
                    return;
                }

                // Crée un nouveau commentaire (temporaire)
                const newCommentItem = document.createElement('div');
                newCommentItem.classList.add('comment-item');
                newCommentItem.innerHTML = `
                    <p class="comment-rating">
                        ${'<span class="star rated">&#9733;</span>'.repeat(userRating)}
                        ${'<span class="star">&#9733;</span>'.repeat(5 - userRating)}
                    </p>
                    <p class="comment-text">"${comment}"</p>
                    <p class="comment-author">- Lecteur Actuel</p>
                `;
                commentsList.prepend(newCommentItem); // Ajoute le nouveau commentaire en haut de la liste

                // Réinitialiser le formulaire
                commentText.value = '';
                userRating = 0;
                updateStars(0);
                alert("Votre avis a été ajouté ! (Visible temporairement)");
            });
        }
        // --- FIN DU CODE JAVASCRIPT POUR GÉRER LES ÉTOILES ET COMMENTAIRES ---

    } else {
        // Si aucun livre n'est trouvé pour l'ID donné
        bookDetailsContainer.innerHTML = `
            <div class="detail-error">
                <p>Livre non trouvé.</p>
                <p>Veuillez retourner à la <a href="livres.html">liste des livres</a>.</p>
            </div>
        `;
        document.title = `Livre introuvable - Ma Librairie`;
    }
});