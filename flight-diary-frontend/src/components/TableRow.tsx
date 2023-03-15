import { FlightDiaryEntry } from "../types";
import TableCell from "./TableCell";

const TableRow = ({diary}: {diary: FlightDiaryEntry}) => {
 return (
    <tr>
            <TableCell tableData={diary.date} />
            <TableCell tableData={diary.weather} />
            <TableCell tableData={diary.visibility} />
          </tr>
 )
}

export default TableRow;