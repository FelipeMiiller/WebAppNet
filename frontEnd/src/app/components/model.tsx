// components/Modal.js
import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styleButtonDourado } from './stylesString';


type ModalProps = {
  open: boolean;
  handleClose: () => void;
  item: any;
  create: boolean
}

const Modal = ({ open, handleClose, item = null, }: ModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  useEffect(() => {
    if (item) {
      handleCreate()
    } else {
      handleUpdate()
    }
  });


  async function handleCreate() {

    await fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image
      })
    })

  }


  async function handleUpdate() {

    await fetch(`http://localhost:3000/api/items/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image
      })
    })

  }






  return (
    <Dialog  open={open} onClose={handleClose}>
      <DialogTitle className={""}>Categoria de Cliente</DialogTitle>
      
        <DialogContent >
        <form className='grid grid-cols-1 gap-6 mt-3' onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="nome" 
          className="w-full px-3 py-4 text-sm placeholder-black transition-all duration-150 ease-linear bg-white rounded shadow focus:outline-[#B58710] border-1 text-slate-900 focus:outline-1 "
          {...register("nome", { required: true, maxLength: 80 })} />

          {errors.nome && <span>Este campo é obrigatório</span>}
          <input type="submit" className={styleButtonDourado} value={item ? 'Criar' : 'Editar'} />
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