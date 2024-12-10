'use client'

import { useState } from 'react'
import { AppointmentModal } from '@/components/appointment-modal'
import { useToast } from "@/hooks/use-toast"
import { ServiceCard } from '@/components/appointment-card'

interface Service {
    id: number
    name: string
    description?: string
    price: number
    min_duration: number
}

// Dados mockados dos serviços
const mockServices: Service[] = [
    {
        id: 1,
        name: "Corte de Cabelo",
        description: "Corte profissional para todos os tipos de cabelo",
        price: 50.00,
        min_duration: 30
    },
    {
        id: 2,
        name: "Coloração",
        description: "Coloração completa com produtos de alta qualidade",
        price: 120.00,
        min_duration: 90
    },
    {
        id: 3,
        name: "Manicure",
        description: "Cuidados completos para suas unhas",
        price: 35.00,
        min_duration: 45
    },
    {
        id: 4,
        name: "Pedicure",
        description: "Tratamento relaxante para seus pés",
        price: 40.00,
        min_duration: 60
    },
    {
        id: 5,
        name: "Massagem Relaxante",
        description: "Massagem corporal para aliviar o estresse",
        price: 80.00,
        min_duration: 60
    }
]

export function AppointmentForm() {
    const [selectedService, setSelectedService] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { toast } = useToast()

    const handleServiceSelect = (serviceId: number) => {
        setSelectedService(serviceId)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedService(null)
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Agendar Serviço</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockServices.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onSelect={() => handleServiceSelect(service.id)}
                    />
                ))}
            </div>
            {mockServices.length === 0 && (
                <p className="text-center text-gray-500">Nenhum serviço disponível no momento.</p>
            )}
            {isModalOpen && selectedService !== null && (
                <AppointmentModal
                    serviceId={selectedService}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}

