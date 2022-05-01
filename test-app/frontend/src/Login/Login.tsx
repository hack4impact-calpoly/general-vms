import { Authenticator } from '@aws-amplify/ui-react';

function Login() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}

export default Login;
