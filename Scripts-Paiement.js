// script-paiement.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Récupérer l'ID du livre depuis l'URL de la page de paiement
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id')); // Convertir l'ID en nombre entier

    // 2. Récupérer le conteneur où les détails du livre seront affichés
    const paymentBookDetailsContainer = document.getElementById('payment-book-details');
    const paymentInstructionsContainer = document.getElementById('payment-instructions-content');


    // 3. Rechercher le livre correspondant dans notre tableau 'livres' (de data.js)
    const livre = livres.find(l => l.id === bookId);

    if (livre) {
        // 4. Si le livre est trouvé, afficher ses détails spécifiques pour le paiement
        paymentBookDetailsContainer.innerHTML = `
            <h3>Vous êtes sur le point d'acheter :</h3>
            <div class="selected-book-info">
                <img src="${livre.image}" alt="Couverture de ${livre.titre}">
                <div>
                    <h4>${livre.titre}</h4>
                    <p><strong>Auteur :</strong> ${livre.auteur}</p>
                    <p><strong>Prix :</strong> ${livre.prix}</p>
                </div>
            </div>
        `;

        // Mettre à jour les instructions de paiement avec le prix du livre
        paymentInstructionsContainer.innerHTML = `
            <p>Pour confirmer votre achat de **"${livre.titre}"**, d'un montant de **${livre.prix}**, veuillez suivre les étapes ci-dessous pour effectuer un transfert via Orange Money Guinée :</p>
           
            <h3>Étape 1 : Effectuez le transfert Orange Money</h3>
            <p>Transférez le montant de **${livre.prix}** directement à notre numéro Orange Money :</p>
            <p class="phone-number"><strong>+224 626667502</strong></p>
            <p>N'oubliez pas d'indiquer le **titre du livre ("${livre.titre}")** ou la **référence de la commande** (si vous en avez une) dans la description de votre transfert.</p>
           
            <h3>Étape 2 : Envoyez-nous la preuve de paiement</h3>
            <p>Après avoir effectué le transfert, veuillez nous envoyer une **capture d'écran** de la confirmation de votre paiement.</p>
            <p>Vous pouvez nous l'envoyer par :</p>
            <ul>
                <li><strong>WhatsApp :</strong> <a href="https://wa.me/224626667502" target="_blank">+224 626667502</a></li>
                <li><strong>E-mail :</strong> <a href="kemoansoumaneconde@gmail.com">kemoansoumaneconde@gmail.com</a></li>
            </ul>
            <p>C'est très important pour que nous puissions valider votre commande rapidement.</p>

            <h3>Étape 3 : Réception de votre livre</h3>
            <p>Une fois votre paiement vérifié, nous vous enverrons le document du livre (eBook, PDF, etc.) directement à votre **adresse e-mail** dans les plus brefs délais.</p>
            <p>Assurez-vous que l'adresse e-mail que vous utiliserez pour la communication soit correcte.</p>
        `;

        // Optionnel : Mettre à jour le titre de la page
        document.title = `Paiement pour ${livre.titre} - Ma Librairie`;

    } else {
        // 5. Si aucun ID de livre n'est trouvé ou livre non existant
        paymentBookDetailsContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <p>Aucun livre spécifique sélectionné pour le paiement.</p>
                <p>Veuillez retourner à la liste des livres et sélectionner celui que vous souhaitez acheter.</p>
            </div>
        `;
        // Afficher des instructions de paiement génériques si pas de livre spécifique
        paymentInstructionsContainer.innerHTML = `
            <p>Pour toute question générale concernant le paiement, veuillez transférer l'argent à notre numéro Orange Money :</p>
            <p class="phone-number"><strong>+224 62X XXX XXX</strong></p>
            <p>Puis contactez-nous via :</p>
            <ul>
                <li><strong>WhatsApp :</strong> <a href="https://wa.me/22462XXXXXXX" target="_blank">+224 62X XXX XXX</a></li>
                <li><strong>E-mail :</strong> <a href="mailto:votre-email@example.com">votre-email@example.com</a></li>
            </ul>
        `;
        document.title = `Paiement - Ma Librairie`;
    }
});