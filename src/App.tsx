import { useState, useEffect, ChangeEvent } from 'react'
import './App.css'
import { Contractor, Kudo, MessageWithPayload, MessageWithoutPayload, FETCH_CONTRACTORS, SEND_KUDOS } from './types'
import { Button, CircularProgress, Container, Grid } from '@material-ui/core'
import KudoList from './components/KudoList'
import AddKudoForm from './components/AddKudoForm'
import { sendMessage } from './services/messageService'

const App = (): JSX.Element => {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [selectedContractor, setSelectedContractor] = useState<Contractor | undefined>({} as Contractor)
  const [kudos, setKudos] = useState<Kudo[]>([])
  const [amount, setAmount] = useState<number>(1)
  const [message, setMessage] = useState<string>('.')
  const [type, setType] = useState<string>('Customer Satisfaction')
  const [isSending, setIsSending] = useState<boolean>(false)

  useEffect(() => {
    loadContractors()
    loadKudos()
  }, [])

  useEffect(() => {
    localStorage.setItem('kudos', JSON.stringify(kudos))
  }, [kudos])

  const loadContractors = (): void => {
    sendMessage<MessageWithoutPayload, Contractor[]>(
      { type: FETCH_CONTRACTORS },
      (response: Contractor[]) => {
        setContractors(response)
      })
  }

  const loadKudos = (): void => {
    const localStorageKudos = localStorage.getItem('kudos')
    if (localStorageKudos) {
      setKudos(JSON.parse(localStorageKudos))
    }
  }

  const changeSelectedContractor = (event: ChangeEvent<{} | HTMLInputElement>, value: Contractor | null): void => {
    if (value === null) {
      setSelectedContractor({} as Contractor)
    } else {
      setSelectedContractor(contractors.find(contractor => contractor.id === value!.id))
    }
  }

  const addKudo = (): void => {
    const newKudoToSent = {
      id: Date.now(),
      contractor: selectedContractor,
      amount: amount,
      message: message,
      type: type
    } as Kudo
    setKudos([...kudos, newKudoToSent].sort((a, b) => a.contractor.id - b.contractor.id))
  }

  const removeKudoListItem = (kudosToRemove: Kudo): void => {
    setKudos(
      kudos.filter(kudos => kudos.id !== kudosToRemove.id)
    )
  }

  const changeAmount = (event: ChangeEvent<HTMLInputElement>): void => {
    setAmount(parseInt(event.target.value))
  }

  const changeMessage = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value)
  }

  const changeType = (event: ChangeEvent<HTMLInputElement>): void => {
    setType(event.target.value)
  }

  const distributeKudos = (): void => {
    setIsSending(true)
    sendMessage<MessageWithPayload, void>({ type: SEND_KUDOS, payload: kudos }, (): void => { window.close() })
  }

  const kudosAmountToDistribute = (): number => (
    kudos.reduce((sum: number, kudos: Kudo): number => (sum + kudos.amount), 0)
  )

  return (
    isSending ? (
      <Container>
        <Grid container direction="column" justifyContent="center" alignItems="center" >
          <Grid item>
            <CircularProgress />
          </Grid>
          <Grid item>
            Sending kudos...
          </Grid>
        </Grid>
      </Container>
    ) :
      (
        <Container>
          <AddKudoForm
            contractors={contractors}
            changeSelectedContractor={changeSelectedContractor}
            changeAmount={changeAmount}
            changeMessage={changeMessage}
            changeType={changeType}
            addKudo={addKudo}
            selectedContractor={selectedContractor}
          />
          <KudoList kudos={kudos} removeKudo={removeKudoListItem} />
          <Button
            variant="contained"
            color="primary"
            onClick={distributeKudos}
            disabled={kudos.length === 0}
          >
            Send Kudos ({kudosAmountToDistribute()})
          </Button>
        </Container>
      )
  );
}

export default App
