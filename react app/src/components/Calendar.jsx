import { useState, useEffect } from 'react'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarDays, setCalendarDays] = useState([])

  useEffect(() => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    let days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    setCalendarDays(days)
  }, [])

  const handleDateClick = (day) => {
    if (!day) return
    
    const today = new Date()
    const selectedDate = new Date(today.getFullYear(), today.getMonth(), day)
    const dateString = selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    setSelectedDate(dateString)
    
    // Show alert with selected date
    alert(`📅 Date Selected\n\nYou selected ${dateString}. This would integrate with the voice assistant to help plan your trip for this date!`)
  }

  const today = new Date().getDate()

  return (
    <div className="text-center">
      <p className="text-gray-600 mb-4">Select your travel dates</p>
      <div className="grid grid-cols-7 gap-1 text-sm">
        <div className="font-semibold p-2">S</div>
        <div className="font-semibold p-2">M</div>
        <div className="font-semibold p-2">T</div>
        <div className="font-semibold p-2">W</div>
        <div className="font-semibold p-2">T</div>
        <div className="font-semibold p-2">F</div>
        <div className="font-semibold p-2">S</div>
        
        {calendarDays.map((day, index) => (
          <div key={index}>
            {day ? (
              <div 
                className={`p-2 text-center cursor-pointer rounded transition-colors ${
                  day === today 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            ) : (
              <div className="p-2"></div>
            )}
          </div>
        ))}
      </div>
      
      {selectedDate && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">Selected: {selectedDate}</p>
        </div>
      )}
    </div>
  )
}

export default Calendar