import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign } from 'lucide-react'

interface ServiceCardProps {
    service: {
        id: number
        name: string
        description?: string
        price: number
        min_duration: number
    }
    onSelect: () => void
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center mb-2">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>R$ {service.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{service.min_duration} minutos</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={onSelect} className="w-full">Agendar</Button>
            </CardFooter>
        </Card>
    )
}
