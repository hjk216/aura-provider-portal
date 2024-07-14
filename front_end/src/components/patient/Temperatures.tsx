"use client"

import { useState, useEffect } from "react"

import TemperatureAdd from "./TemperatureAdd"
import TemperatureGraph from "./TemperatureGraph"

import { Temperature } from "../../../types/types"
import { END_POINTS } from "../../../constants/endpoints"

export default function Temperatures({ patient_id }: { patient_id: string }) {
  const [temperatures, setTemperatures] = useState<Temperature[]>([])

  const handleAddTemperature = (new_medication: Temperature) => {
    setTemperatures((prevItems) => [...prevItems, new_medication]);
  }

  useEffect(() => {
    fetch(`${END_POINTS.TEMPERATURES}?patient_id=${patient_id}`)
      .then((res) => res.json())
      .then((data) => data?.data)
      .then((temperatures: Temperature[]) => {
        setTemperatures(temperatures)
      })
  }, [patient_id])

  return (
    <div className="grid grid-cols-3 gap-2 min-h-32">
      <div className="col-span-3 md:col-span-1 border-[1px] border-black shadow-xl p-2">
        <TemperatureAdd patient_id={patient_id} onRefreshChange={handleAddTemperature} />
      </div>
      <div className="col-span-3 md:col-span-2 border-[1px] border-black shadow-xl p-2">
        <TemperatureGraph temperatures={temperatures} />
      </div>
    </div>
  )
}
