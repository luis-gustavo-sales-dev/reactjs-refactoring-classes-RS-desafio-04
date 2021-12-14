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

    async function testeAddFood() {
        let tempFood = {
            "name": "aaaa",
            "description": "aaaaaaaa",
            "price": "123",
            "image": "hhttp"
        }
        await handleAddFood(tempFood)
    }

    return (<>
        <h1>Dashboard</h1>
        { foods.map( (f) => {
            return <li key={f.id}>{f.name}</li>
        })}
        <button onClick={testeAddFood}>Criar comida</button>
    </>)
}

export default Dashboard;