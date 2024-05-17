import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Preencha corretamente a task'),
  minutes: zod
    .number({
      message: 'Informe um número correto',
    })
    .min(1, 'Numero minimo igual a 5')
    .max(60, 'Número máximo igual a 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task"> Vou trabalhar em </label>
      <TaskInput
        id="task"
        list="teste"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
      />

      <label htmlFor="minutesAmount"> Durante </label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        max={60}
        min={1}
        disabled={!!activeCycle}
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
  )
}
