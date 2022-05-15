import React, { useState, useEffect } from 'react';
import BabyItem from './BabyItem/BabyItem';
import ManageBabyItem from './AddItem/ManageBabyItem';
import Summary from './Summary';
import Modal from './Modal/Modal';
import AddItemIcon from './AddItemIcon/AddItemIcon';
import styles from './BabyItems.module.css';


const TEXTS = {
  addItem: {
    headline: 'Nakoupeno? Pak přidej položku do seznamu :)',
    item: 'Položka:',
    addAmount: 'Částka:',
    sendButton: 'Přidat do seznamu',
    error: 'Prosím zkontroluj, zda máš vše vyplněné správně.',
    type: 'new',
  },
  changeItem: {
    headline: 'Tuto položku můžeš upravit.',
    item: 'Položka:',
    addAmount: 'Částka:',
    sendButton: 'Upravit',
    error: 'Prosím zkontroluj, zda máš vše vyplněné správně.',
    type: 'update',
  },
};

const Baby = ({ babyItems }) => {
  const [itemsToShow, setItemsToShow] = useState('');
  const [modal, setModal] = useState(false);
  const [textToSend, setTextToSend] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const handleModal = (modalType, title) => {
    if (modalType) {
      switch (modalType) {
        case 'new':
          setTextToSend(TEXTS.addItem);
          break;
        case 'update':
          setTextToSend(TEXTS.changeItem);
          title &&
            setSelectedItem(itemsToShow.filter((item) => item.title === title));
          break;
      }
    }
    setModal((modal) => !modal);
  };

  const updateItems = (type, item, itemToUpdate) => {
    console.log(type);

    if (type === 'new') {
      setItemsToShow([...itemsToShow, item]);
    }
    else if (type === 'update' || 'delete') {
      const index = itemsToShow.findIndex(
        (x) => x.title === itemToUpdate.title
      );
      const items = [...itemsToShow];
      type === 'update' ? (items[index] = item) : '';
      type === 'delete' ? items.splice(index, 1) : '';
      setItemsToShow(items);
    }

    setModal((modal) => !modal);
  };

  useEffect(() => {
    setItemsToShow(babyItems.babyItems);
  }, []);
  return (
    <>
      <div className={styles.wrapper}>
        <AddItemIcon handleModal={handleModal} />
        <h1 style={{ padding: '30px 0' }}>Výbavička pro Mikuláška</h1>
        <div className={styles.columns}>
          {itemsToShow && (
            <>
              {itemsToShow.map((babyItem) => {
                return (
                  <BabyItem
                    key={babyItem._id}
                    {...babyItem}
                    handleModal={handleModal}
                  />
                );
              })}
            </>
          )}
        </div>
        <Summary itemsToShow={itemsToShow} />
      </div>
      {modal && (
        <Modal handleModal={handleModal}>
          <ManageBabyItem
            updateItems={updateItems}
            text={textToSend}
            selectedItem={selectedItem}
          />
        </Modal>
      )}
    </>
  );
};

export default Baby;
