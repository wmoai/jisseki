import * as React from 'react';

interface Props {
  isLogined: boolean;
}

const AuthContainer: React.FunctionComponent<Props> = (props: Props) => {
  const {isLogined} = props;
  if (isLogined) {
    return null;
  }
  return (
    <div>
      <div id="firebaseui-auth-container" />
    </div>
  );
};

export default AuthContainer;
