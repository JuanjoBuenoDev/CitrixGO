<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';

  export let labels: string[] = [];
  export let data: number[] = [];
  export let title: string = '';
  export let horizontal: boolean = false;

  let canvas: HTMLCanvasElement;
  let chart: Chart | null = null;

  onMount(() => {
    chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: title,
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: !!title,
            text: title,
            font: { size: 16 }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              autoSkip: false
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });

  // Actualiza el gráfico si cambian los datos o etiquetas
  $: if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = title;
    chart.options!.indexAxis = horizontal ? 'y' : 'x';
    chart.update();
  }

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<canvas bind:this={canvas} class="w-full max-w-full" style="max-height: 400px;"></canvas>

<style>
  canvas {
    user-select: none;
  }
</style>
