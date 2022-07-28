import React, { FC } from 'react'

interface Props {
  children: any,
  closeDropdown: () => void
}

const Dropdown: FC<Props> = function(props) {
  const { closeDropdown } = props;
  
  return (
    <div onClick={() => closeDropdown()} className="dropdown shadow-2xl absolute top-full right-0 w-32 select-none bg-white rounded-lg overflow-hidden">
      {props.children}
    </div>
  )
}

export default Dropdown;
