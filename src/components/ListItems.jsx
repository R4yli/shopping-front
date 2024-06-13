import styled from "styled-components";
import listItemsService from "../services/listItems.service";
import { FaTimes } from "react-icons/fa";

export const ListItems = ({items, setShowModal, setItemToEdit, setItems, listId, isModal=true, setStatus=null}) => { 

  if (!items || items.length === 0) {
    return null;
  }

  const handleCheckboxChange = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const item = await listItemsService.update({ status: e.target.checked ? "Comprado" : "Pendiente" }, listId, id);
    const items = await listItemsService.getMany(listId);
    setItems(items);

    if (setStatus) {
      console.log({item});
      item.status === 'Pendiente' && setStatus('Pendiente');
    }
  };

  const handleDeleteItem = async (id) => {
    await listItemsService.delete(listId, id);
    const items = await listItemsService.getMany(listId);
    setItems(items);
  }

  const itemList = items.map((item) => {
    return (
      <Card key={`item_${item.id}`}>
        <CardHeader>
          <span>{item.name}</span>
          <FaTimes size={24} onClick={() => handleDeleteItem(item.id)} />
        </CardHeader>
        <Content>
          <span>Cantidad: {item.quantity}</span>
          <span>
            Comprado: <input type="checkbox" onClick={ (e) => handleCheckboxChange(e, item.id) } checked={item.status === "Comprado"} readOnly />
          </span>
        </Content>
        <Button type="button" onClick={() => {
          setItemToEdit(item);
          setShowModal(true);
        }}>Editar</Button>
      </Card>
    );
  });

  if (isModal) return (
    <ItemsContainerInModal>
      {itemList}
    </ItemsContainerInModal>
  );

  return (
    <ItemsContainer>
      {itemList}
    </ItemsContainer>
  );
}

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: center;
  justify-items: center;
  align-items: start;
  margin: 0 auto;
  width: 100%;
  height: 100%;

`;

const ItemsContainerInModal = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  justify-items: center;
  align-items: start;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px; /* Bordes redondeados */
  padding: 10px;
  margin: 5px 0;
  width: 200px; /* Ajusta el ancho según sea necesario */
  max-height: 200px; /* Ajusta la altura para que sea cuadrada */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    margin-top: auto; /* Mueve el botón al fondo de la tarjeta */
  }
`;

const CardHeader = styled.span`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  span {
    font-weight: bold;
    font-size: 18px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;