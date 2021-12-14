import { useEffect, useState } from "react";
import api from "../services/api";

interface Food {
    id?: number,
    name: string,
    description: string,
    price: string,
    available?: boolean,
    image: string
}
const Dashboard = (): JSX.Element => {
    const [foods, setFoods] = useState<Food[]>([])
    const [editingFood, setEditingFood] = useState<Food>()

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

    async function handleAddFood(food: Food) {
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

    async function handleUpdateFood(food: Food) {
        try {
            const foodUpdated: Food = await api.put(`/foods/${5}`, {
                "name": "bbbbbb",
                "description": "bbbbbbb",
                "price": "123",
                "image": "hhttp"
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

    async function testeAddFood() {
        let tempFood = {
            "name": "aaaa",
            "description": "aaaaaaaa",
            "price": "123",
            "image": "hhttp"
        }
        await handleUpdateFood(tempFood)
    }

    return (<>
        <h1>Dashboard</h1>
        { foods.map( (f) => {
            return <li key={f.id}>{f.id + " " +f.name}</li>
        })}
        <button onClick={testeAddFood}>Criar comida</button>
    </>)
}

export default Dashboard;