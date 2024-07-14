export interface EndPoints {
  PATIENTS: string,
  TEMPERATURES: string,
  MEDICATIONS: string
}

export const END_POINTS: EndPoints = {
  PATIENTS: '/api/patients/',
  TEMPERATURES: '/api/temperatures/',
  MEDICATIONS: '/api/medications/'
}
