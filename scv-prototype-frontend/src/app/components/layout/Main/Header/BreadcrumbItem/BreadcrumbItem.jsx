import React from 'react';

const BreadcrumbItem = (props) => {
  return (
    <li>
      {props.href
        ? (<a href={props.href}>{props.text}</a>)
        : (<span>{props.text}</span>)
      }
    </li>
  );
}

export default BreadcrumbItem;
