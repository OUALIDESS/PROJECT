import React, { useState, useEffect } from 'react';
import '../style/Parameters.css'; // Importation du fichier de styles CSS
import { FaCamera } from 'react-icons/fa'; // Importation de l'icône de caméra depuis react-icons

const Parameters = () => {
  // État initial avec chargement des données depuis localStorage si elles existent
  // Si aucune donnée n'est trouvée, on utilise les valeurs par défaut
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser
      ? JSON.parse(savedUser)
      : {
          nom: 'Nom',
          email: 'Gmail@gmail.com',
          genre: 'Homme',
          dateNaissance: '9/11/1998',
          departement: 'Compte',
          lieu: 'Maroc, Casablanca',
          profilePhoto: 'https://via.placeholder.com/50',
        };
  });

  // État pour stocker l'image sélectionnée après téléchargement
  const [selectedImage, setSelectedImage] = useState(null);

  // Effet pour mettre à jour localStorage à chaque changement dans l'état user
  // Cela garantit que les modifications sont sauvegardées localement
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  // Fonction pour mettre à jour les données lorsque l'utilisateur modifie un champ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Fonction pour gérer le téléchargement d'une nouvelle image
  // Convertit l'image en base64 et met à jour l'état
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePhoto: reader.result,
        }));
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour gérer le clic sur le bouton "changer" avec une alerte de succès
  // Les données sont déjà sauvegardées via useEffect
  const handleUpdate = () => {
    alert('Les données ont été modifiées avec succès'); // Message de confirmation
  };

  // Fonction pour déclencher l'ouverture de la fenêtre de sélection de fichier
  const triggerFileInput = () => {
    document.getElementById('imageInput').click();
  };

  // Fonction pour effacer le texte par défaut lorsqu'un champ est cliqué
  // Vérifie si la valeur est identique à la valeur par défaut avant de la vider
  const clearDefault = (e) => {
    if (e.target.value === e.target.defaultValue) {
      e.target.value = '';
    }
  };

  return (
    <div className="parameters-container">
      <h2>Vos informations</h2>
      <div className="profile-photo-section">
        <img
          src={selectedImage || user.profilePhoto}
          alt="Profil"
          className="profile-photo"
        />
        <div>
          <p>
            {user.nom} 
            <br />
            Ceci sera affiché sur votre profil.
          </p>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }} 
          />
          <FaCamera
            className="change-photo-icon"
            onClick={triggerFileInput}
          />
        </div>
      </div>
      <div className="info-grid">
        <div className="info-item">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            defaultValue={user.nom}
            onChange={handleChange}
            onFocus={clearDefault}
            placeholder="Entrez votre nom"
          />
        </div>
        <div className="info-item">
          <label>Adresse Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            onChange={handleChange}
            onFocus={clearDefault}
            placeholder="Entrez votre email"
          />
        </div>
        <div className="info-item">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            defaultValue={user.genre}
            onChange={handleChange}
            onFocus={clearDefault}
            placeholder="Entrez votre genre"
          />
        </div>
        <div className="info-item">
          <label>Date de Naissance</label>
          <input
            type="text"
            name="dateNaissance"
            defaultValue={user.dateNaissance}
            onChange={handleChange}
            onFocus={clearDefault}
            placeholder="Entrez votre date de naissance"
          />
        </div>
        <div className="info-item">
          <label>Département</label>
          <input
            type="text"
            name="departement"
            defaultValue={user.departement}
            onChange={handleChange}
            onFocus={clearDefault}
            placeholder="Entrez votre département"
          />
        </div>
        <div className="info-item">
          <label>Vivre</label>
          <input
            type="text"
            name="lieu"
            defaultValue={user.lieu}
            onChange={handleChange}
            onFocus={clearDefault}
            placeholder="Entrez votre lieu"
          />
        </div>
      </div>
      <button className="update-button" onClick={handleUpdate}>
        changer
      </button>
    </div>
  );
};

export default Parameters;