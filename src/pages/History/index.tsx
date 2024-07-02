import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './style'
import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1> Histórico </h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th> Tarefa </th>
              <th> Duração </th>
              <th> Início </th>
              <th> Status </th>
            </tr>
          </thead>
          <tbody>
            {!!cycles.length &&
              cycles.map((cycle) => (
                <tr key={cycle.id}>
                  <td> {cycle.task} </td>
                  <td> {cycle.minutes} minutos </td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status color="primary"> Concluído </Status>
                    )}

                    {cycle.interruptedDate && (
                      <Status color="danger"> Interrompido </Status>
                    )}

                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status color="warning"> Em Andamento </Status>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
