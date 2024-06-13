import { useEffect, useRef, useState } from "react";
import { FaShare, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { toast } from "react-toastify";
import userService from "../services/user.service";

export const ShareListModal = ({ list, setShowModal, setListToShare }) => {
  const [email, setEmail] = useState("");

  const modalRef = useRef();

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

  function handleShowModal() {
    setShowModal(false);
    setEmail("");
    setListToShare(null);
    
    document.body.style.overflowY = "auto";
  }

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    const data = { email, listId: list.id };
    try {
      await userService.shareList(data);
      toast.info("Lista compartida exitosamente");
    } catch (error) {
      console.log(error);
      toast.error('Error al compartir: ' + error.message || 'Error desconocido.');
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer ref={modalRef}>
        <Form onSubmit={handleShareSubmit}>
          <FormHeader>
            <span>Compartir Lista {list.title}</span>
            <FaTimes size={24} onClick={handleShowModal} />
          </FormHeader>
          <Input
            type="email"
            placeholder="Correo"
            id="title"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ButtonContainer id="buttonsList">
            <Button type="v" onClick={handleShowModal}>
              Volver
            </Button>
            <Button type="submit">Compartir <FaShare size={15}/></Button>
          </ButtonContainer>
        </Form>
      </ModalContainer>
    </ModalOverlay>
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
  position: fixed;
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
  max-width: 600px;
  max-height: 600px;
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
  justify-content: center;
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
