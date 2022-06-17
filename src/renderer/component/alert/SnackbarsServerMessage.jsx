import * as React from 'react';
import PropTypes from 'prop-types';

import CustomizedSnackbars from './CustomizedSnackbars';

export default function SnackbarsServerMessage(props) {
  const handlerMassage = (code, field) => {
    if (field) {
      return (
        <div>
          <span>Код: {code}</span>
          <br />
          <span>Поле: {field}</span>
        </div>
      );
    }
    return <span>Код: {code}</span>;
  };

  return (
    <CustomizedSnackbars
      open={props.open}
      changeOpen={props.changeOpen}
      severity={
        props.code === 'SUCCESS' || props.code === 'PASS'
          ? 'success'
          : 'warning'
      }
      text={handlerMassage(props.code, props.field)}
    />
  );
}

SnackbarsServerMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  changeOpen: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  field: PropTypes.string,
};
