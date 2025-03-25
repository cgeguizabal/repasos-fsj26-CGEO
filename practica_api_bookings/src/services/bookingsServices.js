import axios from "axios"

const token = "1057|5MT4keZJocV1i5tJLKkmPW9Z7Q6EWRHkJ2JF2Lxee865a447";

const getBookings = async () => {
    try {
        if (!token) {
            throw new Error('No hay token disponible');
        }
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/bookings`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data; 
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return null;
    }
}

const getBookingsByCalendar = async (accomodationid) => {
    try {
        if (!token) {
            throw new Error('No hay token disponible');
        }
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/bookings/calendar/${accomodationid}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data; 
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return null;
    }
}

export {getBookings, getBookingsByCalendar}



// const getBookingsByCalendar = async (accomodationid, startDate = '', endDate = '') => {
//     try {
//         if (!token) {
//             throw new Error('No hay token disponible');
//         }

//         let url = `${import.meta.env.VITE_APP_URL}/bookings/calendar/${accomodationid}`;
//         // Agregar parámetros opcionales si existen
//         const params = new URLSearchParams();
//         if (startDate) params.append('start_date', startDate);
//         if (endDate) params.append('end_date', endDate);

//         if (params.toString()) {
//             url += `?${params.toString()}`;
//         }

//         const response = await axios.get(url, {
//             headers: {Authorization: `Bearer ${token}`}
//         });
//         return response.data; 
//     } catch (error) {
//         console.error("Error al obtener los datos", error);
//         return null;
//     }
// }