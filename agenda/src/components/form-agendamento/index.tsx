import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";


export interface FormAgendaProps { 
    serviceId: number
}


export function FormAgenda({serviceId}: FormAgendaProps) {
    
    const [service, setService] = useState([]);

    useEffect(() => {
        api.get(`service/${serviceId}`).then((response) => {
            setService(response.data);
        })
    },  []);

    return (
        
        <section>
            <form action="">
                <div>
                    <label htmlFor="fullName">
                        Nome Completo
                    </label>
                    <Input id="fullName" name="fullName" required type="text" maxLength={50} />
                </div>

                <div>
                    <label htmlFor="phone">
                        Telefone
                    </label>
                    <Input id="phone" name="phone" required type="number" maxLength={50} />
                </div>

                <div>
                    <label htmlFor="date">
                        Data
                    </label>
                    <Input id="date" name="date" required type="date" />
                </div>

                <div>
                    <label htmlFor="hour">
                        Horário
                    </label>
                    <Input id="hour" name="hour" required type="time" />
                </div>

                <div>
                    <label htmlFor="service">
                        Serviço
                    </label>
                </div>

                <div>
                    <label htmlFor="description">
                        Observações
                    </label>
                    <Input required type="text" maxLength={150} />
                </div>
            </form>
        </section>

    )
}