import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import useLessons from "@hooks/useLessons";

import Table from "@components/Table";
import EditItemModal from '@components/Lessons/EditItemModal';
import NewItemModal from '@components/Lessons/NewItemModal';

export default function Lessons() {
  const { lessons, setLessons, columns } = useLessons();
  const [isOpenEditItem, setIsOpenEditItem] = useState(false);
  const [editedItem, setEditedItem]: [{
    id: string,
    name: string,
    randomize: boolean,
    variables: {
      key: string,
      value: string
    }[],
    private: boolean,
    questions: string[]
  }, Dispatch<SetStateAction<any>>] = useState({
    id: "",
    name: "",
    randomize: false,
    variables: [{
      key: "",
      value: ""
    }],
    private: false,
    questions: [""]
  });

  const [isOpenNewItem, setIsOpenNewItem] = useState(false);
  
  const openEditItem = useCallback((id: string) => {
    setEditedItem(lessons.filter(e => e.id === id)[0]);
    setIsOpenEditItem(true);
  }, [lessons]);

  const closeEditItem = useCallback(() => {
    setEditedItem({
      id: "",
      name: "",
      randomize: false,
      variables: [{
        key: "",
        value: ""
      }],
      private: false,
      questions: [""]
    });
    setIsOpenEditItem(false);
  }, [setEditedItem]);

  const saveChanges = useCallback(() => {
    setLessons((data) => {
      let d = data;
      let editedIndex = 0;
      d.forEach((el: any, i: number) => {
        if(el.id === editedItem.id) editedIndex = i;
      });
      d[editedIndex] = editedItem;
      return [...d];
    });
    closeEditItem();
  }, [closeEditItem, editedItem, setLessons]);

  const removeItem = useCallback((id: string) => {
    setLessons(data => data.filter((e: any) => e.id !== id));
  }, [setLessons]);

  const addNewItem = useCallback((newItem: any) => {
    if(newItem.name !== "" && newItem.questions.length > 0 && newItem.variables.length > 0) {
      setLessons([...lessons, newItem]);
      setIsOpenNewItem(false);
    }
  }, [lessons, setLessons]);

  return (
    <div className="page relative flex-1 pb-6 px-6 lg:px-12 pt-20 mt-2 xl:pt-6 xl:mt-0 select-none">
      <div className="text-base-text text-lg font-extrabold w-full text-left mb-4">
        Lessons
      </div>

      {
        isOpenEditItem && 
        <EditItemModal 
          editedItem={editedItem}
          updateEditedItem={(item: object) => setEditedItem(item)}
          saveChanges={() => saveChanges()}
          closeEditItem={closeEditItem}
        />
      }

      {
        isOpenNewItem && 
        <NewItemModal 
          addNewItem={(newItem: any) => addNewItem(newItem)}
          closeNewItemModal={() => setIsOpenNewItem(false)}
        />
      }

      <Table 
        data={lessons} columns={columns} hasPage={false} 
        removeItem={(id: string) => removeItem(id)} 
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
