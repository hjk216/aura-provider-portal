export async function GET() {
  const res = await fetch(`${process.env.API_ENDPOINT}/patients/`)

  const data = await res.json()

  return Response.json({ data })
}
