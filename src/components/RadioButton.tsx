import { FormControlLabel, Radio } from '@material-ui/core'

type Props = {
  value: number | string
}

const RadioButton = ({ value }: Props): JSX.Element => (
  <FormControlLabel
    value={value}
    control={<Radio color="primary" />}
    label={value}
    labelPlacement="top"
  />
)

export default RadioButton
