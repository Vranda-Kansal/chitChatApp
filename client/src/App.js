
//components
import Messenger from "./components/Messenger";

//google auth
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./context/AccountProvider";

function App() {
  //client id..
  const clientId = '1043649933912-lnf3k3vjj79n8tq93tjuq2khvcg9qct0.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
