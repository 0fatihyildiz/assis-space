import React, { useCallback } from 'react'
import Modal from '../Modal/Modal';

export default function EditItemModal(props: any) {
  const { editedItem, setEditedItem, closeEditItemModal, saveChanges } = props;

  const handleToggleItem = useCallback((key: string) => {
    setEditedItem((item: any) => {
      let d = Object.assign({}, item);
      d[key] = !d[key];                
      return d;
    });
  }, [setEditedItem]);
  
  return (
    <Modal title={`Edit Item - #${editedItem.id}`} btnText="Save Changes" closeModal={() => closeEditItemModal()} saveChanges={() => saveChanges()}>
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
            defaultValue={editedItem.firstName}
            onChange={(e) => setEditedItem((item: object) => {     
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
            defaultValue={editedItem.lastName}
            onChange={(e) => setEditedItem((item: object) => {     
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
            defaultValue={editedItem.email}
            onChange={(e) => setEditedItem((item: object) => {     
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
            defaultValue={editedItem.displayName}
            onChange={(e) => setEditedItem((item: object) => {     
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
            <input disabled type="checkbox" checked={editedItem.isVerified} />
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
            <input disabled type="checkbox" checked={editedItem.isMod} />
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
            <input disabled type="checkbox" checked={editedItem.isBanned} />
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
            <input disabled type="checkbox" checked={editedItem.displayProfile} />
            <span className="slider round"></span>
          </label> 
        </div>
      </div>
    </Modal>
  )
}