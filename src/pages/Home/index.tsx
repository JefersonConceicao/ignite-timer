import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './style'
import { useState } from 'react'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Preencha corretamente a task'),
  minutes: zod
    .number({
      message: 'Informe um número correto',
    })
    .min(5, 'Numero minimo igual a 5')
    .max(60, 'Número máximo igual a 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

interface Cycle {
  id: string
  task: string
  minutes: number
}

export function Home() {
  const [cycles, setCycle] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutes: data.minutes,
    }

    setCycle((prevState) => [...prevState, newCycle])
    setActiveCycleId(id)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task: string = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task"> Vou trabalhar em </label>
          <TaskInput
            id="task"
            list="teste"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <label htmlFor="minutesAmount"> Durante </label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            max={60}
            {...register('minutes', { valueAsNumber: true })}
          />

          <datalist id="teste">
            <option value="Maçã" />
            <option value="Banana" />
            <option value="Teste" />
            <option value="Fe" />
          </datalist>

          <span> minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span> {minutes[0]} </span>
          <span> {minutes[1]} </span>
          <Separator> : </Separator>
          <span> {seconds[0]} </span>
          <span> {seconds[1]} </span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
