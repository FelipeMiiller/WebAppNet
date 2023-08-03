"use client";

import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";
import Modal from "./model";
import { styleButtonDourado } from "./stylesString";
import api from "@/service/api";

interface Props {
  dados: TCategory[];
}

export default function Table() {
  const [selectedItem, setSelectedItem] = React.useState<TCategory | null>(
    null
  );

  const [openModal, setOpenModal] = React.useState(false);
  const [rows, setRows] = React.useState<GridColDef[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const list = await api.get("/Category/all");

      console.log(list.data);
      setRows(list.data);
    }
    fetchData();
  }, [openModal]);

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
        <button onClick={() => handleDelete(params.row)}>Excluir</button>
      ),
    },
  ];

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = (item: TCategory) => {
    setSelectedItem(item);

    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    console.log(`Excluir item com ID ${id}`);
    const data = { id };
    await api.delete("/api/Category", { data });
  };

  const handleRowClick = (params: GridCellParams) => {
    setSelectedItem(params.row);
    setOpenModal(true);
  };

  return (
    <div className="flex flex-col bg-[#ffffff] border-8 border-[#ffffff]  rounded-lg">
      <div className="grid grid-cols-3 gap-2 my-4 grip-rows-3">
        <button
          className={styleButtonDourado}
          onClick={() => setOpenModal(true)}
        >
          Registro
        </button>
      </div>
      <div
        style={{
          height: 300,
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "2px",
          minWidth: "32rem ",
        }}
      >
        <DataGrid
          rows={rows}
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
