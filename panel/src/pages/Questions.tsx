import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import useQuestions from "@hooks/useQuestions";

import Table from "@components/Table";
import EditItemModal from "@components/Questions/EditItemModal";
import NewItemModal from "@components/Questions/NewItemModal";

export default function Questions() {
  const { data, setData, columns } = useQuestions();

  const [isOpenEditItem, setIsOpenEditItem] = useState(false);
  const [editedItem, setEditedItem]: [{
    id: string,
    lesson: string,
    question: string,
    answers: string[]
  }, Dispatch<SetStateAction<any>>] = useState({
    id: '',
    lesson: '',
    question: '',
    answers: ['']
  });

  const openEditItem = useCallback((rowDataID: string) => {
    setEditedItem(data.filter(e => e.id === rowDataID)[0]);
    setIsOpenEditItem(true);
  }, [data])

  const closeEditItem = useCallback(() => {
    setIsOpenEditItem(false);
    setEditedItem({
      id: Math.random().toString(),
      lesson: '',
      question: '',
      answers: []
    });
  }, [])

  const saveChanges = useCallback(() => {
    if(editedItem.answers.filter(e => e === "").length === 0) {
      setData((data) => {
        let d = data;
        let editedIndex = 0;
        d.forEach((el: any, i: number) => {
          if(el.id === editedItem.id) editedIndex = i;
        });
        d[editedIndex] = editedItem;
        return [...d];
      });
      closeEditItem();
    }
  }, [closeEditItem, editedItem, setData]);

  const removeItem = useCallback((id: string) => {
    setData(data.filter((e: any) => e.id !== id));
  }, [data, setData]);

  const [isOpenNewItem, setIsOpenNewItem] = useState(false);

  const addNewItem = useCallback((newItem: any) => {
    if(
      newItem.lesson !== "" && 
      newItem.question !== "" && 
      newItem.answers.length > 0 && 
      newItem.answers.filter((e: string) => e !== "").length !== 0
    ) {
      setData([...data, newItem]);
      setIsOpenNewItem(false);
    }
  }, [data, setData])
  
  const deleteAnswer = useCallback((i:number) => {
    let d = editedItem;
    d.answers.splice(i, 1);
    setEditedItem(d);
    setData((data) => {
      let d = data;
      let editedIndex = 0;
      d.forEach((el: any, i: number) => {
        if(el.id === editedItem.id) editedIndex = i;
      });
      d[editedIndex] = editedItem;
      return [...d];
    });
  }, [editedItem, setData]);

  return (
    <div className="relative page flex-1 pb-6 px-6 lg:px-12 pt-20 mt-2 xl:pt-6 xl:mt-0 select-none">
      <div className="text-base-text text-lg font-extrabold w-full text-left mb-4">
        Questions
      </div>

      {
        isOpenEditItem && 
        <EditItemModal 
          editedItem={editedItem} 
          updateEditedItem={(item: object) => setEditedItem(item)}
          saveChanges={() => saveChanges()} 
          addNewAnswer={(newAnswer: string) => setEditedItem((item: {[key: string]: any}) => {
            return { ...item, answers: [ ...item.answers, newAnswer ] }
          })}
          deleteAnswer={(i: number) => deleteAnswer(i)}
          closeEditItemModal={() => closeEditItem()}
        />
      }

      {
        isOpenNewItem && 
        <NewItemModal 
          addNewItem={(newItem: object) => addNewItem(newItem)} 
          closeNewItemModal={() => setIsOpenNewItem(false)}
        />
      }

      <Table 
        data={data} columns={columns} hasPage={false} 
        removeItem={(id: string) => removeItem(id)} 
        editItem={(rowDataID: string) => openEditItem(rowDataID)}
      />

      <div onClick={() => setIsOpenNewItem(true) } className="fixed bottom-0 right-0 xl:right-96 p-3 m-3 bg-base-color hover:bg-base-dark text-gray-50 rounded-full cursor-pointer transition-colors duration-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
    </div>
  );
}
