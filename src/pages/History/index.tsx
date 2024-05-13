import { HistoryContainer, HistoryList, Status } from './style'

export function History() {
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
            <tr>
              <td> Tarefa </td>
              <td> 20 Minutos </td>
              <td> Há 2 Meses </td>
              <td>
                <Status color="warning"> Em Andamento </Status>
              </td>
            </tr>
            <tr>
              <td> Tarefa </td>
              <td> 20 Minutos </td>
              <td> Há 2 Meses </td>
              <td>
                <Status color="primary"> Concluído </Status>
              </td>
            </tr>
            <tr>
              <td> Tarefa </td>
              <td> 20 Minutos </td>
              <td> Há 2 Meses </td>
              <td>
                <Status color="primary"> Concluído </Status>
              </td>
            </tr>
            <tr>
              <td> Tarefa </td>
              <td> 20 Minutos </td>
              <td> Há 2 Meses </td>
              <td>
                <Status color="warning"> Em Andamento </Status>
              </td>
            </tr>
            <tr>
              <td> Tarefa </td>
              <td> 20 Minutos </td>
              <td> Há 2 Meses </td>
              <td>
                <Status color="danger"> Interrompido </Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
