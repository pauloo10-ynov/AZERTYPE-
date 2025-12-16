// cette fonction permet d'afficher le socre à l'écran 
function afficherResultat (score, totalMots) {
    let spanScore = document.querySelector(".zoneScore span")
    let message = `${score} / ${totalMots}`
    spanScore.innerText = message
}
// cette fonction permet d'afficher les mots à écrire à l'écran 
function afficherProposition (proposition) {
    let zoneProposition = document.querySelector(".zoneProposition") 
    zoneProposition.innerText = proposition
}
// cette fonction construit et affiche l'email
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

// cette fonction permet de valider le champ nom
    function validerNom(nom) {
      if (nom.length < 2) {
        throw new Error("Le nom est trop  court")
      }
    }
    // cette fonction permet de valider le champ email
    function validerEmail(email) {
        let EmailRegExp = new RegExp("[a-z0-9.-_]+@[a-z0-9.-_]+\\.[a-z0-9.-_]+")
        if (!EmailRegExp.test(email)) {
            throw new Error("L'email n'est pas valide")
        }
    }

    // cette fonction permet de gérer le formulaire 
    function gérerFormulaire(scoreEmail) {
        try {
            let baliseNom = document.getElementById("nom")
            let nom = baliseNom.value
            validerNom(nom)

            let baliseEmail = document.getElementById("email")
            let email = baliseEmail.value
            validerEmail(email)
            afficherEmail(nom, email, scoreEmail)
            afficherMessageErreur("")

        } catch(erreur) {
            afficherMessageErreur(erreur.message)
        }
    }

    // cette fonction permet d'afficher le message d'erreur
    function afficherMessageErreur (message) {
        let messageErreur = document.getElementById("erreurMessage")

        if (!messageErreur) {
            let popup = document.querySelector(".popup")
            messageErreur = document.createElement("span")
            messageErreur.id = "erreurMessage"

            popup.append(messageErreur)
        }  
        messageErreur.innerText = message
    }
       

// cette fonction permet de lancer le jeu
function lancerJeu () {
    let score = 0
    let i = 0
    // on affiche la première proposition à l'écran 
    afficherProposition(listeMots[i])
    let listeProposition = listeMots
    let buttonValidation = document.getElementById("btnValiderMot")
    let inputText = document.getElementById("inputEcriture")

    // cette étape permet d'ajouter un évènement lorsqu'on clique sur le bouton (envoyer)
    buttonValidation.addEventListener("click", () => {
        console.log(inputText.value)
         if (inputText.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score,i) 
         inputText.value = ""
        if (listeProposition[i] === undefined) {
        afficherProposition("le jeu est fini")
        buttonValidation.disabled = true 
        } else {
            afficherProposition(listeProposition[i])
        }
    })
    
    // cette étape permet d'ajouter un évènement sur les boutons radios
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let j = 0; j <listeBtnRadio.length; j++) {
        listeBtnRadio[j].addEventListener("change", (event) => {
        if (event.target.value === "1") {
            listeProposition = listeMots
        } else {
            listeProposition = listePhrase
        }
        afficherProposition(listeProposition[j])
        })
    }

    // cette étape permet d'ajouter un évènement sur le formulaire 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gérerFormulaire(scoreEmail) 
    })
    afficherResultat(score, i)
}

