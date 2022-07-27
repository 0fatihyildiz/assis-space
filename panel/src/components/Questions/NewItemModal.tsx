import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { TagPicker } from 'rsuite';
import useLessons from '@hooks/useLessons';
import useQuestions from '@hooks/useQuestions';
import Chips from './Chips';
import Modal from "../Modal/Modal";

const REGEX = /(\$.[^ ]*)/g;

export default function NewItemModal(props: any) {
  const { addNewItem, closeNewItemModal } = props;
  const { data } = useQuestions();
  const { lessons } = useLessons();

  const [newItem, setNewItem]: [
    {
      id: string,
      lesson: string,
      question: string,
      answers: string[]
    },
    Dispatch<SetStateAction<any>>
  ] = useState({
    id: data.length + 1 + "",
    lesson: '',
    question: '',
    answers: []
  });

  const addAnswer = useCallback(() => {
    let a = newItem.answers;
    a.push("");
    setNewItem({
      id: newItem.id,
      lesson: newItem.lesson,
      question: newItem.question,
      answers: [...a]
    });
  }, [newItem, setNewItem]);

  const updateAnswer = function(value: string, i: number) {
    let a = [...newItem.answers];
    a[i] = value;

    setNewItem({
      id: newItem.id,
      lesson: newItem.lesson,
      question: newItem.question,
      answers: [...a]
    });
  }
  
  const deleteAnswer = useCallback((i:number) => {
    let d = newItem;
    d.answers.splice(i, 1);
    setNewItem({
      id: newItem.id,
      lesson: newItem.lesson,
      question: newItem.question,
      answers: [...d.answers]
    });
  }, [newItem, setNewItem])

  const onTagPickerCreate = useCallback((...args: any[]) => {
    const el = args[0] as HTMLDivElement;
    el.setAttribute("data-ignore-outside-clicks", "");
  }, []);

  const addToInput = async (key: string) => {
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
  };
  const [focusElementID, setFocusElementID] = useState("");

  return (
    <Modal title="New Question" btnText="Add Question" closeModal={() => closeNewItemModal()} saveChanges={() => addNewItem(newItem)}>
      <div className="flex flex-col md:w-[496px]">
        <label htmlFor="key" className="text-xs font-semibold mb-2 mt-4 md:mt-0">
          Lesson
        </label>
        <TagPicker onChange={(value) => setNewItem((item: any) => {
          return Object.assign(item, { lesson: value });
        })} 
          size="sm" onOpen={onTagPickerCreate} defaultValue={newItem.lesson} data={lessons} labelKey="name" valueKey="name" style={{ width: "100%", maxWidth: 496, display: 'block', padding: '4px 8px' }}
        />
      </div>

      <Chips addToInput={(key: string) => addToInput(key)}/>

      <label htmlFor="key" className="text-xs font-semibold mb-2">
        Question
      </label>

      <div className="input-container w-full relative rounded-lg border-[1px] border-base-gray">
        <input
          onFocus={(e) => setFocusElementID(e.target.id)}
          id="question"
          className="w-full absolute z-[1] p-2 text-sm bg-transparent"
          value={newItem.question}
          autoComplete="off"
          onChange={(e) => setNewItem({
            id: newItem.id,
            lesson: newItem.lesson,
            question: e.target.value,
            answers: newItem.answers
          })}
        ></input>

        <div className="input-renderer absolute flex items-center text-sm whitespace-pre overflow-x-auto select-none m-2">
          {newItem.question.split(REGEX).map((word:any, i:number) => {
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
      <div className="md:max-w-[496px]">
        {
          newItem.answers.map((answer: string, i: number) => (
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
      </div>
      <div className="flex">
        <div onClick={() => addAnswer()} className="flex items-center text-xs font-semibold text-gray-500 hover:text-gray-600 cursor-pointer mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Answer
        </div>
      </div>
    </Modal>
  )
}
