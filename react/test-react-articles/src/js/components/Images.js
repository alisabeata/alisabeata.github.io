import React from 'react';


export default function Images({article, active, index}) {
  return (
    <div className = {active ? 'images__item active' : 'images__item'}>
      <img src = {article.img} />
    </div>
  );
}