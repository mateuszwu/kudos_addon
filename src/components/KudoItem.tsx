import { Avatar, Button, Grid, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"
import BackspaceIcon from '@material-ui/icons/Backspace'
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import Filter4Icon from '@material-ui/icons/Filter4'
import Filter5Icon from '@material-ui/icons/Filter5'
import { Kudo } from "../types"

const KudoPoints = (kudo: Kudo): JSX.Element => {
  return [
    <Filter1Icon />,
    <Filter2Icon />,
    <Filter3Icon />,
    <Filter4Icon />,
    <Filter5Icon />,
  ][kudo.amount - 1]
}

type Props = {
  kudo: Kudo;
  removeKudo: Function;
}

const KudoItem = ({ kudo, removeKudo }: Props): JSX.Element => {
  return (
    <ListItem ContainerComponent='div'>
      <ListItemAvatar>
        <Avatar alt={kudo.contractor.name} src={kudo.contractor.avatarUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Grid container justifyContent="flex-start" alignItems="center">
            <Grid item>
              {kudo.contractor.name}
            </Grid>
            <Grid item>
              <Button onClick={(): void => removeKudo(kudo)}>
                <BackspaceIcon fontSize="small" />
              </Button>
            </Grid>
          </Grid>
        }
        secondary={
          <>
            <KudoPoints {...kudo} /> {kudo.message}
          </>
        }
      />
    </ListItem>
  )
}

export default KudoItem
