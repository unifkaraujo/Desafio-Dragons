// src/pages/AdicionarDragao/AdicionarDragao.tsx
import { useState } from 'react';
import { createDragon } from '../../api/api';
import './AdicionarDragao.css'

interface AdicionarDragaoProps {
  onClose: () => void
}

export const AdicionarDragao = ({onClose}:AdicionarDragaoProps) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDragon({ name, type });
      onClose()
    } catch (error) {
      console.error('Erro ao criar dragão', error);
    }
  };

  return (
    <div className="add-dragon-container">
      <h2>Novo Dragão</h2>
      <form className="add-dragon-form" onSubmit={submit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className='add-dragon-container-button'>
          <button type="button" onClick={onClose}>Cancelar</button>
          <button type="submit">Adicionar</button>
        </div>
      </form>
    </div>
  );
};
