// components/Modal.js
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";

import api from "@/service/api";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  item: TCategory | null;
  create: boolean;
};

type THandlerData = {
  id: string;
  nome: string;
};

const Modal = ({ open, handleClose, item = null }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (item) {
      setValue("nome", item.nome);
    }
  }, [item, setValue]);

  function onSubmit(e: any) {
    const data: THandlerData = e as THandlerData;
    if (item === null) {
      handleCreate(data);
    } else {
      handleEdit(data);
    }
  }

  async function handleCreate(data: THandlerData) {
    try {
      await api.post("/Category", { nome: data.nome });
      handleClose();
    } catch (e) {
      console.log(e);
      alert("erro");
    }
  }

  async function handleEdit(data: THandlerData) {
    try {
      await api.put("/Category", { id: data.id, nome: data.nome });

      handleClose();
    } catch (e) {
      console.log(e);
      alert("erro");
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={""}>Categoria de Cliente</DialogTitle>

      <DialogContent>
        <form
          className="grid grid-cols-1 gap-6 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="nome"
            className="w-full px-3 py-4 text-sm placeholder-black transition-all duration-150 ease-linear bg-white rounded shadow focus:outline-[#B58710] border-1 text-slate-900 focus:outline-1 "
            {...register("nome", { required: true, maxLength: 80 })}
          />

          {errors.nome && <span>Este campo é obrigatório</span>}
          <input
            type="submit"
            className={
              " px-4 py-2 font-semibold  rounded-full" +
              "bg-[#B58710] text-white"
            }
            value={item === null ? "Criar" : "Editar"}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
