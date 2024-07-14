"use client"

import { useState } from "react"

import { get_current_date } from "../../../utils/get_current_date"

import { END_POINTS } from "../../../constants/endpoints"

export default function TemperatureAdd(
  { patient_id, onRefreshChange }:
  { patient_id: string, onRefreshChange: any }
) {
  const [temperature, setTemperature] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  async function submitTemperature() {
    setError("")
    setSuccess("")

    if (!temperature) {
      return setError("Missing temperature")
    }

    const response = await fetch(END_POINTS.TEMPERATURES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temperature: temperature,
        date: get_current_date(),
        patient: patient_id
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data[Object.keys(data)[0]])
    } else {
      setTemperature("")
      setSuccess("Success!")
      onRefreshChange(data)
    }
  }

  return (
    <div className="p-2">
      <p className="font-bold">Add Temperature</p>
      <div className="flex">
        <input
          className="border-[1px] border-black p-1 mr-1 w-32"
          placeholder="00.0"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <p>℃</p>
      </div>
      <button className="bg-gray-400 p-1 px-4 mt-2" onClick={submitTemperature}>Submit</button>
      <p className="text-red-600">{error}</p>
      <p className="text-green-600">{success}</p>
    </div>
  )
}
