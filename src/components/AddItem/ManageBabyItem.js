import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageBabyItem.module.css';


const ManageBabyItem = ({ updateItems, text, selectedItem }) => {
  const [showError, setShowError] = useState(false);
  const [values, setValues] = useState({
    title: '',
    value: "",
    color: 0,
  });
  const [itemToUpdate, setItemToUpdate] = useState({
    title: '',
    value: 0,
    color: 0,
  });
  const [sending, setSending] = useState(false);
  const [deleteIntention, setDeleteIntention] = useState(false)

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
    const valuesToSend = { type: type, itemToUpdate, values };
    if (values.title !== '' && values.value > 0) {
      setSending(true);
      showError && setShowError(false);
      try {
        const resp = await axios.post('/api/insert-values', valuesToSend);
        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      } finally {
        setSending(false);
        updateItems(type, values, itemToUpdate);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <h1>{text.headline}</h1>
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
      {!sending ? (
        <>
          <button
            onClick={() => sendResults('')}
            className={styles.send_results_button}
          >
            {text.sendButton}
          </button>
          {!deleteIntention ? (
            <>
              {text.type === 'update' && (
                <button
                  onClick={() => setDeleteIntention(true)}
                  className={styles.delete_button}
                >
                  Smazat
                </button>
              )}
            </>
          ) : (
            <>
              <p>Opravdu chcete položku smazat?</p>
              <div>
                <button
                  onClick={() => sendResults('delete')}
                  style={{
                    background: '#CD5C5C',
                    cursor: 'pointer',
                    fontSize: '15px',
                    marginBottom: '10px',
                  }}
                >
                  Ano
                </button>
                <button
                  onClick={() => setDeleteIntention(false)}
                  style={{
                    background: '#CD5C5C',
                    cursor: 'pointer',
                    fontSize: '15px',
                    marginLeft: '10px',
                    marginBottom: '10px',
                  }}
                >
                  Ne
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <h3>Odesílám ...</h3>
      )}
      {showError && <span style={{ color: 'red' }}>{text.error}</span>}
    </>
  );
};

export default ManageBabyItem;
