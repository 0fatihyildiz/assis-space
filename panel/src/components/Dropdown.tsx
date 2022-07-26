import React from 'react'

export default function Dropdown(props: any) {
  const { closeDropdown } = props;
  

  return (
    <div onClick={() => closeDropdown()} className="shadow-2xl absolute top-full right-0 w-32 select-none bg-white rounded-lg overflow-hidden">
      {props.children}
    </div>
  )
}
