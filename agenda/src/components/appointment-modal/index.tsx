'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface AppointmentModalProps {
    serviceId: number
    onClose: () => void
}

export function AppointmentModal({ serviceId, onClose }: AppointmentModalProps) {
    const [fullName, setFullName] = useState('')
    const [cpf, setCpf] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')
    const [availableTimes, setAvailableTimes] = useState<string[]>([])
    const { toast } = useToast()

    const handleDateChange = async (selectedDate: string) => {
        setDate(selectedDate)
        try {
            const response = await axios.get(`/api/appointment/available-times?date=${selectedDate}&serviceId=${serviceId}`)
            setAvailableTimes(response.data)
        } catch (error) {
            console.error('Erro ao buscar horários disponíveis:', error)
            toast({
                title: "Erro",
                description: "Não foi possível carregar os horários disponíveis. Por favor, tente novamente.",
                variant: "destructive",
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post('/api/appointment', {
                serviceId,
                fullName,
                cpf,
                phone,
                email,
                date: new Date(`${date}T${time}`).toISOString(),
                notes
            })
            toast({
                title: "Sucesso",
                description: "Agendamento realizado com sucesso!",
            })
            onClose()
        } catch (error) {
            console.error('Erro ao criar agendamento:', error)
            toast({
                title: "Erro",
                description: "Não foi possível realizar o agendamento. Por favor, tente novamente.",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agendar Serviço</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="date">Data</Label>
                        <Input id="date" type="date" value={date} onChange={(e) => handleDateChange(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="time">Horário</Label>
                        <Select value={time} onValueChange={setTime} required>
                            <SelectTrigger id="time">
                                <SelectValue placeholder="Selecione um horário" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="no-times">Nenhum horário disponível</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="notes">Observações</Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={150}
                        />
                    </div>
                    <Button type="submit">Agendar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

