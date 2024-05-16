import PlayerList from "../apis/fetchplayers"

function ManagePlayers(){
    return(
        <div>
            <p>This is Players tab</p>
            <PlayerList></PlayerList>
        </div>
    )
}

export default ManagePlayers;