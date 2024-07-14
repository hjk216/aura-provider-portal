"use client"

import { useSearchParams } from "next/navigation"

import BackButton from "@/components/BackButton"
import Medications from "@/components/patient/Medications"
import Temperatures from "@/components/patient/Temperatures"

export default function PatientPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams()

  const id = searchParams.get("id") || ""
  const name = searchParams.get("name")
  const first_name = searchParams.get("first_name")
  const age = searchParams.get("age")

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="mb-4"><BackButton /></div>

      {/* Patient Information Box */}
      <div className="border-[1px] border-black shadow-xl p-2">
        <p className="font-bold">Patient Information</p>
        <p>
          <span className="font-bold">Name: </span>
          {name}, {first_name}
        </p>
        <p>
          <span className="font-bold">Age: </span>
          {age}
        </p>
      </div>

      <Temperatures patient_id={id} />

      <Medications patient_id={id} />

    </div>
  )
}
