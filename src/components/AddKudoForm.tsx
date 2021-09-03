import { ChangeEvent } from 'react'
import { Grid, List, TextField, ListItem, ListItemAvatar, Avatar, ListItemText, RadioGroup, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Contractor } from '../types'
import RadioButton from './RadioButton'

const KUDO_POINT_VALUES = ['1', '2', '3', '4', '5']
const KUDO_TYPE_VALUES = [
  'Customer Satisfaction',
  'Coworker Satisfaction',
  'Atmosphere',
  'Business Development',
  'Personal Growth'
]

type Props = {
  contractors: Contractor[]
  changeSelectedContractor: (event: ChangeEvent<HTMLInputElement | {}>, value: Contractor | null) => void
  changeAmount: (event: ChangeEvent<HTMLInputElement>) => void
  changeMessage: (event: ChangeEvent<HTMLInputElement>) => void
  changeType: (event: ChangeEvent<HTMLInputElement>) => void
  addKudo: () => void
  selectedContractor: Contractor | undefined
}

const AddKudoForm = ({
  contractors,
  changeSelectedContractor,
  changeAmount,
  changeMessage,
  changeType,
  addKudo,
  selectedContractor
}: Props): JSX.Element => {
  const renderRadioButtons = (values: Array<string>): Array<JSX.Element> => (
    values.map((value: string): JSX.Element => (
      <Grid item xs={2}>
        <RadioButton value={value} />
      </Grid>
    ))
  )

  return (
    <Grid container spacing={3} direction="column" justifyContent="center" alignItems="stretch">
      <Grid item xs={12}>
        <Autocomplete
          options={contractors}
          ListboxComponent={List}
          getOptionLabel={(contractor: Contractor): string => contractor.name}
          renderInput={(contractor: any): JSX.Element => (
            <TextField {...contractor} label="Select Receiver" variant="outlined" />
          )}
          onChange={changeSelectedContractor}
          renderOption={(contractor: Contractor): JSX.Element => (
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={contractor.name} src={contractor.avatarUrl} />
              </ListItemAvatar>
              <ListItemText primary={contractor.name}
              />
            </ListItem>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <RadioGroup row aria-label="position" name="position" defaultValue="1" onChange={changeAmount}>
          <Grid container justifyContent="center">
            { renderRadioButtons(KUDO_POINT_VALUES) }
          </Grid>
        </RadioGroup>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup row aria-label="position" name="position" defaultValue="Customer Satisfaction" onChange={changeType}>
          <Grid container justifyContent="space-between" alignItems="flex-end">
            { renderRadioButtons(KUDO_TYPE_VALUES) }
          </Grid>
        </RadioGroup>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Message" variant="outlined" onChange={changeMessage} fullWidth={true} />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={addKudo}
          disabled={selectedContractor!.id === undefined}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  )
}

export default AddKudoForm
