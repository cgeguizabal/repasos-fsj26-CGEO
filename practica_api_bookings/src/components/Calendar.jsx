import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, { useEffect, useState } from 'react'
import { getBookingsByCalendar } from '../services/bookingsServices';
import { getAccomodations } from '../services/accomodationServices';

export default function Calendar() {
    const [data, setData] = useState([]);
    const [accomodations, setAccomodations] = useState([]);

    //obtener el id del alojamiento
    const getIdAccomodation = (e) => {
        console.log(e.target.value);
        bookingsByAccomodation(e.target.value);
    }

    //obtener todos los alojamientos
    const allAccomodations = async () => {
        const response = await getAccomodations();
        setAccomodations(response);
    }

    //obtener reservaciones por alojamiento
    const bookingsByAccomodation = async (idAccomodation) => {
        console.log("Id del alojamiento de reservaciones" + idAccomodation);
        
        const response = await getBookingsByCalendar(idAccomodation);
        //400 =>usuario
        if(Array.isArray(response)){
            setData(response.map(({booking, check_in_date, check_out_date, status}) => ({
                title: `${booking} (${status})`,
                start: check_in_date,
                end: check_out_date,
                color: status === "CONFIRMED" ? "#0b6a0a" : "#ff5757"
            })));
        }else{
            alert("No hay reservaciones");
            setData([]);
        }
        
    }

    useEffect(() => {
        allAccomodations();
    }, [])

    console.log(data);
    console.log(accomodations);

    return (
        <div>
            <h1>Lista de Reservaciones</h1>
            <label htmlFor="">Seleccionar un Alojamiento</label>
            <select name="" id="" style={{marginBottom: "1rem"}} onChange={(e) => getIdAccomodation(e)}>
                {
                    accomodations.map(item => {
                        return (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        )
                    })
                }
            </select>

            <FullCalendar 
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                // weekends={false}
                events={data}
            />
        </div>
    )
}
