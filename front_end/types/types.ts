export interface Patient {
  id: string,
  name: string,
  first_name: string,
  age: number
}

export interface Temperature {
  id: string,
  date: string,
  temperature: string
}

export interface Medication {
  id: string,
  name: string,
  dosage: number,
  start_date: string,
  end_date: string,
}
