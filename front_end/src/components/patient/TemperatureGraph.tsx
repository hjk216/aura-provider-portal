"use client"

import { useState, useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

import { Temperature } from "../../../types/types"

Chart.register(...registerables)

export default function TemperatureGraph({ temperatures }: { temperatures: Temperature[] }) {
  /*
  Chart displays the last 3 months of body temperature data by default.

  Not all body temperature information may be displayed for the given ranges. The
  more data there is the less likely it will all be displayed.
  */
  const [filter, setFilter] = useState<number>(3)

  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!chartRef.current || !temperatures) return

    const getFilteredData = (months: number) => {
      const now = new Date()
      const cutoffDate = new Date()
      cutoffDate.setMonth(now.getMonth() - months)

      return temperatures.filter(item => new Date(item.date) >= cutoffDate)
    }

    const ctx = chartRef.current.getContext("2d")
    const filteredData = getFilteredData(filter)

    if (ctx) {
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: filteredData.map(temperature => temperature.date),
          datasets: [{
            label: "Body Temperatures",
            data: filteredData.map(temperature => temperature.temperature),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
          }],
        },
        options: {
          responsive: true
        }
      })

      return () => {
        myChart.destroy()
      }
    }
  }, [temperatures, filter])

  return (
    <div className="p-2">
      <p className="font-bold">Body Temperatures</p>
      <div className="flex place-items-center justify-center">
        <p className="font-bold mr-2">Month Scale</p>
        <button className="bg-gray-500 p-1 px-2 m-1" onClick={() => setFilter(1)}>1</button>
        <button className="bg-gray-500 p-1 px-2 m-1" onClick={() => setFilter(3)}>3</button>
        <button className="bg-gray-500 p-1 px-2 m-1" onClick={() => setFilter(6)}>6</button>
      </div>
      <canvas ref={chartRef} />
    </div>
  )
}
