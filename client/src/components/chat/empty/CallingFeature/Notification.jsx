import { Button, Dialog } from "@mui/material";
import { useContext } from "react"
import Calling from "./Calling";
import { CallContext } from "./contextCall/Context"

const Notification = () =>  {
    const {answerCall, call, callAccepted} = useContext(CallContext);
  return (
    <>
    
     { callAccepted ? <Calling /> :(

        <Dialog open={true} >
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={() => answerCall()}>
            Answer
          </Button>
        </Dialog>
        )
      }
    </>
  )
}
export default Notification