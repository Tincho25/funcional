document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:5000/api/producto/')
        .then(response => response.json())
        .then(data => {
            if (data.total_hits > 0) {
                const productos = data.search_result;
                const productosCaros = productos.sort((a, b) => b.precio - a.precio).slice(0, 10);
                
                const nombres = productosCaros.map(producto => producto.nombre);
                const precios = productosCaros.map(producto => producto.precio);
                let preciosEnPesos = precios.slice(); // Copia de los precios originales
                let mostrandoEnPesos = true;
                const conversionRate = 1230; // 1 USD = 1230 ARS

                const ctx = document.getElementById('productosChart').getContext('2d');
                const productosChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: nombres,
                        datasets: [{
                            label: 'Precio en dolares',
                            data: precios,
                            backgroundColor: 'rgba(255, 165, 0, 0.2)',  // Naranja con opacidad
                            borderColor: 'rgba(255, 165, 0, 1)',  // Naranja sólido
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                ticks: {
                                    font: {
                                        size: 17, // Tamaño de fuente para los nombres de los productos
                                        weight: 'bold' // Negrita para las letras
                                    },
                                    color: '#000' // Color negro para las letras
                                }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    font: {
                                        size: 14, // Tamaño de fuente para los números del eje y
                                        weight: 'bold' // Negrita para los números
                                    },
                                    color: '#000' // Color negro para los números
                                }
                            },
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        size: 17, // Tamaño de fuente para la leyenda
                                        weight: 'bold' // Negrita para la leyenda
                                    },
                                    color: '#000' // Color negro para la leyenda
                                },
                                onClick: (e, legendItem) => {
                                    const dataset = productosChart.data.datasets[legendItem.datasetIndex];
                                    if (mostrandoEnPesos) {
                                        // Convertir a dólares
                                        dataset.data = preciosEnPesos.map(precio => (precio / conversionRate).toFixed(2));
                                        dataset.label = 'Precio en pesos';
                                    } else {
                                        // Restaurar a pesos
                                        dataset.data = preciosEnPesos;
                                        dataset.label = 'Precio en dolares';
                                    }
                                    mostrandoEnPesos = !mostrandoEnPesos;
                                    productosChart.update();
                                }
                            }
                        }
                    }
                });
            } else {
                alert("No se encontraron productos.");
            }
        })
        .catch(error => console.error('Error:', error));
});
