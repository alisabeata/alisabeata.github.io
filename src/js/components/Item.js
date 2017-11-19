import React from 'react';


export default function Item({article, active, onClick}) {
  return (
    <div className = {active ? 'list__item active' : 'list__item'} onClick = {onClick}>
      <p className = 'list__title'><span>{article.title}</span></p>
      <div className = 'list__descr'>
        <p>{article.text}</p>
      </div>
    </div>
  );
}