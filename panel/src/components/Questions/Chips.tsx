import React, { useState } from 'react'
import useQuestions from '@hooks/useQuestions';
import Modal from '../Modal/Modal';

export default function Chips(props: any) {
  const { addToInput } = props;
  const { variables, setVariables } = useQuestions();

  const [isOpenAddChip, setOpenAddChip] = useState(false);
  const [newChip, setNewChip] = useState({
    key: "",
    value: "",
  });

  const addNewChip = () => {
    if (newChip.key !== "" && newChip.value !== "") {
      setVariables((chips) => {
        return [...variables, newChip];
      });
      setOpenAddChip(false);
      setNewChip({ key: "", value: "" });
    }
  };
  
  const deleteChip = function(i: number) {
    setVariables((value: any) => {
      let d = value.filter((e: object, index: number) => index !== i);
      return d
    })
  }

  return (
    <div className="md:max-w-[496px] flex flex-wrap w-full mt-6">
      {
        isOpenAddChip && 
        <Modal title="Add Chip" btnText="Add Chip" closeModal={() => setOpenAddChip(false)} saveChanges={() => addNewChip()}>
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
              onChange={(e) => setNewChip((chip) => {
                return { key: e.target.value, value: chip.value };
              })}
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
              onChange={(e) => setNewChip((chip) => {
                return { key: chip.key, value: e.target.value };
              })}
            />
          </div>
        </Modal>
      }

      {variables.map((item, i) => (
        <div
          onClick={(e) => addToInput(item.key)}
          className="flex justify-between items-center rounded-full border-[1px] border-base-gray hover:bg-base-gray pl-4 pr-2 py-1 mr-4 mb-2 cursor-pointer"
          key={`chip-${i}`}
        >
          <div className="flex flex-col mr-3">
            <div className="text-[9px]"> {item.key} </div>
            <div className="text-[10px] font-semibold"> {item.value} </div>
          </div>
          <div onClick={() => deleteChip(i)} className="hover:text-gray-900 cursor-pointer">
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
  )
}
