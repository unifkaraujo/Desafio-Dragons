import { useEffect, useState, useRef } from 'react';
import { FaTrash, FaEdit, FaEye, FaPlus } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import { Loading } from '../../components/Loading';
import { AdicionarDragao } from '../AdicionarDragao/AdicionarDragao';
import { EditarDragao } from '../EditarDragao/EditarDragao';
import { DetalhesDragao } from '../DetalhesDragao/DetalhesDragao';
import { getDragons, deleteDragon } from '../../api/api';
import './ListaDragoes.css';

interface Dragon {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

export const ListaDragoes = () => {

  // Setando as constantes
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDragao, setAddDragao] = useState(false)
  const [editarDragao, setEditarDragao] = useState(false)
  const [detDragao, setDetDragao] = useState(false)
  const [excluiDragao, setExcluiDragao] = useState(false)
  const [idDragaoAtual, setIdDragaoAtual] = useState('')
  const [refresh, setRefresh] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null);

  // Manipulação dos modais, para ter o comportamento adequado
  useEffect(() => {

     // Bloqueia o scroll quando qualquer modal for aberto
    if (addDragao || editarDragao || detDragao || excluiDragao) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

     // Fecha o modla ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      console.log('aqui está entrando', modalRef.current)
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        console.log('e aqui ?')
        setAddDragao(false);
        setEditarDragao(false);
        setDetDragao(false);
        setExcluiDragao(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [addDragao, editarDragao, detDragao, excluiDragao]);

  // Listagem ordenada dos dragões
  useEffect(() => {
    const fetchDragons = async () => {
      try {
        const data = await getDragons();
        const sorted = data.sort((a: Dragon, b: Dragon) => a.name.localeCompare(b.name));
        setDragons(sorted);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dragões', error);
      }
    };

    fetchDragons();
  }, [refresh]);

  // Exclusão do dragão
  const excluirDragao = async (id: string) => {
    try {
      await deleteDragon(id);
      setExcluiDragao(false)
      setRefresh(!refresh)
    } catch (error) {
      console.error('Erro ao deletar dragão', error);
    }
  };

  // Constantes de função
  const atualizaLista = () => {
    setAddDragao(false)
    setEditarDragao(false)
    setDetDragao(false)
    setRefresh(!refresh)
  }

  const editDragaoAtual = (id: string) => {
    setIdDragaoAtual(id)
    setEditarDragao(true)
  }

  const detDragaoAtual = (id: string) => {
    setIdDragaoAtual(id)
    setDetDragao(true)
  }

  const excluiDragaoAtual = (id: string) => {
    setIdDragaoAtual(id)
    setExcluiDragao(true)
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header />

      {/* Conteúdo principal */}
      <main className='lista-dragao-background'>

        <div className="lista-dragao-container">

          <div className="lista-header">
            <h2>Lista de Dragões</h2>
            <div className="header-actions">
              <button className="btn purple" onClick={() => setAddDragao(true)}>
                <FaPlus /> Adicionar Dragão
              </button>
            </div>
          </div>

          <ul className="dragao-lista">
            {dragons.map((dragon) => (
              <li key={dragon.id} className="dragao-item">
                <span>{dragon.name}</span>
                <div className="actions">
                  <button 
                    className="btn purple" 
                    onClick={() => detDragaoAtual(dragon.id)}
                    title="Ver Detalhes"
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="btn purple" 
                    onClick={() => editDragaoAtual(dragon.id)}
                    title="Editar Dragão"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="btn red" 
                    onClick={() => excluiDragaoAtual(dragon.id)}
                    title="Excluir Dragão"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </main>

      {/* Conteúdo dos modais*/}
      {addDragao && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <button className="modal-close" onClick={() => setAddDragao(false)}>X</button>
            <AdicionarDragao onClose={atualizaLista} />
          </div>
        </div>
      )}

      {editarDragao && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <button className="modal-close" onClick={() => setEditarDragao(false)}>X</button>
            <EditarDragao onClose={atualizaLista} id={idDragaoAtual}/>
          </div>
        </div>
      )}

      {detDragao && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <button className="modal-close" onClick={() => setDetDragao(false)}>X</button>
            <DetalhesDragao id={idDragaoAtual}/>
          </div>
        </div>
      )}

      {excluiDragao && (
        <div className="modal-overlay">
          <div className="modal-content exclui-dragon-modal" ref={modalRef}>
            <button className="modal-close" onClick={() => setExcluiDragao(false)}>X</button>

            <div className='exclui-dragon'>

              <h2>Confirmar exclusão</h2>
              <h3>Tem certeza que deseja excluir este dragão? Esta ação não pode ser desfeita.</h3>

              <div className='exclui-dragon-button'>
                <button type='button' onClick={() => setExcluiDragao(false)}>Cancelar</button>
                <button type='submit' onClick={() => excluirDragao(idDragaoAtual)}>Excluir</button>
              </div>

            </div>

          </div>
        </div>
      )}

    </>
  );
};