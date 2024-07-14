"use client"

import { useState, useEffect } from "react"

import MedicationAdd from "./MedicationAdd"

import { Medication } from "../../../types/types"
import { END_POINTS } from "../../../constants/endpoints"

export default function Medications({ patient_id }: { patient_id: string }) {
  const [medications, setMedications] = useState<Medication[]>([])

  const handleAddMedication = (new_medication: Medication) => {
    setMedications((prevItems) => [new_medication, ...prevItems]);
  }

  async function deleteMedication(medication_id: string) {
    const response = await fetch(`${END_POINTS.MEDICATIONS}?medication_id=${medication_id}`, {
      method: "DELETE"
    })

    if (response.ok) {
      setMedications(prevObjects => prevObjects.filter(obj => obj.id !== medication_id))
    }
  }

  useEffect(() => {
    fetch(`${END_POINTS.MEDICATIONS}?patient_id=${patient_id}`)
        .then((res) => res.json())
        .then((data) => data?.data)
        .then((medications: Medication[]) => {
          setMedications(medications)
        })
  }, [patient_id])

  return (
    <div className="border-[1px] border-black shadow-xl p-2">
      <p className="font-bold">Medications</p>

      <MedicationAdd patient_id={patient_id} onMedicationChange={handleAddMedication} />

      <div>
        {medications.map((medication, key) => (
          <div key={key} className="border-[1px] border-black my-2 flex">
            <div className="w-4/5 p-1">
              <p><span className="font-bold">Name: </span>{medication.name}</p>
              <p><span className="font-bold">Dosage: </span>{medication.dosage}</p>
              <p><span className="font-bold">Start Date: </span>{medication.start_date || "Unknown"}</p>
              <p><span className="font-bold">End Date: </span>{medication.end_date || "Unknown"}</p>
            </div>
            <div
              className="bg-red-700 text-white w-1/5 place-items-center justify-center flex hover:cursor-pointer"
              onClick={() => deleteMedication(medication.id)}
            >
              <p>Delete</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
