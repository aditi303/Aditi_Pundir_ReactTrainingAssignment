import React from 'react';

class Validation extends React.Component {
  static isEmpty(str: string): boolean {
    return str.trim() === '';
  }
}
export default Validation;