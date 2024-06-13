import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { toast } from "react-toastify";
import listService from "../services/listService";
import { ListItemModal } from "./ListItemModal";
import { ListItems } from "./ListItems";


// eslint-disable-next-line react/prop-types
export const ListModal = ({ setShowModal, setLists, lists }) => {

  const [listId, setListId] = useState(0); // [ {row: id: title:}
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);

  const [showAddButton, setShowAddButton] = useState(false);
  
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);


  const modalRef = useRef();
  const itemModalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(
        (modalRef.current && !modalRef.current.contains(e.target)) ||
        (itemModalRef.current && !itemModalRef.current.contains(e.target)) 
      ) {
        if (showItemModal) {

          (itemModalRef.current && !itemModalRef.current.contains(e.target)) && setShowItemModal(false);
          return;
        }

        setShowModal(false);
        document.body.style.overflowY = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal, showItemModal]);

  function handleShowModal() {
    setShowModal(false);
    setTitle("");
    document.body.style.overflowY = "auto";
  }

  const handleListSubmit = async (e) => {
    e.preventDefault();
    const data = { title };
    try {
      const response = await listService.create(data);
      setListId(response.id);
      setLists([...lists, response]);
      toast.info("Tarea creada exitosamente");
      setShowAddButton(true);

      document.getElementById("buttonsList").hidden = true;
      document.getElementById("title").disabled = true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalOverlay>
        <ModalContainer ref={modalRef}>
          <Form onSubmit={handleListSubmit}>
            <FormHeader>
              <span>Agregando lista</span>
              <FaTimes size={24} onClick={handleShowModal} />
            </FormHeader>
            <Input
              type="text"
              placeholder="Título"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <ButtonContainer id="buttonsList">
              <Button type="v" onClick={handleShowModal}>
                Volver
              </Button>
              <Button type="submit">Crear Lista</Button>
            </ButtonContainer>
          </Form>
          <hr />
          {showAddButton && (
            <>
              <ButtonContainer>
                <Button onClick={() => {
                  setShowItemModal(true);
                  setItemToEdit(null);
                }} type="button">+</Button>
              </ButtonContainer>
              <ListItems listId={listId} items={items} setItems={setItems} setShowModal={setShowItemModal} setItemToEdit={setItemToEdit} />
            </>
          )}
        </ModalContainer>
      </ModalOverlay>
      {
        showItemModal && (
          <ListItemModal modalRef={itemModalRef} item={itemToEdit} listId={listId} setItems={setItems} setShowModal={setShowItemModal} />
        )
      }
    </>
  );
};

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
  z-index: 100;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: #fff;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 600px;
  max-height: 600px;
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

const ButtonContainer = styled.div`
  button:first-child {
    background-color: rgba(128, 128, 128, 0.5);
    color: #555;

    &:hover {
      background-color: rgba(128, 128, 128, 0.4);
      color: #666;
    }
  }

  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 20px;
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

  &[type="button"] {
    background-color: #007bff !important;
    padding: 10px 20px !important;
    background-color: #007bff !important;
    color: #fff !important;
    border: none !important;
    border-radius: 10px !important;
    font-size: 16px !important;
    cursor: pointer !important;
  }
`;
