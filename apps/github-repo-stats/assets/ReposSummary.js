window["ReposSummary"] = (() => {
  let chart; //ChartJS instance

  let daysAgo = 7;

  const daysAgoOptions = [7, 14, 30, 356];

  const showDropdown = () => {
    return `<label class="d-flex justify-content-between" style="width: 10rem">
      <strong>Days Ago:</strong>
      <div>
        <select id="daysAgo" class="form-control" value="${daysAgo}" onchange="ReposSummary.set(this.value)">
        ${daysAgoOptions.map(option => `<option${daysAgo === option ? " selected" : ""}>${option}</option>`)}
        </select>
      </div>
    </label>`
  };

  const getCountAfterDate = (d, stats, attr) => (
    (stats[attr] || []).filter(item => new Date(item.timestamp) > d).reduce((total, item) => total += item.count, 0)
  );

  const showTable = () => {
    const repoStats = window["app"]["getStats"]();
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return (
      `<table class="table">
        <thead><tr>${["Repo", "Views", "Clones"].map(a => `<th>${a}</th>`).join("")}</tr></thead>
        <tbody>
          ${repoStats.map(stats => {
            const viewCount = getCountAfterDate(d, stats, "views");
            const cloneCount = getCountAfterDate(d, stats, "clones");
            if (viewCount === 0 && cloneCount === 0) return "";
            return `<tr>${[getRepoAnchor(stats), viewCount, cloneCount].map(a => `<td>${a}</td>`).join("")}</tr>`;
          }).join("")}
        </tbody>
      </table>`
    );
  };

  const getDaysByDaysAgo = () => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const days = [];
    const dateDay = new Date();
    dateDay.setHours(0);
    dateDay.setMinutes(0);
    dateDay.setMilliseconds(0);
    while (dateDay > d) {
      days.unshift(new Date(dateDay.getTime()));
      dateDay.setDate(dateDay.getDate() - 1);
    }
    return days;
  };
  const getChartData = (days, attr) => {
    const repoStats = window["app"]["getStats"]();
    const dayCounts = days.map(d => {
      const dateStr = d.toISOString().split("T")[0]; //i.e. "2022-05-22"
      return repoStats.reduce((total, repo) => {
        total += (repo[attr] || []).reduce((prev, curr) => {
          const tsDay = curr.timestamp.split("T")[0];
          if (tsDay === dateStr) prev += curr.count;
          return prev;
        }, 0)
        return total;
      }, 0);
    })
    return dayCounts;
  }
  const showGraph = () => {
    //this is needed to recreate the chart
    if (chart) chart.destroy();

    const myChart = document.getElementById("myChart");
    const days = getDaysByDaysAgo();
    const labels = days.map(day => day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    const data = {
      labels,
      datasets: [
        { label: `Views`, data: getChartData(days, "views"), borderColor: 'rgb(255, 99, 132)' },
        { label: `Clones`, data: getChartData(days, "clones"), borderColor: 'rgb(132, 99, 255)' },
      ]
    };
    chart = new Chart(myChart, { type: 'line', data: data, options: { } });
    return "";
  };
  return {
    "set": value => { daysAgo = parseInt(value); app["render"](); },
    "render": () => (
      `<div class="card card-body">
        ${showDropdown()}
        ${showGraph()}
        ${showTable()}
      </div>`
    ),
  }
})();