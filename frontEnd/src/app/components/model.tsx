// components/Modal.js
import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styleButtonDourado } from './stylesString';
import api from '@/service/api';


type ModalProps = {
  open: boolean;
  handleClose: () => void;
  item: TCategory | null;
  create: boolean
}

const Modal = ({ open, handleClose, item = null }: ModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
 console.log(item)
  console.log(errors);


  async function onSubmit(data: any) {
   if(item === null){
    
    await api.post('/Category', {nome:data.nome})
    console.log(data)
   }else{

    await api.put('/Category', {id:item.id,nome:data.nome})
    console.log(data)
   }
  }
  







  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={""}>Categoria de Cliente</DialogTitle>

      <DialogContent >
        <form className='grid grid-cols-1 gap-6 mt-3' onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="nome"
            className="w-full px-3 py-4 text-sm placeholder-black transition-all duration-150 ease-linear bg-white rounded shadow focus:outline-[#B58710] border-1 text-slate-900 focus:outline-1 "
            {...register("nome", { required: true, maxLength: 80 })} />

          {errors.nome && <span>Este campo é obrigatório</span>}
          <input type="submit" className={styleButtonDourado} value={item === null ? 'Criar' : 'Editar'} />
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