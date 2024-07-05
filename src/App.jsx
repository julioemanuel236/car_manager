// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const initialAutos = JSON.parse(localStorage.getItem('autos')) || [
    { marca: 'Toyota', modelo: 'Corolla', año: 2018, color: 'White', kilometraje: 50000, precio: 15000 },
    { marca: 'Honda', modelo: 'Civic', año: 2020, color: 'Blue', kilometraje: 30000, precio: 18000 },
    { marca: 'Ford', modelo: 'Fiesta', año: 2019, color: 'Red', kilometraje: 40000, precio: 12000 },
    { marca: 'Chevrolet', modelo: 'Onix', año: 2021, color: 'Black', kilometraje: 20000, precio: 17000 },
    { marca: 'Toyota', modelo: 'Corolla', año: 2020, color: 'Silver', kilometraje: 25000, precio: 16000 },
    { marca: 'Ford', modelo: 'Mustang', año: 2015, color: 'Red', kilometraje: 60000, precio: 11000 }
  ];

  const today = new Date();
  const startYear = 1980;
  const endYear = today.getFullYear();

  const [nuevoMarca, setNuevoMarca] = useState('');
  const [nuevoModelo, setNuevoModelo] = useState('');
  const [nuevoAño, setNuevoAño] = useState('');
  const [years] = useState(Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i));
  const [nuevoColor, setNuevoColor] = useState('');
  const [popularColors] = useState([
    'White', 'Black', 'Gray', 'Silver', 'Blue', 'Red', 'Green', 'Brown', 'Orange', 'Beige',
    'Purple', 'Gold', 'Yellow', 'Pink', 'Maroon', 'Lime', 'Teal', 'Cyan', 'Magenta'
  ]);
  const [nuevoKilometraje, setNuevoKilometraje] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [autos, setAutos] = useState(initialAutos);
  const [editarIndex, setEditarIndex] = useState(null);
  const [marcas] = useState(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan', 'Mazda']);

  useEffect(() => {
    localStorage.setItem('autos', JSON.stringify(autos));
  }, [autos]);

  const agregarAuto = (e) => {
    e.preventDefault();
    if (!nuevoMarca.trim() || !nuevoModelo.trim() || !nuevoAño.trim() || !nuevoColor.trim() || !nuevoKilometraje.trim() || !nuevoPrecio.trim()) {
      alert('Please, complete all fields.');
      return;
    }

    const nuevoAuto = {
      marca: nuevoMarca,
      modelo: nuevoModelo,
      año: parseInt(nuevoAño),
      color: nuevoColor,
      kilometraje: parseInt(nuevoKilometraje),
      precio: parseFloat(nuevoPrecio)
    };

    if (editarIndex === null) {
      setAutos([...autos, nuevoAuto]);
    } else {
      const updatedAutos = autos.map((auto, index) => (index === editarIndex ? nuevoAuto : auto));
      setAutos(updatedAutos);
      setEditarIndex(null);
    }

    limpiarCampos();
  };

  const editarAuto = (index) => {
    setEditarIndex(index);
    const auto = autos[index];
    setNuevoMarca(auto.marca);
    setNuevoModelo(auto.modelo);
    setNuevoAño(auto.año.toString());
    setNuevoColor(auto.color);
    setNuevoKilometraje(auto.kilometraje.toString());
    setNuevoPrecio(auto.precio.toString());
  };

  const eliminarAuto = (index) => {
    const updatedAutos = autos.filter((_, i) => i !== index);
    setAutos(updatedAutos);
  };

  const limpiarCampos = () => {
    setNuevoMarca('');
    setNuevoModelo('');
    setNuevoAño('');
    setNuevoColor('');
    setNuevoKilometraje('');
    setNuevoPrecio('');
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    console.log("LRTM")
  };


  return (
    <div className="crud-container">
      <h1 className="title">Car Manage</h1>
      <button id='logout' onClick={handleLogout} className="logout-button">Logout</button>
      <form onSubmit={agregarAuto} className="crud-form">
        <select value={nuevoMarca} onChange={(e) => setNuevoMarca(e.target.value)} className="crud-select">
          <option disabled value="">Select a brand</option>
          {marcas.map((marca, index) => (
            <option key={index} value={marca}>{marca}</option>
          ))}
        </select>
        <input value={nuevoModelo} onChange={(e) => setNuevoModelo(e.target.value)} placeholder="Model" className="crud-input" />
        <select value={nuevoAño} onChange={(e) => setNuevoAño(e.target.value)} className="crud-select">
          <option disabled value="">Select a launch year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
        <select value={nuevoColor} onChange={(e) => setNuevoColor(e.target.value)} className="crud-select">
          <option disabled value="">Select a color</option>
          {popularColors.map((color, index) => (
            <option key={index} value={color}>{color}</option>
          ))}
        </select>
        <input value={nuevoKilometraje} onChange={(e) => setNuevoKilometraje(e.target.value)} placeholder="Mileage (mi)" className="crud-input" />
        <input value={nuevoPrecio} onChange={(e) => setNuevoPrecio(e.target.value)} placeholder="Price ($)" className="crud-input" />
        <button type="submit" className="crud-button">
          {editarIndex !== null ? 'Update' : 'Add'}
        </button>
        
      </form>

      <table className="crud-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Mileage</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto, index) => (
            <tr key={index}>
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>{auto.año}</td>
              <td>{auto.color}</td>
              <td>{auto.kilometraje}</td>
              <td>{auto.precio}</td>
              <td>
                <button onClick={() => editarAuto(index)} className="crud-action-editar">Edit</button>
                <button onClick={() => eliminarAuto(index)} className="crud-action-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
