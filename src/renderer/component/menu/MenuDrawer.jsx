import * as React from 'react';
import { Drawer } from '@mui/material';
import ListMenuItems from './ListMenuItems';

export default function MenuDrawer(props) {
  const { setIsLogin } = props;
  return (
    <div>
      <Drawer anchor="left" open onClose={() => props.closeDrawer()}>
        <ListMenuItems
          closeDrawer={props.closeDrawer}
          setIsLogin={setIsLogin}
        />
      </Drawer>
    </div>
  );
}
