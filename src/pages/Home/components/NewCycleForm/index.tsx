import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { register } = useFormContext()
  const { activeCycle } = useContext(CyclesContext)

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
