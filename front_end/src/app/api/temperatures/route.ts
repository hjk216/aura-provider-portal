export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const patient_id = searchParams.get("patient_id")

  const res = await fetch(`${process.env.API_ENDPOINT}/temperatures?patient_id=${patient_id}`)

  const data = await res.json()

  return Response.json({ data })
}

export async function POST(request: Request) {
  const { temperature, date, patient } = await request.json()

  const res = await fetch(`${process.env.API_ENDPOINT}/temperatures/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature: temperature,
      date: date,
      patient: patient
    })
  })
    
  const data = await res.json()

  return Response.json(data, { status: res.status })
}
