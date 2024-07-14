"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import { Patient } from "../../types/types"
import { END_POINTS } from "../../constants/endpoints"

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    fetch(END_POINTS.PATIENTS)
      .then((res) => res.json())
      .then((data) => data?.data)
      .then((patients: Patient[]) => {
        setPatients(patients)
      })
  }, [])

  return (
    <div>
      {patients.map((patient, key) => (
        <Link
          key={key}
          href={{
            pathname: `/patient/${patient.id}`,
            query: {
              id: patient.id,
              first_name: patient.first_name,
              name: patient.name,
              age: patient.age
            }
          }}
        >
          <div className="my-8 border-[1px] border-black shadow-xl p-2 hover:cursor-pointer hover:shadow-2xl">
            <p>
              <span className="font-bold">Patient: </span>
              {patient.name}, {patient.first_name}
            </p>
            <p>
              <span className="font-bold">Age: </span>
              {patient.age}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
