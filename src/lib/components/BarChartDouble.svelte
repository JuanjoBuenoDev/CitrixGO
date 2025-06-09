<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { type Readable } from 'svelte/store';
  import Chart from 'chart.js/auto';

  export let dataStore: Readable<{ name: string; vdaCount: number; userCount: number }[]>;
  export let title = 'Distribución de Uso';

  let canvas: HTMLCanvasElement;
  let chart: Chart;

  let unsubscribe: () => void;

  onMount(() => {
    chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Número de VDAs',
            data: [],
            backgroundColor: 'rgba(79, 129, 189, 0.8)',
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          },
          {
            label: 'Número de Usuarios',
            data: [],
            backgroundColor: 'rgba(155, 187, 89, 0.8)',
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },  // <-- Leyenda debajo de la gráfica
          title: {
            display: true,
            text: title,
            font: { size: 18 }
          }
        },
        scales: {
          x: { stacked: false },
          y: { beginAtZero: true }
        },
        interaction: { mode: 'index', intersect: false }
      }
    });

    unsubscribe = dataStore.subscribe((data) => {
      const labels = data.map((obj) => obj.name);
      const vdaData = data.map((obj) => obj.vdaCount);
      const userData = data.map((obj) => obj.userCount);

      chart.data.labels = labels;
      chart.data.datasets[0].data = vdaData;
      chart.data.datasets[1].data = userData;
      chart.update();
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
    if (chart) chart.destroy();
  });
</script>

<div class="max-w-full overflow-x-auto p-4 bg-white rounded-lg shadow-md">
  <canvas bind:this={canvas}></canvas>
</div>
