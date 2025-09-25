import { useState, useEffect } from 'react'

const BudgetCalculator = () => {
  const [budget, setBudget] = useState(2500)
  const [breakdown, setBreakdown] = useState({
    flights: 800,
    hotels: 1200,
    activities: 400,
    other: 100
  })

  useEffect(() => {
    // Calculate breakdown (typical distribution)
    const flights = Math.round(budget * 0.32)
    const hotels = Math.round(budget * 0.48)
    const activities = Math.round(budget * 0.16)
    const other = Math.round(budget * 0.04)
    
    setBreakdown({ flights, hotels, activities, other })
  }, [budget])

  const handleBudgetChange = (e) => {
    setBudget(parseInt(e.target.value))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Trip Budget</label>
        <input 
          type="range" 
          min="500" 
          max="10000" 
          value={budget} 
          onChange={handleBudgetChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>$500</span>
          <span className="font-semibold">${budget.toLocaleString()}</span>
          <span>$10,000</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="font-semibold text-blue-800">Flights</div>
          <div className="text-blue-600">${breakdown.flights.toLocaleString()}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="font-semibold text-green-800">Hotels</div>
          <div className="text-green-600">${breakdown.hotels.toLocaleString()}</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="font-semibold text-purple-800">Activities</div>
          <div className="text-purple-600">${breakdown.activities.toLocaleString()}</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="font-semibold text-yellow-800">Other</div>
          <div className="text-yellow-600">${breakdown.other.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export default BudgetCalculator