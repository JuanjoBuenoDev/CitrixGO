<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import 'chartjs-adapter-date-fns';
  
    Chart.register(...registerables);
  
    export let userCount: number;
  
    let canvas: HTMLCanvasElement;
    let chart: Chart;
    let updateInterval: ReturnType<typeof setInterval>;
  
    type DataPoint = { x: number; y: number };
    let dataPoints: DataPoint[] = [];
  
    const WINDOW_DURATION_MS = 60 * 60 * 1000; // 1 hora
    const TICK_INTERVAL_MS = 10 * 60 * 1000; // 10 minutos
  
    // Función para calcular el máximo dinámico del eje Y
    function calculateYMax(points: DataPoint[]): number {
      if (points.length === 0) return 100;
      
      const maxValue = Math.max(...points.map(p => p.y));
      // Redondear hacia arriba al próximo múltiplo de 10, con un mínimo de 100
      const roundedMax = Math.max(100, Math.ceil(maxValue / 10) * 10);
      // Agregar un poco de padding (20% más)
      return Math.ceil(roundedMax * 1.2 / 10) * 10;
    }
  
    // Función para generar los ticks del eje X cada 10 minutos
    function generateXTicks(minTime: number, maxTime: number): number[] {
      const ticks = [];
      // Redondear el tiempo mínimo al próximo múltiplo de 10 minutos
      const startTime = Math.ceil(minTime / TICK_INTERVAL_MS) * TICK_INTERVAL_MS;
      
      for (let time = startTime; time <= maxTime; time += TICK_INTERVAL_MS) {
        ticks.push(time);
      }
      return ticks;
    }
  
    function updateChart() {
      if (!chart) return;
  
      const now = Date.now();
      
      // Agregar nuevo punto solo si el userCount ha cambiado o es el primer punto
      if (dataPoints.length === 0 || userCount !== dataPoints[dataPoints.length - 1]?.y) {
        dataPoints.push({ x: now, y: userCount });
      }
  
      // Filtrar puntos fuera de la ventana de tiempo
      dataPoints = dataPoints.filter(p => p.x >= now - WINDOW_DURATION_MS);
  
      // Actualizar datos del chart
      chart.data.datasets[0].data = dataPoints;
  
      // Calcular rango dinámico para eje Y
      const yMax = calculateYMax(dataPoints);
      
      // Actualizar escalas
      if (chart.options.scales?.x) {
        chart.options.scales.x.min = now - WINDOW_DURATION_MS;
        chart.options.scales.x.max = now;
      }
      
      if (chart.options.scales?.y) {
        chart.options.scales.y.min = 0;
        chart.options.scales.y.max = yMax;
        // Actualizar stepSize de manera segura
        (chart.options.scales.y as any).ticks = {
          ...(chart.options.scales.y.ticks || {}),
          stepSize: Math.max(10, Math.ceil(yMax / 10))
        };
      }
  
      chart.update('none'); // 'none' evita animaciones para mejor performance
    }
  
    // Reactivo: actualizar cuando cambie userCount
    $: if (chart && userCount !== undefined) {
      updateChart();
    }
  
    onMount(() => {
      const now = Date.now();
      
      chart = new Chart(canvas, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Usuarios activos',
            data: [],
            borderColor: '#0064c8',
            backgroundColor: 'rgba(0, 100, 200, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 5,
            borderWidth: 2,
            pointBackgroundColor: '#0064c8',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: {
            intersect: false,
            mode: 'index',
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute',
                displayFormats: {
                  minute: 'HH:mm',
                },
                tooltipFormat: 'HH:mm:ss',
              },
              min: now - WINDOW_DURATION_MS,
              max: now,
              ticks: {
                maxRotation: 0,
                color: '#374151',
                font: {
                  size: 11,
                },
                callback: function(value, index, ticks) {
                  const date = new Date(value as number);
                  return date.getMinutes() % 10 === 0 ? date.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  }) : '';
                }
              },
              grid: {
                color: '#e5e7eb',
                lineWidth: 1,
              },
              border: {
                color: '#d1d5db',
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Usuarios',
                color: '#374151',
                font: {
                  size: 12,
                  weight: 'bold',
                }
              },
              min: 0,
              max: 100,
              ticks: {
                stepSize: 10,
                color: '#374151',
                font: {
                  size: 11,
                },
                callback: function(value) {
                  return Number(value).toLocaleString();
                }
              },
              grid: {
                color: '#e5e7eb',
                lineWidth: 1,
              },
              border: {
                color: '#d1d5db',
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              titleColor: '#f9fafb',
              bodyColor: '#f9fafb',
              borderColor: '#374151',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: false,
              callbacks: {
                title: function(context) {
                  const date = new Date(context[0].parsed.x);
                  return date.toLocaleString('es-ES');
                },
                label: function(context) {
                  return `Usuarios: ${context.parsed.y}`;
                }
              }
            }
          },
          elements: {
            point: {
              hoverBorderWidth: 2,
            }
          }
        }
      });
  
      // Actualizar la gráfica cada 30 segundos para mantener la ventana deslizante
      updateInterval = setInterval(() => {
        if (chart) {
          const now = Date.now();
          // Filtrar puntos antiguos
          dataPoints = dataPoints.filter(p => p.x >= now - WINDOW_DURATION_MS);
          
          // Actualizar rango de tiempo de manera segura
          if (chart.options.scales?.x) {
            chart.options.scales.x.min = now - WINDOW_DURATION_MS;
            chart.options.scales.x.max = now;
          }
          
          chart.update('none');
        }
      }, 30000);
  
      // Agregar punto inicial si tenemos userCount
      if (userCount !== undefined) {
        updateChart();
      }
    });
  
    onDestroy(() => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
      if (chart) {
        chart.destroy();
      }
    });
  </script>
  
  <div class="w-full h-64 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
    <canvas bind:this={canvas} class="w-full h-full"></canvas>
  </div>