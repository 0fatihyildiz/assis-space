import React, { FC } from "react";
import { Table } from "rsuite";

const { Cell } = Table;

interface Props {
  rowData: {[key: string]: any},
  editItem: (arg0: string) => void,
  removeItem: (arg0: string) => void
}

const TableAction: FC<Props> = function(props) {
  const { rowData, editItem, removeItem, ...p} = props;
  
  return (
    <Cell {...p} className="link-group">
      <div className="flex">
        <div onClick={(e) => {
          e.preventDefault();
          editItem(rowData.id)
        }} className="relative w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 rounded-md cursor-pointer">
          <div id="disableClick" className="absolute w-full h-full top-0 left-0"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div onClick={(e) => {
          e.preventDefault();
          removeItem(rowData.id)
        }} className="relative w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 rounded-md cursor-pointer">
          <div id="disableClick" className="absolute w-full h-full top-0 left-0"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      </div>
    </Cell>
  );
};

export default TableAction;
