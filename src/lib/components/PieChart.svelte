<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Chart, registerables } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';

  
    Chart.register(...registerables);
  
    export let title: string = 'Gráfico de torta';
    export let labels: string[] = [];
    export let data: number[] = [];
    export let backgroundColors: string[] = [];
  
    let canvas: HTMLCanvasElement | undefined;
    let chart: Chart | undefined;
  
    // Colores por defecto si no se pasan
    const defaultColors = [
      '#4F46E5', '#16A34A', '#F59E0B', '#EF4444',
      '#0EA5E9', '#8B5CF6', '#F97316', '#10B981'
    ];
  
    onMount(() => {
      if (!canvas) return;
  
      const config: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: title,
            data,
            backgroundColor: backgroundColors.length ? backgroundColors : defaultColors.slice(0, data.length),
            borderColor: '#ffffff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#374151',
                font: { size: 12 }
              }
            },
            title: {
              display: true,
              text: title,
              color: '#111827',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.parsed;
                  return `${context.label}: ${value}`;
                }
              }
            }
          }
        }
      };
  
      chart = new Chart(canvas, config);
    });
  
    onDestroy(() => {
      chart?.destroy();
    });
  
    // Reactivo si cambian los datos
    $: if (chart && data.length === labels.length) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.data.datasets[0].backgroundColor = backgroundColors.length ? backgroundColors : defaultColors.slice(0, data.length);
      chart.update();
    }
  </script>
  
  <div class="w-full max-w-md p-4 bg-white rounded-lg shadow border border-gray-200">
    <canvas bind:this={canvas}></canvas>
  </div>
  