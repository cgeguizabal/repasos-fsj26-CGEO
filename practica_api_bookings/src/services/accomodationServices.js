import axios from "axios";

const token = "1057|5MT4keZJocV1i5tJLKkmPW9Z7Q6EWRHkJ2JF2Lxee865a447";

const getAccomodations = async () => {
    try {
        if (!token) {
            throw new Error('No hay token disponible');
        }
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/accomodations`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data; 
    } catch (error) {
        console.error("Error al obtener los datos", error);
        //return null;
    }

    // axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations", {
    //     headers: {Authorization: "Bearer 1060|m8dQRY9fhYcZWh9Tbuw4dJOS7g6qdYnpOizFAApqf7173777"}
    // })
}

export { getAccomodations }


//swr
//fetch() y axios -> es una libreria