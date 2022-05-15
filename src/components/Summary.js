import React from 'react';

const summaryWrapper = {
  background:
    'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),  url(/racochejl2.jpeg) ',
  backgroundPosition: '100% 75%',
  backgroundSize: '450px',
  width: 350,
  height: 250,
  borderRadius: '10px',
  margin: '20px auto',
  textAlign: 'right',
  padding: 10,
};

const toSpend = 100000

const Summary = ({ itemsToShow }) => {
  const spend = itemsToShow && itemsToShow
    .map((item) => Number(item.value))
    .reduce((prev, curr) => prev + curr, 0);


  return (
    <div style={summaryWrapper}>
      <h1>Souhrn</h1>
      <h2>Částka: {toSpend} Kč</h2>
      <h2>Utraceno: {spend} Kč</h2>
      <h2>Zbývá: {toSpend - spend} Kč</h2>
    </div>
  );
};

export default Summary;
