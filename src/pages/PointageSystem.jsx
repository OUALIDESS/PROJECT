import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEllipsisV, FaTrash, FaEye, FaEdit, FaPlus } from 'react-icons/fa'; 
import '../style/PointageSystem.css';

const PointageSystem = () => {

  const getInitialDemandes = () => {
    const savedDemandes = localStorage.getItem('demandes');
    return savedDemandes ? JSON.parse(savedDemandes) : [
      { id: 1, nom: 'Sabrina Kabbaj', duree: '10 jours', date: '01/02/2025 au 10/02/2025', cause: 'Maladie', statut: '', reclamation: true, approuve: false },
      { id: 2, nom: 'Mouad El Bouazizi', duree: '4 jours', date: '15/03/2025 au 20/03/2025', cause: 'Décès d\'un proche', statut: 'En attente', reclamation: true, approuve: false },
      { id: 3, nom: 'Leila Bouchareb', duree: '6 jours', date: '01/04/2025 au 07/04/2025', cause: 'Activité extrascolaire', statut: 'En attente', reclamation: true, approuve: false },
      { id: 4, nom: 'Samir El Fassi', duree: '10 jours', date: '01/04/2025 au 07/04/2025', cause: 'Imprévu scolaire', statut: 'En attente', reclamation: true, approuve: false },
      { id: 5, nom: 'Fatima Zahra El Idrissi', duree: '2 jours', date: '15/03/2025 au 20/03/2025', cause: 'Maladie', statut: 'fini', reclamation: false, approuve: true },
      { id: 6, nom: 'Imane El Ouardi', duree: '3 jours', date: '05/05/2025 au 12/05/2025', cause: 'Décès d\'un proche', statut: 'En attente', reclamation: true, approuve: false },
      { id: 7, nom: 'Mouad El Filali', duree: '2 jours', date: '05/05/2025 au 12/05/2025', cause: 'Activité extrascolaire', statut: 'En attente', reclamation: true, approuve: false },
      { id: 8, nom: 'Naima Bensaid', duree: '12 jours', date: '05/05/2025 au 12/05/2025', cause: 'Maladie', statut: 'En attente', reclamation: true, approuve: false },
      { id: 9, nom: 'Tariq Azzouzi', duree: '9 jours', date: '05/05/2025 au 12/05/2025', cause: 'Décès d\'un proche', statut: 'En attente', reclamation: true, approuve: false },
      { id: 10, nom: 'Mounir Lahlou', duree: '1 jours', date: '15/10/2025 au 25/10/2025', cause: 'Imprévu scolaire', statut: 'En attente', reclamation: true, approuve: false },
      { id: 11, nom: 'Khadija Bougemää', duree: '1 jours', date: '15/10/2025 au 25/10/2025', cause: 'Imprévu scolaire', statut: 'En attente', reclamation: true, approuve: false },
    ];
  };

  const [demandes, setDemandes] = useState(getInitialDemandes);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDemande, setNewDemande] = useState({ nom: '', duree: '', date: '', cause: '', statut: 'En attente', reclamation: false, approuve: false });
  const [showDropdown, setShowDropdown] = useState(null);
  const [editDemande, setEditDemande] = useState(null);
  const [editedData, setEditedData] = useState({ nom: '', duree: '', date: '', cause: '', statut: '', reclamation: false, approuve: false });
  const [selectedStatus, setSelectedStatus] = useState(null);

  
  useEffect(() => {
    localStorage.setItem('demandes', JSON.stringify(demandes));
  }, [demandes]);

  
  useEffect(() => {
    const currentDate = new Date(); 
      const updatedDemandes = demandes.map((demande) => {
      const [startDateStr, endDateStr] = demande.date.split(' au ');
      const [startDay, startMonth, startYear] = startDateStr.split('/').map(Number);
      const [endDay, endMonth, endYear] = endDateStr.split('/').map(Number);
      const startDate = new Date(startYear, startMonth - 1, startDay); 
      const endDate = new Date(endYear, endMonth - 1, endDay);         

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error(`Invalid date format for demande ${demande.nom}: ${demande.date}`);
        return demande; 
      }

      if (startDate > currentDate) {
        return { ...demande, statut: 'En attente' };
      } else if (startDate <= currentDate && endDate >= currentDate) {
        return { ...demande, statut: 'commencé' };
      } else if (endDate < currentDate) {
        return { ...demande, statut: 'fini' };
      }
      return demande;
    });
    setDemandes(updatedDemandes);
  }, []);

  
  const totalDemandes = demandes.length;
  const enAttenteCount = demandes.filter((d) => d.statut === 'En attente').length;
  const approuveCount = demandes.filter((d) => d.approuve === true).length; 
  const rejeteCount = demandes.filter((d) => d.reclamation === true).length; 

  
  const filteredDemands = selectedStatus
    ? demandes.filter((demande) => {
        if (selectedStatus === 'En attente') return demande.statut === 'En attente';
        if (selectedStatus === 'Approuvé') return demande.approuve === true; 
        if (selectedStatus === 'Rejeté') return demande.reclamation === true; 
        return false;
      })
    : demandes;

  console.log('All Demandes:', demandes);
  console.log('Filtered Demands for', selectedStatus, ':', filteredDemands); 

  const handleAfficher = (id) => {
    const demande = demandes.find((d) => d.id === id);
    alert(`Détails: ${demande.nom} - ${demande.cause} - ${demande.statut}`);
    setShowDropdown(null);
  };

  const handleModifier = (id) => {
    const demande = demandes.find((d) => d.id === id);
    setEditDemande(id);
    setEditedData({ ...demande });
  };

  
  const handleSaveEdit = () => {
    setDemandes(demandes.map((d) => (d.id === editDemande ? { ...editedData, id: d.id } : d)));
    setEditDemande(null);
  };

  
  const handleCancelEdit = () => {
    setEditDemande(null);
  };

  
  const handleSupprimer = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette demande ?')) {
      setDemandes(demandes.filter((d) => d.id !== id));
    }
  };

  
  const handleAddDemande = () => {
    setDemandes([...demandes, { ...newDemande, id: Date.now() }]);
    setNewDemande({ nom: '', duree: '', date: '', cause: '', statut: 'En attente', reclamation: false, approuve: false }); // إعادة تعيين مع قيم افتراضية
    setShowAddForm(false);
  };

  return (
    <div className="pointage-system">
      <div className="header">
        <h2>{totalDemandes} Demandes</h2>
        <div className="status-tabs">
          <button className="status-button" onClick={() => setSelectedStatus(null)}>
            Tout afficher
          </button>
          <button className="status-button" onClick={() => setSelectedStatus('En attente')}>
            En attente <span className="badge">{enAttenteCount}</span>
          </button>
          <button className="status-button" onClick={() => setSelectedStatus('Approuvé')}>
            Approuvé <span className="badge">{approuveCount}</span>
          </button>
          <button className="status-button" onClick={() => setSelectedStatus('Rejeté')}>
            Rejeté <span className="badge">{rejeteCount}</span>
          </button>
        </div>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          <FaPlus /> Ajouter Demande
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Durée</th>
            <th>Date</th>
            <th>Cause d'absence</th>
            <th>Statut de demande</th>
            <th>Rejeté</th>
            <th>Approuvé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDemands.length > 0 ? (
            filteredDemands.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.nom} <span className="stagiaire">stagiaire</span></td>
                <td>{demande.duree}</td>
                <td>{demande.date}</td>
                <td>{demande.cause}</td>
                <td>{demande.statut}</td>
                <td>{demande.reclamation ? <FaCheck /> : <FaTimes />}</td>
                <td>{demande.approuve ? <FaCheck /> : <FaTimes />}</td>
                <td>
                  {demande.statut === 'fini' ? (
                    <span className="delete-icon" onClick={() => handleSupprimer(demande.id)}>
                      <FaTrash />
                    </span>
                  ) : (
                    <div className="action-dropdown">
                      <span className="dots" onClick={() => setShowDropdown(showDropdown === demande.id ? null : demande.id)}>
                        <FaEllipsisV />
                      </span>
                      {showDropdown === demande.id && (
                        <div className="dropdown-content">
                          <button onClick={() => handleAfficher(demande.id)}>
                            <FaEye /> Afficher
                          </button>
                          <button onClick={() => handleModifier(demande.id)}>
                            <FaEdit /> Modifier
                          </button>
                          <button onClick={() => handleSupprimer(demande.id)}>
                            <FaTrash /> Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Aucune demande trouvée pour cette catégorie.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showAddForm && (
        <div className="add-form">
          <h3>Ajouter une nouvelle demande</h3>
          <input
            type="text"
            placeholder="Nom"
            value={newDemande.nom}
            onChange={(e) => setNewDemande({ ...newDemande, nom: e.target.value })}
          />
          <input
            type="text"
            placeholder="Durée"
            value={newDemande.duree}
            onChange={(e) => setNewDemande({ ...newDemande, duree: e.target.value })}
          />
          <input
            type="text"
            placeholder="Date (DD/MM/YYYY au DD/MM/YYYY)"
            value={newDemande.date}
            onChange={(e) => setNewDemande({ ...newDemande, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cause"
            value={newDemande.cause}
            onChange={(e) => setNewDemande({ ...newDemande, cause: e.target.value })}
          />
          <div>
            <label>
              <input
                type="radio"
                name="status" 
                checked={newDemande.reclamation === true && newDemande.approuve === false}
                onChange={() => setNewDemande({ ...newDemande, reclamation: true, approuve: false })}
              /> Rejeté
            </label>
            <label>
              <input
                type="radio"
                name="status" 
                checked={newDemande.approuve === true && newDemande.reclamation === false}
                onChange={() => setNewDemande({ ...newDemande, approuve: true, reclamation: false })}
              /> Approuvé
            </label>
          </div>
          <button onClick={handleAddDemande}>Ajouter</button>
          <button onClick={() => setShowAddForm(false)}>Annuler</button>
        </div>
      )}

      {editDemande && (
        <div className="add-form">
          <h3>Modifier la demande</h3>
          <input
            type="text"
            placeholder="Nom"
            value={editedData.nom}
            onChange={(e) => setEditedData({ ...editedData, nom: e.target.value })}
          />
          <input
            type="text"
            placeholder="Durée"
            value={editedData.duree}
            onChange={(e) => setEditedData({ ...editedData, duree: e.target.value })}
          />
          <input
            type="text"
            placeholder="Date (DD/MM/YYYY au DD/MM/YYYY)"
            value={editedData.date}
            onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cause"
            value={editedData.cause}
            onChange={(e) => setEditedData({ ...editedData, cause: e.target.value })}
          />
          <select
            value={editedData.statut}
            onChange={(e) => setEditedData({ ...editedData, statut: e.target.value })}
          >
            <option value="En attente">En attente</option>
            <option value="commencé">commencé</option>
            <option value="fini">fini</option>
          </select>
          <div>
            <label>
              <input
                type="radio"
                name="status" 
                checked={editedData.reclamation === true && editedData.approuve === false}
                onChange={() => setEditedData({ ...editedData, reclamation: true, approuve: false })}
              /> Rejeté
            </label>
            <label>
              <input
                type="radio"
                name="status" 
                checked={editedData.approuve === true && editedData.reclamation === false}
                onChange={() => setEditedData({ ...editedData, approuve: true, reclamation: false })}
              /> Approuvé
            </label>
          </div>
          <button onClick={handleSaveEdit}>Sauvegarder</button>
          <button onClick={handleCancelEdit}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default PointageSystem;