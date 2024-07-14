export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const patient_id = searchParams.get("patient_id")

  const res = await fetch(`${process.env.API_ENDPOINT}/medications?patient_id=${patient_id}`)

  const data = await res.json()

  return Response.json({ data })
}

export async function POST(request: Request) {
  const { name, dosage, start_date, end_date, patient } = await request.json()

  const res = await fetch(`${process.env.API_ENDPOINT}/medications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      dosage: dosage,
      start_date: start_date,
      end_date: end_date,
      patient: patient
    })
  })

  const data = await res.json()

  return Response.json(data, { status: res.status })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)

  const medication_id = searchParams.get("medication_id")

  const res = await fetch(`${process.env.API_ENDPOINT}/medications/${medication_id}`, {
    method: "DELETE"
  })

  if (res.status == 204) {
    return Response.json({ status: 200 })
  }
  
  return Response.json({ status: res.status })
}
