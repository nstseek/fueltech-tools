import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Box from '@mui/material/Box'

interface DataPoint {
  x: number
  y: number
}

interface LineChartProps {
  data: DataPoint[]
  xLabel: string
  yLabel: string
  color?: string
}

export default function LineChart({ data, xLabel, yLabel, color = '#fe0000' }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const container = containerRef.current
    if (!svg || !container || data.length === 0) return

    const draw = () => {
      const margin = { top: 20, right: 30, bottom: 50, left: 60 }
      const totalWidth = container.clientWidth
      const totalHeight = 300
      const width = totalWidth - margin.left - margin.right
      const height = totalHeight - margin.top - margin.bottom

      d3.select(svg).selectAll('*').remove()

      const root = d3
        .select(svg)
        .attr('width', totalWidth)
        .attr('height', totalHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.x) as [number, number])
        .range([0, width])

      const [yMin, yMax] = d3.extent(data, (d) => d.y) as [number, number]
      const yPad = (yMax - yMin) * 0.1 || 1
      const yScale = d3
        .scaleLinear()
        .domain([yMin - yPad, yMax + yPad])
        .nice()
        .range([height, 0])

      // Grid lines
      root
        .append('g')
        .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(() => ''))
        .attr('transform', `translate(0,${height})`)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('line').attr('stroke', '#2a2d3a').attr('stroke-dasharray', '3,3'))

      root
        .append('g')
        .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(() => ''))
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('line').attr('stroke', '#2a2d3a').attr('stroke-dasharray', '3,3'))

      // Axes
      root
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(Math.min(data.length, 10)))
        .call((g) => g.select('.domain').attr('stroke', '#555'))
        .call((g) => g.selectAll('text').attr('fill', '#999').attr('font-size', '11px'))
        .call((g) => g.selectAll('.tick line').attr('stroke', '#555'))

      root
        .append('g')
        .call(d3.axisLeft(yScale).ticks(6))
        .call((g) => g.select('.domain').attr('stroke', '#555'))
        .call((g) => g.selectAll('text').attr('fill', '#999').attr('font-size', '11px'))
        .call((g) => g.selectAll('.tick line').attr('stroke', '#555'))

      // Axis labels
      root
        .append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 8)
        .attr('text-anchor', 'middle')
        .attr('fill', '#aaa')
        .attr('font-size', '12px')
        .text(xLabel)

      root
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 16)
        .attr('text-anchor', 'middle')
        .attr('fill', '#aaa')
        .attr('font-size', '12px')
        .text(yLabel)

      // Area fill
      const area = d3
        .area<DataPoint>()
        .x((d) => xScale(d.x))
        .y0(height)
        .y1((d) => yScale(d.y))

      root
        .append('path')
        .datum(data)
        .attr('fill', color)
        .attr('fill-opacity', 0.08)
        .attr('d', area)

      // Line
      const line = d3
        .line<DataPoint>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))

      root
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('d', line)

      // Dots on data points (only if few enough to display)
      if (data.length <= 50) {
        root
          .selectAll('circle')
          .data(data)
          .join('circle')
          .attr('cx', (d) => xScale(d.x))
          .attr('cy', (d) => yScale(d.y))
          .attr('r', 3)
          .attr('fill', color)
      }
    }

    draw()

    const observer = new ResizeObserver(draw)
    observer.observe(container)
    return () => observer.disconnect()
  }, [data, xLabel, yLabel, color])

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      <svg ref={svgRef} style={{ display: 'block' }} />
    </Box>
  )
}
