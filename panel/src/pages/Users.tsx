import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import useUsers from "../hooks/useUsers";

import Modal from "../components/Modal/Modal";
import Table from "../components/Table";
import EditItemModal from '../components/Users/EditItemModal';

export default function Users() {
  const { data, setData, columns, shownUserProgressColumns } = useUsers();
  const [isOpenEditItem, setIsOpenEditItem] = useState(false);
  const [editedItem, setEditedItem]: [{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    displayName: string,
    isVerified: boolean,
    isMod: boolean,
    isBanned: boolean,
    displayProfile: boolean,
    progress: {
      lesson: string,
      progressPercent: number,
      questions: {
        question: string,
        givenAnswer: string
      }[]
    }[]
  }, Dispatch<SetStateAction<any>>] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    displayName: "",
    isVerified: false,
    isMod: false,
    isBanned: false,
    displayProfile: false,
    progress: [
      {
        lesson: "",
        progressPercent: 0,
        questions: [
          {
            question: "",
            givenAnswer: ""
          }
        ]
      }
    ]
  });

  const [isOpenProgress, setIsOpenProgress] = useState(false);
  const [shownUser, setShownUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    displayName: "",
    isVerified: false,
    isMod: false,
    isBanned: false,
    displayProfile: false,
    progress: [
      {
        lesson: "",
        progressPercent: 0,
        questions: [
          {
            question: "",
            givenAnswer: ""
          }
        ]
      }
    ]
  });

  const [isOpenNewItem, setIsOpenNewItem] = useState(false);
  const [newItem, setNewItem] = useState({
    id: data.length + 1 + "",
    firstName: "",
    lastName: "",
    email: "",
    displayName: "",
    isVerified: false,
    isMod: false,
    isBanned: false,
    displayProfile: false,
    progress: []
  });

  const openProgress = function(rowData: any) {
    setShownUser(rowData);
    setIsOpenProgress(true)
  }

  const openEditItem = function(id: string) {
    setEditedItem(data.filter(e => e.id === id)[0]);
    setIsOpenEditItem(true);
  }

  const closeEditItemModal = function() {
    setEditedItem({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      displayName: "",
      isVerified: false,
      isMod: false,
      isBanned: false,
      displayProfile: false
    });
    setIsOpenEditItem(false);
  }

  const saveChanges = function() {
    setData((data) => {
      let d = data;
      let editedIndex = 0;
      d.forEach((el: any, i: number) => {
        if(el.id === editedItem.id) editedIndex = i;
      });
      d[editedIndex] = editedItem;
      return [...d];
    });
    closeEditItemModal();
  }

  const removeItem = function(id: number) {
    setData(data => data.filter((e: any) => e.id !== id));
  }

  const renderRowExpanded = (rowData: any) => {
    return (
      <div className="w-full relative cursor-default">
        {
          rowData.questions.map((item: any, i: number) => (
            <div key={`rowExpand-${i}`} className={"flex items-center justify-between px-2" + (i > 0 ? " mt-1" : "")}>
              <div className="flex items-center">
                <div className="font-semibold"> { item.question } </div>
                <div className="text-xs ml-4"> { item.givenAnswer } </div>
              </div>
              <div className="relative flex border-[1px] border-base-gray rounded-md">
                <div className="absolute top-0 left-0 w-full h-full cursor-no-drop"></div>
                <div className={"p-2 text-green-500 hover:text-green-700 " + (item.state === "correct" ? "bg-green-200" : "")}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={"p-2 text-gray-500 hover:text-gray-700 " + (item.state === "empty" ? "bg-gray-200" : "")}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </div>
                <div className={"p-2 text-red-400 hover:text-red-600 " + (item.state === "wrong" ? "bg-red-200" : "")}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  };

  const closeNewItemModal = function() {
    setNewItem({
      id: data.length + 1 + "",
      firstName: "",
      lastName: "",
      email: "",
      displayName: "",
      isVerified: false,
      isMod: false,
      isBanned: false,
      displayProfile: false,
      progress: []
    });
    setIsOpenNewItem(false);
  }

  const addNewItem = function() {
    if(
      newItem.firstName !== "" &&
      newItem.lastName !== "" &&
      newItem.email !== "" &&
      newItem.displayName !== ""
    ) {
      setData([...data, newItem]);
      closeNewItemModal();
    }
  }

  const handleToggleItem = useCallback((key: string) => {
    setNewItem((item: any) => {
      let d = Object.assign({}, item);
      d[key] = !d[key];                
      return d;
    });
  }, [setNewItem]);
  
  return (
    <div className="page relative flex-1 pb-6 px-6 lg:px-12 pt-20 mt-2 xl:pt-6 xl:mt-0 select-none">
      <div className="text-base-text text-lg font-extrabold w-full text-left mb-4">
        Users
      </div>

      {
        isOpenEditItem && 
        <EditItemModal 
          editedItem={editedItem}
          setEditedItem={(item: object) => setEditedItem(item)}
          saveChanges={() => saveChanges()}
          closeEditItemModal={closeEditItemModal}
        />
      }

      {
        isOpenProgress &&
        <Modal title={`User Progress - #${shownUser.id}`} btnText="Cancel" closeModal={() => setIsOpenProgress(false)} saveChanges={() => setIsOpenProgress(false)}>
          <Table 
            rowKey={"expand"} 
            data={shownUser.progress} 
            columns={shownUserProgressColumns} 
            renderRowExpanded={(rowData: any) => renderRowExpanded(rowData)}
          ></Table>
        </Modal>
      }

      {
        isOpenNewItem && 
        <Modal title="New User" btnText="Add User" closeModal={() => closeNewItemModal()} saveChanges={() => addNewItem()}>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:mr-2">
              <label htmlFor="key" className="text-xs font-semibold mb-2 mt-2 md:mt-0">
                First Name
              </label>
              <input
                className="w-full md:w-60 rounded-lg border-[1px] border-base-gray p-2"
                type="text"
                name="key"
                autoComplete="off"
                defaultValue={newItem.firstName}
                onChange={(e) => setNewItem((item: any) => {     
                  return Object.assign(item, { firstName: e.target.value });
                })}
              />
            </div>
            <div className="flex flex-col md:ml-2">
              <label htmlFor="key" className="text-xs font-semibold mb-2 mt-2 md:mt-0">
                Last Name
              </label>
              <input
                className="w-full md:w-60 rounded-lg border-[1px] border-base-gray p-2"
                type="text"
                name="key"
                autoComplete="off"
                defaultValue={newItem.lastName}
                onChange={(e) => setNewItem((item: any) => {     
                  return Object.assign(item, { lastName: e.target.value });
                })}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-2">
            <div className="flex flex-col md:mr-2">
              <label htmlFor="key" className="text-xs font-semibold mb-2 mt-2 md:mt-0">
                Email
              </label>
              <input
                className="w-full md:w-60 rounded-lg border-[1px] border-base-gray p-2"
                type="text"
                name="key"
                autoComplete="off"
                defaultValue={newItem.email}
                onChange={(e) => setNewItem((item: any) => {     
                  return Object.assign(item, { email: e.target.value });
                })}
              />
            </div>
            <div className="flex flex-col md:ml-2">
              <label htmlFor="key" className="text-xs font-semibold mb-2 mt-2 md:mt-0">
                Display Name
              </label>
              <input
                className="w-full md:w-60 rounded-lg border-[1px] border-base-gray p-2"
                type="text"
                name="key"
                autoComplete="off"
                defaultValue={newItem.displayName}
                onChange={(e) => setNewItem((item: any) => {     
                  return Object.assign(item, { displayName: e.target.value });
                })}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:w-6/12 md:mr-2">
              <label htmlFor="key" className="text-xs font-semibold my-2">
                Is Verified
              </label>
              <label 
                onClick={(e) => handleToggleItem('isVerified')}
                className="switch cursor-pointer"
              >
                <input disabled type="checkbox" checked={newItem.isVerified} />
                <span className="slider round"></span>
              </label> 
            </div>
            <div className="flex flex-col md:w-6/12 md:ml-2">
              <label htmlFor="key" className="text-xs font-semibold my-2">
                Is Mod
              </label>
              <label 
                onClick={(e) => handleToggleItem('isMod')}
                className="switch cursor-pointer"
              >
                <input disabled type="checkbox" checked={newItem.isMod} />
                <span className="slider round"></span>
              </label> 
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:w-6/12 md:mr-2">
              <label htmlFor="key" className="text-xs font-semibold my-2">
                Is Banned
              </label>
              <label 
                onClick={(e) => handleToggleItem('isBanned')}
                className="switch cursor-pointer"
              >
                <input disabled type="checkbox" checked={newItem.isBanned} />
                <span className="slider round"></span>
              </label> 
            </div>
            <div className="flex flex-col md:w-6/12 md:ml-2">
              <label htmlFor="key" className="text-xs font-semibold my-2">
                Display Profile
              </label>
              <label 
                onClick={(e) => handleToggleItem('displayProfile')}
                className="switch cursor-pointer"
              >
                <input disabled type="checkbox" checked={newItem.displayProfile} />
                <span className="slider round"></span>
              </label> 
            </div>
          </div>
        </Modal>
      }

      <Table 
        data={data} columns={columns} hasPage={true} 
        handleRowClick={(rowData: object) => openProgress(rowData)} 
        removeItem={(id: number) => removeItem(id)} 
        editItem={(rowDataID: string) => openEditItem(rowDataID)}
      />


      <div onClick={() => setIsOpenNewItem(true) } className="fixed bottom-0 right-0 xl:right-96 p-3 m-3 bg-base-color hover:bg-base-dark text-gray-50 rounded-full cursor-pointer transition-colors duration-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
    </div>
  )
}
