import React from 'react';

export default function Icon() {
  return (
    <div>
      <i className={`col-${this.props.size} ${this.props.iconclass}`} aria-hidden="true" />
    </div>
  )
}
