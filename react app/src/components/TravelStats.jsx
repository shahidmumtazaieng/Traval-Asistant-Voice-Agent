import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const TravelStats = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      
      const option = {
        title: {
          text: 'Popular Destinations',
          left: 'center',
          textStyle: {
            color: '#2d3748',
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: 'Destinations',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 35, name: 'Europe', itemStyle: { color: '#ff6b6b' } },
              { value: 28, name: 'Asia', itemStyle: { color: '#4ecdc4' } },
              { value: 22, name: 'Americas', itemStyle: { color: '#45b7d1' } },
              { value: 15, name: 'Others', itemStyle: { color: '#feca57' } }
            ]
          }
        ]
      }

      chart.setOption(option)

      const handleResize = () => chart.resize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        chart.dispose()
      }
    }
  }, [])

  return <div ref={chartRef} className="w-full h-96"></div>
}

export default TravelStats