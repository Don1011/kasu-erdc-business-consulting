import ListItem from './ListItem';

const ListEnumerator = ({ from, to, data }) => {
    if(from === "notifications"){
        return (
            <div>
                {data.map( item => (
                    <ListItem key = {item._id} linkId = {item.linkId} message = {item.message} to = {to} from = {from} />
                ) )}
            </div>
        )
    }else{
        return (
            <div>
                {data.map( client => (
                    <ListItem key = {client._id} client = {client} to = {to} from = {from} />
                ) )}
            </div>
        )
    }
}

export default ListEnumerator
