import { toast } from "react-toastify";
import listService from "../services/listService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaShareAltSquare } from "react-icons/fa";
import { useState } from "react";
import { ShareListModal } from "./ShareListModal";

export const ListsList = ({ pending, lists = [], setLists }) => {
  const [showModal, setShowModal] = useState(false);
  const [listToShare, setListToShare] = useState({});

  const navigate = useNavigate();

  const handleComplete = async (id) => {
    const response = await listService.update({ status: "Completada" }, id);

    if (response.status != 200) return;

    toast.info("Lista completada exitosamente");
    const lists = await listService.getMany();
    setLists(lists);
  };

  const handleDelete = async (id) => {
    const filteredLists = lists.filter((list) => list.id !== id);
    const response = await listService.delete(id);

    if (response.status != 200) return;

    toast.error(response.data.message);
    setLists(filteredLists);
  };

  const handleEdit = (id) => {
    navigate(`/list/${id}`);
  };

  if (pending) {
    return <div>Loading...</div>;
  }

  if (!lists.length) {
    return <div>No hay listas para mostrar</div>;
  }

  const handleShareList = (list) => {
    setShowModal(true);
    setListToShare(list);
  }

  return (
    <>
    <CardContainer>
      {lists.map((list) => (
        <Card key={list.id}>
          <CardHeader>
            <Title>{list.title} {list.status === 'Completada' ? '✅' : '❌'}</Title>
            <FaShareAltSquare size={24} onClick={() => {handleShareList(list)}} />
          </CardHeader>
          {
            list?.items?.length > 0 && (
              <ItemsContainer>
                {list.items.slice(0, 5).map((item) => (
                  <p key={item.id}>{item.name}: {item.quantity}</p>
                ))}
              </ItemsContainer>
            )
          }
          <ButtonGroup>
            <Button type="success" onClick={() => handleEdit(list.id)}>Ver</Button>
            <Button onClick={() => handleComplete(list.id)}>Completar</Button>
            <Button type="danger" onClick={() => handleDelete(list.id)}>Eliminar</Button>
          </ButtonGroup>
        </Card>
      ))}
    </CardContainer>
    {showModal && <ShareListModal setShowModal={setShowModal} list={listToShare} setListToShare={setListToShare} />}
    </>
  );
};

const Title = styled.h3`
  margin: 0;
  text-align: center;
  `;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  margin-top: 20px;
  justify-items: center;
  `;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  gap: 5px;
`;

const ItemsContainer = styled.div`
  display: grid;
  gap: 5px;
  margin-top: 10px;
  padding-left: 15px;

  p {
    margin: 0;
  }
`;

const Button = styled.button`
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &[type="success"] {
    background-color: #28a745;
  }

  &[type="danger"] {
    background-color: #dc3545;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  
  svg {
    cursor: pointer;
  }
  `;
