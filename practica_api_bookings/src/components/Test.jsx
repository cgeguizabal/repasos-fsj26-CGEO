import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, { useEffect, useState } from 'react'
import { getBookingsByCalendar } from '../services/bookingsServices';
//desestructuracion
import { getAccomodations } from '../services/accomodationServices';

let animal = {
    nombre: "pancho",
    edad: 12,
    hobbies: []
}

animal.nombre; //pancho
const { nombre: name, edad } = animal;
name; //pancho


export default function Calendar() {
    const [data, setData] = useState([]); //reservaciones
    const [accomodations, setAccomodations] = useState([]);
    //seleccionamos a un alojamiento en especifico
    const [selectedAccomodation, setSelectedAccomodation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    //obtener el id del alojamiento
    // const getIdAccomodation = (e) => {
    //     const id_accomodation = e.target.value;
    //     console.log(e.target.value); //id del alojamiento
    //     bookingsByAccomodation(id_accomodation, startDate, endDate);
    // }

    //obtener todos los alojamientos
    const allAccomodations = async () => {
        const response = await getAccomodations();
        setAccomodations(response);
    }

    //obtener reservaciones por alojamiento
    const bookingsByAccomodation = async () => {
        console.log('Id del alojamiento de reservaciones:', selectedAccomodation, startDate, endDate);
        
        const response = await getBookingsByCalendar(selectedAccomodation, startDate, endDate);
        //400 =>usuario
        if(Array.isArray(response)){
            //desestructuracion de datos
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
            <label>Seleccionar un Alojamiento:</label>
            <select
                value={selectedAccomodation}
                onChange={(e) => setSelectedAccomodation(e.target.value)}
                style={{ marginBottom: '1rem' }}
            >
                <option value="">Seleccione un alojamiento</option>
                {accomodations.map((item) => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            <div>
                <label>Fecha de Entrada:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                <label>Fecha de Salida:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                <button onClick={bookingsByAccomodation} disabled={!selectedAccomodation}>
                    Filtrar
                </button>
            </div>

            <FullCalendar 
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                // weekends={false}
                events={data}
            />
        </div>
    )
}

