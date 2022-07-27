import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Table, Pagination } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "@assets/css/table.scss";
import TableAction from "./TableAction";

const { HeaderCell, Cell, Column } = Table;

const ItemTypes = {
  COLUMN: "column",
  ROW: "row",
};
const matchRowKey = "expand";

function DraggableHeaderCell({ children, onDrag, id, ...rest }: any) {
  const ref = React.useRef(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item, monitor) {
      // @ts-ignore
      onDrag(item.id, id);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { id },
    type: ItemTypes.COLUMN,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const isActive = canDrop && isOver;

  if (id !== "actions" && id !== "expand") drag(drop(ref));

  const styles: {
    padding: string;
    cursor: string;
    opacity: number;
    borderLeft: any;
  } = {
    padding: "0.6rem 1rem",
    cursor: "grab",
    opacity: isDragging ? 0 : 1,
    borderLeft: isActive ? "2px solid #f0476f" : null,
  };

  return (
    <HeaderCell {...rest} style={{ padding: 0 }}>
      <div ref={ref} style={styles}>
        {children}
      </div>
    </HeaderCell>
  );
}

const TableCell = ({ rowData, keyData, ...props }: any) => {
  let value = rowData[keyData];

  return (
    <Cell {...props}>
      <div className="flex flex-wrap items-center">
        {typeof value === "boolean" ? (
          <label className="switch">
            <input disabled checked={value} type="checkbox" />
            <span className="slider round"></span>
          </label>
        ) : typeof value === "object" ? (
          value.map((el: any, i: number) => (
            <div
              key={`tableChip-${i}`}
              className="text-[10px] rounded-full border-[1px] border-base-gray px-4 py-1 mr-2 my-1 whitespace-nowrap"
            >
              {!!el.key ? (
                <>
                  <div className="text-[9px]"> {el.key} </div>
                  <div className="text-[10px] font-semibold"> {el.value} </div>
                </>
              ) : !!el.label ? (
                el.label
              ) : (
                el
              )}
            </div>
          ))
        ) : keyData === "progressPercent" ? (
          <div className="flex items-center text-xs font-semibold">
            {value}%
            <div className="w-[100px] h-2 ml-2 bg-gray-300 rounded-lg overflow-hidden ">
              <div
                className="h-2 bg-base-color rounded-lg"
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ) : keyData === "id" ? (
          <div className="max-w-full whitespace-nowrap text-ellipsis overflow-hidden">
            {value}
          </div>
        ) : (
          value
        )}
      </div>
    </Cell>
  );
};

const ExpandCell = ({
  rowData,
  dataKey,
  expandedRowKeys,
  onChange,
  ...props
}: any) => {
  return (
    <Cell {...props}>
      <div onClick={() => onChange(rowData)} className="pressArea relative">
        {expandedRowKeys.some((key: any) => key === rowData[matchRowKey]) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    </Cell>
  );
};

function Row({ children, onDrag, id, rowData, ...rest }: any) {
  const ref = React.useRef(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.ROW,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item, monitor) {
      // @ts-ignore
      onDrag && onDrag(item.id, rowData.id);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { id: rowData.id },
    type: ItemTypes.ROW,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const isActive = canDrop && isOver;

  drag(drop(ref));

  const styles: {
    cursor: string;
    opacity: number;
    background: any;
    width: string;
    height: string;
    borderTop: any;
  } = {
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1,
    background: isActive ? "#ddd" : null,
    width: "100%",
    height: "100%",
    borderTop: isActive ? "2px solid #f0476f" : null,
  };

  return (
    <div ref={ref} style={styles}>
      {children}
    </div>
  );
}

function sort(source: Array<object>, sourceId: string, targetId: string) {
  const nextData = source.filter((item: any) => item.id !== sourceId);
  const dragItem: any = source.find((item: any) => item.id === sourceId);
  const index = nextData.findIndex((item: any) => item.id === targetId);

  nextData.splice(index, 0, dragItem);
  return nextData;
}

export default function DraggableTable(props: any) {
  const [allData, setAllData] = useState(props.data);
  const [data, setData] = useState<any[]>([]);

  const [columns, setColumns] = useState(props.columns);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const rowKey = props.rowKey || "id";

  useEffect(() => {
    setAllData(props.data);
    const newData = allData.filter((v: object, i: number) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
    setData([...newData]);
  }, [props, allData, limit, page]);

  const handleDragColumn = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    setColumns(sort(columns, sourceId, targetId));
  };

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const handleDragRow = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    let sortedData = sort(data, sourceId, targetId);
    setAllData((data: Array<object>) => {
      let start = limit * (page - 1);
      let d = data;
      d.splice(start, start + limit, ...sortedData);

      return [...d];
    });
  };

  const [expandedRowKeys, setExpandedRowKeys]: [any, any] = useState([]);
  const handleExpanded = (rowData: any, dataKey: any) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key: any) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Table
          onRowClick={(rowData, e: any) => {
            if (props.hasPage && e.target.id !== "disableClick") {
              props.handleRowClick(rowData);
            }
          }}
          wordWrap="break-word"
          virtualized
          autoHeight
          data={data}
          bordered
          rowExpandedHeight={200}
          rowKey={rowKey}
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={props.renderRowExpanded}
          renderRow={(children, rowData) => {
            return rowData ? (
              <Row
                key={rowData.id}
                rowData={rowData}
                id={rowData.id}
                onDrag={handleDragRow}
              >
                {children}
              </Row>
            ) : (
              children
            );
          }}
        >
          {columns.map((column: any) => (
            <Column
              width={column.width}
              minWidth={column.minWidth}
              align={column.align}
              key={column.id}
              flexGrow={column.flexGrow}
              fixed={column.fixed}
            >
              <DraggableHeaderCell onDrag={handleDragColumn} id={column.id}>
                {column.name}
              </DraggableHeaderCell>
              {column.id === "actions" ? (
                <TableAction
                  removeItem={(id: number) => props.removeItem(id)}
                  editItem={(rowDataID: string) => props.editItem(rowDataID)}
                />
              ) : column.id === "expand" ? (
                <ExpandCell
                  dataKey="expand"
                  expandedRowKeys={expandedRowKeys}
                  onChange={handleExpanded}
                />
              ) : (
                <TableCell keyData={column.id} />
              )}
            </Column>
          ))}
        </Table>
        <div style={{ padding: 16 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={allData.length}
            limit={limit}
            limitOptions={[10, 25, 100]}
            onChangeLimit={handleChangeLimit}
            activePage={page}
            onChangePage={setPage}
          />
        </div>
      </div>
    </DndProvider>
  );
}
