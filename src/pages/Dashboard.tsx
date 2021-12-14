import { useEffect, useState } from "react";
import api from "../services/api";

interface Food {
    id: number,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
}
const Dashboard = (): JSX.Element => {
    const [foods, setFoods] = useState<Food[]>([])

    useEffect( () => {
        async function loadFoods () {
            console.log("loadFoods")
            let f = await api.get(`/foods`)
                        .then( (response) => response.data)
            console.log(f)
            setFoods([...f])
            console.log(foods)
        }
        loadFoods()
    }, [])

    return (<>
        <h1>Dashboard</h1>
        { foods.map( (f) => {
            return <li>{f.name}</li>
        })}
    </>)
}

export default Dashboard;