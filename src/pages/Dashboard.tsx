import * as React from 'react';
import Auth from '../containers/Auth';
import Achievements from '../containers/Achievements';

interface Props {}

const Dashboard: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <Auth />
      <Achievements />
    </div>
  );
};

export default Dashboard;
