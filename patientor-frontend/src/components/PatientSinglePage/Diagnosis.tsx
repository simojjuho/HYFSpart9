import { Diagnosis } from "../../types";

const DiagnosisItem = ({code, diagnosis}: {code: string, diagnosis: Diagnosis | undefined}) => {
    return (
        <li>{code}: {diagnosis?.name}</li>
    )
}

export default DiagnosisItem;