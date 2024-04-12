import { series } from "./data.js";
const seriesTable = document.getElementById('series-table');
const seasonsAverage = document.getElementById('seasons-average');
const serieInfo = document.getElementById('serie-info');
function calculateSeasonsAverage() {
    const totalSeasons = series.reduce((acc, serie) => acc + serie.seasons, 0);
    return totalSeasons / series.length;
}
function filterSeriesById(id) {
    const serie = series.find(serie => serie.id === id);
    return serie ? serie : null;
}
function renderSerieInformation(serie) {
    serieInfo.innerHTML = `
    <div class="card" style="max-width: 25rem;">
      <img class="card-img-top" src="${serie.image}" alt="${serie.name}" width="100%"/>
      <div class="card-body">
        <h3 class="card-title">${serie.name}</h3>
        <p class="card-text">${serie.description}</p>
        <p>Verla ahora en <a href="${serie.url}">${serie.channel}</a></p>
      </div>
    </div>
  `;
}
function renderSeriesTable() {
    series.forEach(serie => {
        const row = document.createElement('tr');
        row.setAttribute('id', 'serie-row');
        row.innerHTML = `
      <td><b>${serie.id}</b></td>
      <td>${serie.name}</td>
      <td>${serie.channel}</td>
      <td>${serie.seasons}</td>
    `;
        seriesTable.appendChild(row);
    });
    const averageSeasons = calculateSeasonsAverage();
    seasonsAverage.innerHTML = `${averageSeasons}`;
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ok');
    renderSeriesTable();
    seriesTable.childNodes.forEach((node) => {
        node.addEventListener('click', (event) => {
            var _a, _b;
            const row = event.target;
            const serieId = parseInt((_b = (_a = row.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.textContent);
            const serie = filterSeriesById(serieId);
            if (serie) {
                renderSerieInformation(serie);
            }
        });
    });
});
