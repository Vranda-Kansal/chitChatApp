import PhoneIcon from '@mui/icons-material/Phone';
import { useContext, useState } from 'react';
import {AccountContext} from '../../../../context/AccountProvider.jsx';
import Calling from './Calling.jsx';
import { CallContext } from './contextCall/Context.jsx';
import Notification from './Notification.jsx';


function Call() {
    const {account, person} = useContext(AccountContext);
    const {callUser, call, callEnded} = useContext(CallContext);
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
      setOpen(true);
    }

    // console.log(call.isReceivingCall);
    // console.log(!callAccepted);
    
  return (
    <>
        <PhoneIcon onClick= {() => {toggleDrawer(); callUser({from: account.sub, to: person.sub})}}/>
       { open  && !callEnded && <Calling />}
       {call.isReceivingCall &&  <Notification />}
    </>
  )
}
export default Call