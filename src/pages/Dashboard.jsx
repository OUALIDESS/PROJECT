import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../style/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Parametres = () => {
  // Données fictives
  const [consumptionData] = useState({
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4', 'Semaine 5'],
    datasets: [{ data: [400, 500, 600, 700, 300], backgroundColor: '#4a90e2' }],
  });

  const [stockDistribution] = useState({
    labels: ['Riz', 'Huile d\'Olive', 'Sucre'],
    datasets: [{ data: [70, 20, 10], backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'] }],
  });

  const [suppliers, setSuppliers] = useState([
    { id: 108, name: 'SARL Beldi', products: 'Fruits Légumes', contact: '05 67 89 02', status: 'Actif' },
    { id: 109, name: 'Entreprise Dupont', products: 'Céréales', contact: '06 12 34 56 78', status: 'Actif' },
    { id: 110, name: 'SARL OlivePro', products: 'Huile d\'Olive', contact: '05 98 76 54 32', status: 'Inactif' },
    { id: 111, name: 'Compagnie Sucra', products: 'Sucre', contact: '04 33 22 11 00', status: 'Actif' },
    { id: 112, name: 'SARL AgroFresh', products: 'Légumineuses', contact: '06 45 67 89 01', status: 'Actif' },
  ]);

  const [categories] = useState([
    { name: 'Economa', consumed: '-25%', added: '+15%' },
    { name: 'Matériel', consumed: '-10%', added: '+7%' },
    { name: 'Produits Conservés', consumed: '-5%', added: '+15%' },
    { name: 'Fruit et Légumes', consumed: '-30%', added: '+25%' },
  ]);

  // Options du graphique en barres
  const barOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Consommation des produits' } },
  };

  // Options du graphique en cercle
  const pieOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Répartition des stocks' } },
  };

  // Fonctions des boutons
  const handleRefresh = () => {
    console.log('Rafraîchissement des données...');
    alert('Les données ont été rafraîchies avec succès!');
  };

  const handleExport = () => {
    console.log('Exportation du rapport...');
    alert('Exportation du rapport en cours... (Fonctionnalité à implémenter)');
  };

  const handleAddSupplier = () => {
    console.log('Ajout d\'un nouveau fournisseur...');
    const newSupplier = {
      id: Date.now(), // ID unique basé sur le timestamp
      name: `Nouveau Fournisseur ${suppliers.length + 1}`,
      products: 'Nouveau Produit',
      contact: `06 ${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: 'Actif',
    };
    setSuppliers([...suppliers, newSupplier]);
    alert('Nouveau fournisseur ajouté avec succès!');
  };

  const handleFilter = () => {
    console.log('Filtrage des données...');
    alert('Veuillez sélectionner les critères de filtrage. (Fonctionnalité à implémenter)');
  };

  return (
    <div className="container">
      <h1 className="title">Rapport de Stock et Consommation</h1>

      {/* Sections des catégories */}
      <div className="categories">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <h3>{category.name}</h3>
            <p>Consommé: {category.consumed}</p>
            <p>Ajouté: {category.added}</p>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="charts">
        <div className="chart-card">
          <h3>Consommation des produits sur deux semaines</h3>
          <Bar data={consumptionData} options={barOptions} />
        </div>
        <div className="chart-card">
          <h3>Répartition des types de produits en stock</h3>
          <Pie data={stockDistribution} options={pieOptions} />
        </div>
      </div>

      {/* Tableau des fournisseurs */}
      <div className="suppliers-table">
        <h3>Les cinq derniers fournisseurs de ce mois</h3>
        <table>
          <thead>
            <tr>
              <th>ID Fournisseur</th>
              <th>Nom</th>
              <th>Produits</th>
              <th>Contact</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.products}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Boutons */}
      <div className="buttons">
        <button onClick={handleRefresh}>Rafraîchir les données</button>
        <button onClick={handleExport}>Exporter le rapport</button>
        <button onClick={handleAddSupplier}>Ajouter un fournisseur</button>
        <button onClick={handleFilter}>Filtrer les données</button>
      </div>
    </div>
  );
};

export default Parametres;