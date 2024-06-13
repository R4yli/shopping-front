import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import listService from "../services/listService";

export const ListTable = ({ pending, lists = [], setLists }) => {
  const navigate = useNavigate();

  const columns = [
    {
      name: "#",
      selector: ({ row }) => row,
      sortable: true,
      width: "100px",
    },
    {
      name: "Titulo",
      selector: (row) => row.title,
      sortable: true,
      width: "400px",
    },
    {
      name: "",
      width: "300px",
      cell: (row) => (
        <div className="d-flex flex-row column-gap-2">
          <Button variant="success" onClick={() => handleEdit(row)}>
            Ver
          </Button>
          <Button variant="primary" onClick={() => handleComplete(row)}>
            Completar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    navigate(`/list/${row.id}`);
  };

  const handleComplete = async (row) => {
    const response = await listService.update({ status: "Completada" }, row.id);

    if (response.status != 200) return;

    toast.info("Lista completada exitosamente");
    const lists = await listService.getMany();
    setLists(lists);
  };

  const handleDelete = async (row) => {
    const filteredLists = lists.filter((list) => list.id !== row.id);
    const response = await listService.delete(row.id);

    if (response.status != 200) return;

    toast.error(response.data.message);
    setLists(filteredLists);
  };

  return (
    <>
      <DataTable
        title="Listas"
        columns={columns}
        data={lists}
        progressPending={pending}
        progressComponent={<Spinner animation="grow" variant="primary" />}
        pagination
      />
    </>
  );
};
