import { List } from "@material-ui/core"
import { Kudo } from "../types"
import KudoItem from "./KudoItem"

type Props = {
  kudos: Kudo[]
  removeKudo: Function
}

const KudoList = ({ kudos, removeKudo }: Props): JSX.Element => (
  <List>
    {kudos.map((kudo: Kudo): JSX.Element => <KudoItem key={kudo.id} kudo={kudo} removeKudo={removeKudo} />)}
  </List>
)

export default KudoList
