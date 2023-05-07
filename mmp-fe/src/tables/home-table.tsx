import {MintButton} from "../button/mint-button";

interface TableProps {
  rows: number;
  columns: number;
}

export function HomeTable(props: TableProps) {
  const { rows, columns } = props;

  const renderTable = () => {
    const tableRows = [];
    for (let i = 0; i < rows; i++) {
      const tableCells = [];
      for (let j = 0; j < columns; j++) {
        tableCells.push(
          <td key={`${i}-${j}`}>
            <MintButton row={i} col={j} />
          </td>
        );
      }
      tableRows.push(<tr key={i}>{tableCells}</tr>);
    }
    return (
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    );
  };

  return <div>{renderTable()}</div>;
}