import React, { useCallback } from 'react'
import Modal from '../Modal/Modal';

export default function EditItemModal(props: any) {
  const { editedItem, setEditedItem, closeEditItemModal, saveChanges } = props;

  const handleToggleItem = useCallback((key: string) => {
    setEditedItem((item: any) => {         
      return { ...item, [key]: !item[key] };
    });
  }, [setEditedItem]);
  
  return (
    <Modal title={`Kullanıcıyı Düzenle - #${editedItem.id}`} btnText="Kaydet" closeModal={() => closeEditItemModal()} saveChanges={() => saveChanges()}>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col md:mr-2">
          <label htmlFor="key" className="text-xs font-semibold mb-2 mt-2 md:mt-0">
            Ad
          </label>
          <input
            className="w-full md:w-60 rounded-lg border-[1px] border-base-gray p-2"
            type="text"
            name="key"
            autoComplete="off"
            defaultValue={editedItem.firstName}
            onChange={(e) => setEditedItem((item: object) => {     
              return { ...item, firstName: e.target.value };
            })}
          />
        </div>
        <div className="flex flex-col md:ml-2">
          <label htmlFor="key" className="text-xs font-semibold mb-2 mt-2 md:mt-0">
            Soyad
          </label>
          <input
            className="w-full md:w-60 rounded-lg border-[1px] border-base-gray p-2"
            type="text"
            name="key"
            autoComplete="off"
            defaultValue={editedItem.lastName}
            onChange={(e) => setEditedItem((item: object) => {     
              return { ...item, lastName: e.target.value };
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
              return { ...item, email: e.target.value };
            })}
          />
        </div>
        <div className="flex flex-col md:ml-2">
          <label htmlFor="key" className="text-xs font-semibold mb-2 mt-2 md:mt-0">
            Kullanıcı Adı
          </label>
          <input
            className="w-full md:w-60 rounded-lg border-[1px] border-base-gray p-2"
            type="text"
            name="key"
            autoComplete="off"
            defaultValue={editedItem.displayName}
            onChange={(e) => setEditedItem((item: object) => {     
              return { ...item, displayName: e.target.value };
            })}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col md:w-6/12 md:mr-2">
          <label htmlFor="key" className="text-xs font-semibold my-2">
            Doğrulandı
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
            Moderatör
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
            Banlı
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
            Profili Göster
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