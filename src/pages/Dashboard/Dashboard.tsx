import { useEffect, useState } from "react";
import Food from "../../components/Food";
import Header from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import api from "../../services/api";
import IFood from "../../utils/types/food";
import { FoodsContainer } from "./styles";


const Dashboard = (): JSX.Element => {
    const [foods, setFoods] = useState<IFood[]>([])
    const [editingFood, setEditingFood] = useState<IFood>()
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)

    useEffect( () => {
        async function loadFoods () {
            console.log("loadFoods")
            let f = await api.get(`/foods`)
                        .then( (response) => response.data)
            //console.log(f)
            setFoods([...f])
            //console.log(foods)
        }
        loadFoods()
    }, [])

    async function handleAddFood(food: IFood) {
        try {
            const response = await api.post(`/foods`, {
                ...food,
                available: true
            })
            // console.log(response.data)
            setFoods([response.data, ...foods])
        } catch {
            // Use o toast aqui para ficar legal
        }
    }

    async function handleUpdateFood(food: IFood) {
        try {
            const foodUpdated: IFood = await api.put(`/foods/${editingFood?.id}`, {
                ...food
            }).then( response => response.data)

            const foodsUpdated = foods.map( f => 
                f.id === foodUpdated.id ? foodUpdated : f
            )

            setFoods([...foodsUpdated])

            /*
            let f = await api.get(`/foods`)
                        .then( (response) => response.data)
            setFoods([...f])
            */
            
        } catch {
            // Use o toast aqui para ficar legal
        }
    }

    async function handleDeleteFood (id: number) {

        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter(food => food.id !== id);

        setFoods(foodsFiltered)
    }

    function toggleModal () {
        setModalOpen(!modalOpen)
    }

    function toggleEditModal () {
      setEditModalOpen(!editModalOpen)
    }

    function handleEditFood (food: IFood) {
        setEditingFood(food)
        setEditModalOpen(true)
    }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
    
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
}

export default Dashboard;