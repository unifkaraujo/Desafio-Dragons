import { useEffect, useState } from 'react';
import { getDragonById, updateDragon } from '../../api/api';
import { Loading } from '../../components/Loading';
import './EditarDragao.css';

interface EditarDragaoProps {
  onClose: () => void
  id: string
}

export const EditarDragao = ({onClose, id}:EditarDragaoProps) => {

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDragon = async () => {
      try {
        if (!id) return;
        const dragon = await getDragonById(id);
        setName(dragon.name);
        setType(dragon.type);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dragão', error);
      }
    };

    fetchDragon();
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      await updateDragon(id, { name, type });
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar dragão', error);
    }
  };

  if (loading) return <Loading />;

    return (
    <div className="edit-dragon-container">
        <h2>Editar Dragão</h2>
        <form className="edit-dragon-form" onSubmit={submit}>
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
          <button type="submit">Salvar</button>
        </div>
        </form>
    </div>
    );

};
