'use client'


import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from "@mui/x-data-grid";
import Modal from "./model";
import { styleButtonDourado } from "./stylesString";


const rows: GridRowsProp = [
    { id: 1, nome: "Hello", },
    { id: 2, nome: "World", },
    { id: 3, nome: "!", },

];





export type TTableData = {
    id: string;
    nome: string;
};

interface Props {
    dados: TTableData[];
}

export default function Table() {
    const [selectedItem, setSelectedItem] = React.useState<TTableData| null>(null) ;
    const [create, setCreate] = React.useState(null)
    const [openModal, setOpenModal] = React.useState(false);
    const [rowSelectedData, setRowSelectedData] = React.useState(null)

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'nome', headerName: 'Nome', width: 200 },
       
    ];



    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleEdit = (id: string) => {
        setOpenModal(true);
        
    };



    const handleDelete = (id: string) => {
        console.log(`Excluir item com ID ${id}`);
        
    };

    const handleRowClick = (params: GridCellParams) => {
        setSelectedItem(params.row);
        setOpenModal(true);
    };


    return (
        <div className="flex flex-col bg-[#ffffff] border-8 border-[#ffffff]  rounded-lg">
            <div className="grid grid-cols-3 gap-2 my-4 grip-rows-3">
                <button className={styleButtonDourado} onClick={() =>   setOpenModal(true)}>
                    Registro
                </button>

                <button className={styleButtonDourado} onClick={() =>  handleDelete(selectedItem?.id as string)}>
                    Delete
                </button>

                <button className={styleButtonDourado} onClick={() =>  handleEdit (selectedItem?.id as string)}>
                    Editar
                </button>
            </div>
            <div style={{ height: 300, width: "100%", backgroundColor: "#ffffff", borderRadius: "10px", minWidth: "32rem " }}>
                <DataGrid rows={rows} columns={columns} 
                    onRowClick={() => handleRowClick} />
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
