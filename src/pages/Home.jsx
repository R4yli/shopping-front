import { FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";
import { ListModal } from "../components/ListModal";
import { useEffect, useState } from "react";
// import { ListTable } from "../components/ListTable";
import listService from "../services/listService";
import { ListsList } from "../components/ListsList";

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const [pending, setPending] = useState(true);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      const paginated = await listService.getPaginated(1, 5);
      
      setLists(paginated.data); // [ {row: id: title:}]
      setPending(false);
    };
    getLists();
  }, [showModal]);

  const handleAddList = () => {
    setShowModal(true);
    document.body.style.overflowY = "hidden";
  };

  return (
    <HomeContainer>
      {showModal && (
        <ListModal
          setLists={setLists}
          lists={lists}
          setShowModal={setShowModal}
        />
      )}
      <Container>
        <AddListGroup>
          <button type="button" onClick={handleAddList} disabled={pending}>
            Agregar <FaPlusCircle style={{ marginLeft: "5px" }} />
          </button>
        </AddListGroup>
        <hr />
        {/* <ListTable pending={pending} setLists={setLists} lists={lists} /> */}
        <ListsList pending={pending} setLists={setLists} lists={lists} />
      </Container>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  margin: 0;
  padding: 20px;

  hr {
    border: 2px solid lightgray;
  }
`;

const AddListGroup = styled.div`
  label {
    display: block;
    font-size: 36px;
    font-weight: 500;
  }

  button {
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #0c95f0;
    color: #fff;
    font-weight: 500;
    border: none;
    box-shadow: 0 1px 3px 0.1px rgba(0, 0, 0, 0.5);
    transition: all 0.2s;
  }

  button:hover {
    transform: translateY(1px);
  }
`;
