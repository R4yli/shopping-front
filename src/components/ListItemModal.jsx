import { useEffect, useState } from "react";
import styled from "styled-components";
import listItemsService from "../services/listItems.service";
import { FaTimes } from "react-icons/fa";

const LIST_ITEM_STATUS = {
  PENDING: "Pendiente",
  BOUGHT: "Comprado",
};


export const ListItemModal = ({ modalRef, item, listId, setItems, setShowModal }) => {
  const [name, setName] = useState(item?.name || "");
  const [quantity, setQuantity] = useState(item?.quantity || 0);
  const [status, setStatus] = useState(item?.status || LIST_ITEM_STATUS.PENDING);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
        document.body.style.overflowY = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal, modalRef]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = item?.id || 0;

    id === 0 ? await listItemsService.create({ name, quantity, status }, listId) : await listItemsService.update({ name, quantity, status }, listId, item.id);

    const items = await listItemsService.getMany(listId);

    setItems(items);
    setShowModal(false);
  }

  return (
    <ModalOverlay>
      <ModalContainer ref={modalRef}>
        <FormHeader>
          <span>Guardando Item</span>
          <FaTimes size={24} onClick={() => setShowModal(false)} />
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Nombre:</Label>
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </InputGroup>
          <InputGroup>
          <Label>Cantidad:</Label>
          <Input
            type="number"
            placeholder="Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          </InputGroup>
          <InputGroup>
          <Label>Estado:</Label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            {Object.values(LIST_ITEM_STATUS).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          </InputGroup>
          <Button type="submit">Guardar item</Button>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  )
}

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  span {
    font-weight: bold;
    font-size: 18px;
  }

  svg {
    cursor: pointer;
    color: gray;
  }
`;

const ModalOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  z-index: 1000;
  top: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: #fff;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 400px;
  max-height: 500px;
  height: 100%;
  left: 50%;
  top: 35%;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px 0.2px gray;
  animation-name: animatetop;
  animation-duration: 0.4s;
  overflow-y: auto;

  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 30%;
      opacity: 1;
    }
  }
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 30%;
      opacity: 1;
    }
  }

  hr {
    height: 2px;
    margin: 0;
    padding: 0;
    background-color: gray;
  }
`;


const Form = styled.form`
background-color: #fff;
display: flex;
flex-direction: column;
row-gap: 20px;`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
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