"use client"

import { useState } from "react"

import { END_POINTS } from "../../../constants/endpoints"

export default function MedicationsAdd(
  { patient_id, onMedicationChange }:
  { patient_id: string, onMedicationChange: any }
) {
  const [name, setName] = useState<string>("")
  const [dosage, setDosage] = useState("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  async function submitMedication() {
    setError("")
    setSuccess("")

    if (!name || !dosage) {
      return setError("Missing required field")
    }

    const response = await fetch(END_POINTS.MEDICATIONS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        dosage: dosage,
        start_date: startDate || null,
        end_date: endDate || null,
        patient: patient_id
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data[Object.keys(data)[0]])
    } else {
      setName("")
      setDosage("")
      setStartDate("")
      setEndDate("")
      setSuccess("Success!")
      onMedicationChange(data)
    }
  }

  return (
    <div>
      <div className="border-[1px] border-black my-2 flex">
        <div className="w-4/5 p-1 grid gap-1">
          <p className="font-bold">Add Medication</p>
          <p>
            <span className="font-bold">Name: </span>
            <input
              className="border-[1px] border-gray-500 p-1"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>
            <span className="font-bold">Dosage: </span>
            <input
              className="border-[1px] border-gray-500 p-1"
              placeholder="00mg"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </p>
          <p>
            <span className="font-bold">Start Date: </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </p>
          <p>
            <span className="font-bold">End Date: </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </p>
          <p className="text-red-600">{error}</p>
          <p className="text-green-600">{success}</p>
        </div>
        <div
          className="bg-green-700 text-white w-1/5 place-items-center justify-center flex hover:cursor-pointer"
          onClick={submitMedication}
        >
          <p>Submit</p>
        </div>
      </div>
    </div>
  )
}
