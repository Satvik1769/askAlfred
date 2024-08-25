import React, { createContext, useContext, useState } from 'react';
const NameContext = createContext();
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

export const useName = () => useContext(NameContext);

export const NameProvider = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const { address } = useWeb3ModalAccount();


  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);
  const handleInputChanges = (event) => setInputName(event.target.value);
  const handleSubmitName = async() => {
    // Handle the name submission logic here
    console.log("Name Submitted:", inputName);
    const response = await fetch(`http://localhost:3001/name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputName,
        address: address,
      }),
    });

    const data = await response.json();
    console.log(data)
    hideModal();
  };


  return (
    <NameContext.Provider   value={{
        isModalVisible,
        inputName,
        showModal,
        hideModal,
        handleInputChanges,
        handleSubmitName
      }}>
      {children}
    </NameContext.Provider>
  );
};
