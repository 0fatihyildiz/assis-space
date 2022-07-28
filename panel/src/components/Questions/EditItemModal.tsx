import React, { useCallback, useState } from 'react';
import { TagPicker } from 'rsuite';
import useLessons from '@hooks/useLessons';
import Chips from './Chips';
import Modal from '../Modal/Modal';

const REGEX = /(\$.[^ ]*)/g;

export default function EditItemModal(props: any) {
  const { lessons } = useLessons();
  const { editedItem, updateEditedItem, saveChanges, deleteAnswer, closeEditItemModal } = props;
  
  const onTagPickerCreate = useCallback((...args: any[]) => {
    const el = args[0] as HTMLDivElement;
    el.setAttribute("data-ignore-outside-clicks", "");
  }, []);
  
  const addAnswer = useCallback(() => {
    let a = editedItem.answers;
    a.push("");
    updateEditedItem((item: {[key: string]: any}) => {
      return { ...item, answers: [...a] }
    });
  }, [editedItem, updateEditedItem]);

  const updateAnswer = useCallback((value: string, i: number) => {
    let a = [...editedItem.answers];
    a[i] = value;

    updateEditedItem((item: {[key: string]: any}) => {
      return { ...item, answers: [...a] }
    });
  }, [editedItem, updateEditedItem]);
  const [focusElementID, setFocusElementID] = useState("");

  const addToInput = useCallback(async (key: string) => {
    let myInput: any = document.getElementById(focusElementID);
    if(!myInput) return;
    
    let startPos = myInput.selectionStart;
    let endPos = myInput.selectionEnd;
    let additive = "$" + key;

    if (startPos === endPos) {
      let a: any = myInput.value.split("");

      if (a[startPos - 1] !== undefined && a[startPos - 1] !== " ") {
        additive = " " + additive;
      }

      if(a[startPos] !== " ") {
        if(startPos !== a.length) {
          additive = additive + " ";
        }
      }
      a.splice(startPos, 0, additive);
      a = a.join("");

      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
      setter?.call(myInput, a);
      
      myInput.setSelectionRange(
        endPos + additive.length,
        endPos + additive.length
      );
      myInput.focus();

      myInput.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }, [focusElementID]);

  return (
    <Modal title={`Edit Item - #${editedItem.id}`} btnText="Save Changes" closeModal={() => closeEditItemModal()} saveChanges={() => saveChanges()}>
      <div className="flex flex-col relative mt-2">
        <div className="flex flex-col md:w-[496px]">
          <label htmlFor="key" className="text-xs font-semibold mb-2 mt-4 md:mt-0">
            Lesson
          </label>
          <TagPicker onChange={(value) => updateEditedItem((item: any) => {
              return { ...item, lesson: value };
            })} 
            size="sm" onOpen={onTagPickerCreate} defaultValue={editedItem.lesson} data={lessons} labelKey="name" valueKey="name" style={{ width: "100%", maxWidth: 496, display: 'block', padding: '4px 8px' }} 
          />
        </div>
        
        <Chips addToInput={(key: string) => addToInput(key)}/>

        <div className="flex flex-col w-full">
          <label htmlFor="key" className="text-xs font-semibold mb-2">
            Question
          </label>

          <div className="input-container w-full relative rounded-lg border-[1px] border-base-gray">
            <input
              onFocus={(e) => setFocusElementID(e.target.id)}
              id="question"
              className="w-full absolute z-[1] p-2 text-sm bg-transparent"
              value={editedItem.question}
              autoComplete="off"
              onChange={(e) => updateEditedItem((item: {[key: string]: any}) => {
                return { ...item, question: e.target.value }
              })}
            ></input>

            <div className="input-renderer absolute flex items-center text-sm whitespace-pre overflow-x-auto select-none m-2">
              {editedItem.question.split(REGEX).map((word:any, i:number) => {
                if (word.match(REGEX) !== null) {
                  return (
                    <span key={i} className="text-base-color">
                      {word}
                    </span>
                  );
                } else {
                  return <span key={i}>{word}</span>;
                }
              })}
            </div>
          </div>

          <label htmlFor="key" className="text-xs font-semibold mb-2 mt-4">
            Answers
          </label>
          {
            editedItem.answers.map((answer: string, i: number) => (
              <div key={`answerInput-${i}`} className={"input-container w-full relative flex items-center rounded-lg border-[1px] border-base-gray" + (i > 0 ? " mt-2" : "")}>
                <input
                  onFocus={(e) => setFocusElementID(e.target.id)}
                  id={`answer-${i}`}
                  className="w-full absolute z-[1] p-2 text-sm bg-transparent"
                  type="text"
                  name="key"
                  value={answer}
                  autoComplete="off"
                  onChange={(e) => updateAnswer(e.target.value, i)}
                />
                <div className="input-renderer absolute flex items-center text-sm whitespace-pre overflow-x-auto select-none m-2">
                  {answer.split(REGEX).map((word:any, i:number) => {
                    if (word.match(REGEX) !== null) {
                      return (
                        <span key={i} className="text-base-color">
                          {word}
                        </span>
                      );
                    } else {
                      return <span key={i}>{word}</span>;
                    }
                  })}
                </div>
                <div onClick={() => deleteAnswer(i)} className="bg-white absolute right-0 w-8 h-full flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer z-[3]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            ))
          }
          <div className="flex">
            <div onClick={() => addAnswer()} className="flex items-center text-xs font-semibold text-gray-500 hover:text-gray-600 cursor-pointer mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Answer
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
