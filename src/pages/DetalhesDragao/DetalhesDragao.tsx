import { useEffect, useState } from 'react';
import { getDragonById } from '../../api/api';
import { Loading } from '../../components/Loading';
import './DetalhesDragao.css';

interface Dragon {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

interface DetDragaoProps {
  id: string
}

export const DetalhesDragao = ({id}:DetDragaoProps) => {

  const [dragon, setDragon] = useState<Dragon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDragon = async () => {
      try {
        const data = await getDragonById(id as string);
        setDragon(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar os detalhes do dragão', error);
      }
    };

    if (id) {
      fetchDragon();
    }
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="dragon-details-container">
      <h2>Detalhes do Dragão</h2>
      {dragon ? (
        <div className="dragon-details">
          <p><strong>Nome:</strong> {dragon.name}</p>
          <p><strong>Tipo:</strong> {dragon.type}</p>
          <p><strong>Data de Criação:</strong> {new Date(dragon.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Dragão não encontrado.</p>
      )}
    </div>
  );
};
