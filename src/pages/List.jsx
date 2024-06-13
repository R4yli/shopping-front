import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import listService from "../services/listService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ListItems } from "../components/ListItems";
import { ListItemModal } from "../components/ListItemModal";

const LIST_STATUS = {
  PENDING: "Pendiente",
  COMPLETED: "Completada",
};

function List() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(LIST_STATUS.PENDING);
  const [items, setItems] = useState([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);


  const modalRef = useRef();

  useEffect(() => {
    const getList = async () => {
      const list = await listService.findById(id);
      setItems(list.items || []);
      setTitle(list.title);
      setStatus(list.status);
    };
    getList();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, status };
    const response = await listService.update(data, id);

    if (response.status != 200) return;

    toast.info("Tarea actualizada exitosamente");
    navigate("/");
  };
  
  return (
    <>
      <div>
        <FormContainer onSubmit={handleSubmit}>
          <FormHeader>
            <span>Editando lista</span>
          </FormHeader>
          <Input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
           
          <InputGroup>
            <Label>Estado:</Label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              {Object.values(LIST_STATUS).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </InputGroup>
          <ButtonGroup>
            <Button type="danger">Volver</Button>
            <Button type="submit">Guardar</Button>
          </ButtonGroup>
        </FormContainer>
        <>
          <ButtonContainer>
            <Button onClick={() => {
              setShowItemModal(true);
              setItemToEdit(null);
              setStatus(LIST_STATUS.PENDING);
            }} type="button">+</Button>
          </ButtonContainer>
          <ListItems setStatus={setStatus} isModal={false} listId={id} items={items} setItems={setItems} setShowModal={setShowItemModal} setItemToEdit={setItemToEdit} />
        </>
      </div>
      {
        showItemModal && (
          <ListItemModal modalRef={modalRef} item={itemToEdit} listId={id} setItems={setItems} setShowModal={setShowItemModal} />
        )
      }
    </>
  );
}

export default List;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const FormContainer = styled.form`
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 400px;
  margin: auto;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &[type="danger"] {
    background-color: #dc3545;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 20px;
  padding: 0 20px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  display: inline-block;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;