import React from 'react'
import { useClickOutside } from '../../hooks/use-click-outside';
import ModalHeader from './ModalHeader';

export default function EditItemModal(props: any) {
  const { title, btnText, closeModal, saveChanges, children } = props;
  const modalClickOutsideRef = useClickOutside(
    () => closeModal(),
    ["mouseup", "touchend"]
  );

  return (
    <div className="modal-bg fixed top-0 left-0 w-screen h-screen bg-[#00000044] flex items-center justify-center z-30">
      <div className="modal md:max-w-[544px] md:w-[544px] bg-white rounded-lg p-6 mx-4" ref={modalClickOutsideRef}>
        <ModalHeader title={title} closeModal={closeModal} />

        <div className="flex flex-col mt-2">
         { children }
        </div>

        <div className="flex justify-end">
          <div
            onClick={() => saveChanges()}
            className="bg-base-color hover:bg-base-dark text-white rounded-lg mt-4 py-2 px-6 text-center cursor-pointer"
          >
            { btnText }
          </div>
        </div>
      </div>
    </div>
  )
}
