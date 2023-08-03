"use client";

import * as React from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
} from "@mui/x-data-grid";
import Modal from "./model";
import api from "@/service/api";
import { useQuery } from "react-query";
import Loading from "./loading";

interface Props {
  dados: TCategory[];
}

export default function Table() {
  const [selectedItem, setSelectedItem] = React.useState<TCategory | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const { data, isLoading } = useQuery<TCategory[]>({
    queryKey: ["Categoryies"],
    queryFn: () => api.get("Category/all").then((res) => res.data),

  })

  if (isLoading || !data) {
    return (<Loading />)
    console.log(data)
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "nome", headerName: "Nome", width: 250 },
    {
      field: "editar",
      headerName: "Editar",
      width: 80,
      renderCell: (params: GridCellParams) => (
        <button onClick={() => handleEdit(params.row)}>Editar</button>
      ),
    },
    {
      field: "excluir",
      headerName: "Excluir",
      width: 80,
      renderCell: (params: GridCellParams) => (
        <button onClick={() => handleDelete(params.row.id)}>Excluir</button>
      ),
    },
  ];

  const handleCloseModal = () => {
    setSelectedItem(null);
    setOpenModal(false);
  };

  const handleEdit = (item: TCategory) => {
    setSelectedItem(item);

    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete("Category/", { params: { id } });
      alert("Categoria deletada com sucesso");
    } catch (e) {
      console.log(e);
      alert("Erro ao deletar categoria");
    }
  };

  const handleRowClick = (params: GridCellParams) => {
    setSelectedItem(params.row);
    setOpenModal(true);
  };

  return (
    <div className="  flex flex-col bg-[#ffffff] border-8 border-[#ffffff]  rounded-lg">
      <div className="grid grid-cols-3 gap-2 my-4 grip-rows-3">
        <button
          className={" px-4 py-2 font-semibold  rounded-full " + "bg-[#B58710] text-white"}
          onClick={() => setOpenModal(true)}
        >
          Registro
        </button>
      </div>
      <div className={"h-300 w-full bg-white rounded-2px min-w-[32rem]"}>
        <DataGrid
          rows={data}
          columns={columns}
          onRowClick={() => handleRowClick}
        />
      </div>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleCloseModal}
          item={selectedItem}
          create={false}
        />
      )}
    </div>
  );
}
