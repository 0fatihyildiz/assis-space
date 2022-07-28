import React, { useCallback, useState } from 'react'
import { TagPicker } from 'rsuite';
import Modal from "../Modal/Modal";
import useQuestions from '@hooks/useQuestions';

export default function EditItemModal(props: any) {
  const { data } = useQuestions();
  const { editedItem, updateEditedItem, saveChanges, closeEditItem } = props;

  const [isOpenAddChip, setOpenAddChip] = useState(false);
  const [newChip, setNewChip] = useState({
    key: "",
    value: "",
  });

  const addNewChip = useCallback(() => {
    if (newChip.key !== "" && newChip.value !== "") {
      updateEditedItem((item: {[key: string]: any}) => { 
        return { ...item, variables: [...item.variables, newChip] }
      });
      setOpenAddChip(false);
    }
    setNewChip({ key: "", value: "" });
  }, [newChip, updateEditedItem]);

  const deleteVariable = useCallback((i: number) => {
    let d = [...editedItem.variables];
    d.splice(i, 1);
    updateEditedItem((item: {[key: string]: any}) => {
      return { ...item, variables: [...d] }
    })
  }, [editedItem, updateEditedItem]);

  const styles = { width: "100%", maxWidth: 496, display: 'block', padding: '4px 8px' };
  const onTagPickerCreate = useCallback((...args: any[]) => {
    const el = args[0] as HTMLDivElement;
    el.setAttribute("data-ignore-outside-clicks", "");
  }, []);
  
  return (
    <Modal title={`Edit Item - #${editedItem.id}`} btnText="Save Changes" closeModal={() => closeEditItem()} saveChanges={() => saveChanges()}>
      {
        isOpenAddChip && 
        <Modal title={`Edit Item - #${editedItem.id}`} btnText="Add Chip" closeModal={() => setOpenAddChip(false)} saveChanges={() => addNewChip()}>
          <div className="flex flex-col mt-2">
            <label htmlFor="key" className="text-xs font-semibold mb-2">
              Key
            </label>
            <input
              className="rounded-lg border-[1px] border-base-gray p-2"
              type="text"
              name="key"
              defaultValue={newChip.key}
              autoComplete="off"
              onChange={(e) =>
                setNewChip((chip) => {
                  return { ...chip, key: e.target.value };
                })
              }
            />
            <label htmlFor="key" className="text-xs font-semibold mt-4 mb-2">
              Value
            </label>
            <input
              className="rounded-lg border-[1px] border-base-gray p-2"
              type="text"
              name="key"
              defaultValue={newChip.value}
              autoComplete="off"
              onChange={(e) =>
                setNewChip((chip) => {
                  return { ...chip, value: e.target.value };
                })
              }
            />
          </div>
        </Modal>
      }

      <div className="flex flex-col mt-2">
        <div className="flex flex-col md:flex-row">
          <div className="flex w-full flex-col">
            <label htmlFor="key" className="text-xs font-semibold mb-2 mt-2 md:mt-0">
              Name
            </label>
            <input
              className="w-full rounded-lg border-[1px] border-base-gray p-2"
              type="text"
              name="key"
              defaultValue={editedItem.name}
              autoComplete="off"
              onChange={(e) => updateEditedItem((item: {[key: string]: any}) => {
                return { ...item, name: e.target.value }
              })}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-60 flex flex-col md:mr-2">
            <label htmlFor="key" className="text-xs font-semibold my-2">
              Randomize
            </label>
            <label 
              onClick={(e) => updateEditedItem((item: {[key: string]: any}) => {
                return { ...item, randomize: !item.randomize }
              })}
              className="switch cursor-pointer"
            >
              <input disabled type="checkbox" checked={editedItem.randomize} />
              <span className="slider round"></span>
            </label> 
          </div>
          <div className="md:w-60 flex flex-col md:ml-2">
            <label htmlFor="key" className="text-xs font-semibold my-2">
              Private
            </label>
            <label 
              onClick={(e) => updateEditedItem((item: {[key: string]: any}) => {
                return { ...item, private: !item.private }
              })}
              className="switch cursor-pointer"
            >
              <input disabled type="checkbox" checked={editedItem.private} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="key" className="text-xs font-semibold my-2">
            Variables
          </label>
          <div className="flex flex-wrap md:max-w-[496px]">
            {editedItem.variables.map((item:any, i:number) => (
              <div
                className="flex justify-between items-center rounded-full border-[1px] border-base-gray pl-4 pr-2 py-1 mr-4 mb-2"
                key={`chip-${i}`}
              >
                <div className="flex flex-col mr-3">
                  <div className="text-[9px]"> {item.key} </div>
                  <div className="text-[10px] font-semibold"> {item.value} </div>
                </div>
                <div onClick={() => deleteVariable(i)} className="hover:text-gray-900 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            ))}

            <div
              onClick={() => setOpenAddChip(true)}
              className="flex flex-col justify-center rounded-full border-[1px] border-base-gray hover:bg-base-gray px-2.5 py-2 mr-4 mb-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-4.5 -4.5 24 24"
                width="16"
                fill="currentColor"
              >
                <path d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"></path>
              </svg>
            </div>
          </div>
          <label htmlFor="key" className="text-xs font-semibold mb-2 mt-4 md:mt-0">
            Questions
          </label>
          <TagPicker 
            onChange={(value) => updateEditedItem((item: {[key: string]: any}) => {
              return { ...item, questions: value }
            })}
            size="sm" onOpen={onTagPickerCreate} defaultValue={editedItem.questions} data={data} labelKey="question" valueKey="question" style={styles} 
          />
        </div>
      </div>
    </Modal>
  )
}
