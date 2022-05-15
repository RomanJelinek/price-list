import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBabyItem = ({ updateItems, text, selectedItem }) => {
  const [showError, setShowError] = useState(false);
  const [values, setValues] = useState({
    title: '',
    value: 0,
    color: 0,
  });
  const [itemToUpdate, setItemToUpdate] = useState({
    title: '',
    value: 0,
    color: 0,
  });

  useEffect(() => {
    if (text.type === 'update') {
      setItemToUpdate(selectedItem[0]);
      setValues(selectedItem[0]);
    }
  }, [selectedItem]);

  const getValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      color: Math.floor(Math.random() * 10),
    });
  };

  const sendResults = async (isDelete) => {
    const type = isDelete ? isDelete : text.type;
    console.log(type);
    const valuesToSend = { type: type, itemToUpdate, values };
    if (values.title !== '' && values.value > 0) {
      showError && setShowError(false);
      try {
        const resp = await axios.post('/api/insert-values', valuesToSend);
        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      } finally {
        updateItems(type, values, itemToUpdate);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <div>
      <h1>{text.headline}</h1>
      <ul>
        <li>
          {text.item}{' '}
          <input name="title" value={values.title} onChange={getValues}></input>
        </li>
        <li>
          {text.addAmount}
          <input
            type="number"
            name="value"
            value={values.value}
            onChange={getValues}
          ></input>
        </li>
        <button
          onClick={() => sendResults('')}
          style={{ background: '#8cff9e', cursor: 'pointer' }}
        >
          {text.sendButton}
        </button>
        <button
          onClick={() => sendResults('delete')}
          style={{
            background: '#CD5C5C',
            cursor: 'pointer',
            marginLeft: '30%',
          }}
        >
          Smazat
        </button>
      </ul>
      {showError && <span style={{ color: 'red' }}>{text.error}</span>}
    </div>
  );
};

export default AddBabyItem;