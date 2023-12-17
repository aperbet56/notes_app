// Récupération des différents éléments
const btn = document.querySelector("#btn");
const app = document.querySelector("#app");

// Déclaration de la fonction createNote ayant pour paramètre l'id et le content permettant de créer une note
const createNote = (id, content) => {
  // Création de l'élément HTML textarea
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Votre note...";
  element.value = content;

  // Ecoute de l'événément "dblclick" sur la textarea
  element.addEventListener("dblclick", () => {
    const warning = confirm("Voulez-vous supprimer cette note ?");
    if (warning) {
      // Appel de la fonction deleteNote
      deleteNote(id, element);
    }
  });

  // Ecoute de l'événement input sur la textarea
  element.addEventListener("input", () => {
    // Appel de la fonction updateNote
    updateNote(id, element.value);
  });

  return element;
};

// Déclaration de la fonction saveNote qui va permettre de sauvegarder les notes dans le local storage
const saveNote = (notes) => {
  // La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
  // La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON.
  localStorage.setItem("note-app", JSON.stringify(notes));
};

// Déclaration de la fonction getNotes qui va permettre d'obtenir les notes
const getNotes = () => {
  // La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre.
  // La méthode JSON.parse() analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.
  return JSON.parse(localStorage.getItem("note-app") || "[]");
};

getNotes().forEach((note) => {
  const noteItem = createNote(note.id, note.content); // Appel de la fonction createNote ayant comme paramètre note.id et note.content
  // La méthode Node.insertBefore() insère un nœud avant un nœud de référence en tant qu'enfant d'un nœud parent spécifié.
  app.insertBefore(noteItem, btn);
});

// Déclaration de la fonction deleteNote qui va permettre de supprimer une note
const deleteNote = (id, element) => {
  const notes = getNotes().filter((note) => note.id != id); // Utilissation de la méthode filter afin de récupérer la note à supprimer
  // Appel de la fonction saveNote
  saveNote(notes);
  app.removeChild(element); // Suppression de la note dans le code HTML et sur la page
};

// Déclaration de la fonction updateNote ayant comme paramètre  l'id et le content qui va permettre de mettre à jour une note précise
const updateNote = (id, content) => {
  const notes = getNotes(); // Appel de la fonction getNotes afin de récupérer les notes
  const target = notes.filter((note) => note.id == id)[0]; // Utilisation de la méthode filter afin de récupérer la note à mettre à jour
  target.content = content;
  // Appel de la fonction saveNote
  saveNote(notes);
};

// Déclaration de la fonction addNote qui va permettre d'ajouter une note supplémentaire
const addNote = () => {
  const notes = getNotes(); // Appel de la fonction getNotes
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteItem = createNote(noteObj.id, noteObj.content); // Appel de la fonction createNote
  app.insertBefore(noteItem, btn); // Insertion de la nouvelle note dans le DOM

  notes.push(noteObj);
  // Appel de la fonction saveNote
  saveNote(notes);
};

// Ecoute de l'événement "click" sur le bouton et appel de la fonction addNote
btn.addEventListener("click", addNote);
