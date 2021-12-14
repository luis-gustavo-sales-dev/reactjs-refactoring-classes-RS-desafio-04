import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { createRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import Input from "../Input";
import Modal from "../Modal";

interface ModalAddFoodProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleAddFood: (food: Food) => Promise<void>;
}

interface Food {
    id?: number,
    name: string,
    description: string,
    price: string,
    available?: boolean,
    image: string
}
export function ModalAddFood ({ isOpen, setIsOpen, handleAddFood}: ModalAddFoodProps) {
    let formRef = createRef<FormHandles>();

    async function handleSubmit (data: any) {
        handleAddFood(data);
        setIsOpen();
    };
    
    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" icon={null} placeholder="Cole o link aqui" />

          <Input name="name" icon={null} placeholder="Ex: Moda Italiana" />
          <Input name="price" icon={null} placeholder="Ex: 19.90" />

          <Input name="description" icon={null} placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    ); 
}