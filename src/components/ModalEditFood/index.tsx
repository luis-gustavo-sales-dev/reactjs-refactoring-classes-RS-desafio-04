import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';
import IFood from '../../utils/types/food';

interface ModalEditFoodProps {
    handleUpdateFood: (food: IFood) => void;
    setIsOpen: () => void;
    isOpen: boolean;
    editingFood: any
}

export function ModalEditFood ({ handleUpdateFood, setIsOpen, isOpen, editingFood }:ModalEditFoodProps) {

  let formRef = createRef<FormHandles>()

  async function handleSubmit (data: any){
    data.available = true
    handleUpdateFood(data as IFood);
    setIsOpen();
  };


  return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
            <h1>Editar Prato</h1>
            <Input name="image" icon={null} placeholder="Cole o link aqui" />

            <Input name="name" icon={null} placeholder="Ex: Moda Italiana" />
            <Input name="price" icon={null} placeholder="Ex: 19.90" />

            <Input name="description" icon={null} placeholder="Descrição" />

            <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
                <FiCheckSquare size={24} />
            </div>
            </button>
        </Form>
      </Modal>
  );

};
