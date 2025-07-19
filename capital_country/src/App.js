import React, { useState } from 'react';
import paisesCapitales from './paises_capitales.json';
import './App.css';

function App() {
  const [cantidadPreguntas, setCantidadPreguntas] = useState('');
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState('');
  const [puntaje, setPuntaje] = useState(0);
  const [yaRespondido, setYaRespondido] = useState(false);

  const comenzarJuego = () => {
    const cantidad = parseInt(cantidadPreguntas);
    if (!cantidad || cantidad <= 0 || cantidad > paisesCapitales.length) {
      alert('Por favor elige una cantidad válida de preguntas.');
      return;
    }

    const copia = [...paisesCapitales];
    const seleccionados = [];
    while (seleccionados.length < cantidad) {
      const index = Math.floor(Math.random() * copia.length);
      seleccionados.push(copia.splice(index, 1)[0]);
    }

    setPreguntas(seleccionados);
    setJuegoIniciado(true);
    setIndiceActual(0);
    setRespuesta('');
    setResultado('');
    setPuntaje(0);
    setYaRespondido(false);
  };

  const verificarRespuesta = () => {
    if (yaRespondido) return;

    const capitalCorrecta = preguntas[indiceActual].capital.toLowerCase();
    if (respuesta.trim().toLowerCase() === capitalCorrecta) {
      setResultado('✅ ¡Correcto!');
      setPuntaje(puntaje + 1);
    } else {
      setResultado(`❌ Incorrecto. La capital es ${preguntas[indiceActual].capital}.`);
    }

    setYaRespondido(true);
  };

  const siguientePregunta = () => {
    if (indiceActual + 1 < preguntas.length) {
      setIndiceActual(indiceActual + 1);
      setRespuesta('');
      setResultado('');
      setYaRespondido(false);
    } else {
      alert(`🎉 Juego terminado. Puntaje final: ${puntaje}/${preguntas.length}`);
      setJuegoIniciado(false);
      setCantidadPreguntas('');
    }
  };

  if (!juegoIniciado) {
    return (
      <div className="App">
        <h1>Juego de Capitales</h1>
        <p>¿Cuántos países quieres adivinar?</p>
        <input
          type="number"
          min="1"
          max={paisesCapitales.length}
          value={cantidadPreguntas}
          onChange={(e) => setCantidadPreguntas(e.target.value)}
        />
        <button onClick={comenzarJuego}>Comenzar</button>
      </div>
    );
  }

  const paisActual = preguntas[indiceActual];

  return (
    <div className="App">
      <h1>Pregunta {indiceActual + 1} de {preguntas.length}</h1>
      <h2>Puntaje: {puntaje} / {preguntas.length}</h2>

      <p>¿Cuál es la capital de <strong>{paisActual.pais}</strong>?</p>

      <input
        type="text"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') verificarRespuesta();
        }}
        placeholder="Escribe la capital"
        disabled={yaRespondido}
      />
      <button onClick={verificarRespuesta} disabled={yaRespondido}>Verificar</button>

      {resultado && (
        <div>
          <p>{resultado}</p>
          <button onClick={siguientePregunta}>Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default App;
