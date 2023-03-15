import { FlightDiaryEntry } from "../types";
import TableRow from "./TableRow";

const EntriesList = ({diaries}: {diaries: FlightDiaryEntry[]}) => {
    return ( 
        <div>
            <h3>Entries</h3>
            <table>
            <tbody>
            <tr>
                <td>date</td>
                <td>weather</td>
                <td>visibility</td>
            </tr>
            {diaries.map(diary => {
                return(
                <TableRow key={diary.id} diary={diary} />
                )
            })}
            </tbody>
            </table>
        </div>
    )
}
export default EntriesList;