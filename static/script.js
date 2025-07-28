async function fetchData() {
    try {
        let response = await fetch('/get_data');
        let data = await response.json();
        
        let distance = data.distance;  
        let binLevel = document.getElementById("bin-level");

        if (distance > 20) {
            binLevel.innerHTML = "Low";
            binLevel.className = "level-box low";
        } else if (distance > 10) {
            binLevel.innerHTML = "Medium";
            binLevel.className = "level-box medium";
        } else {
            binLevel.innerHTML = "High";
            binLevel.className = "level-box high";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

setInterval(fetchData, 3000);  // Fetch data every 3 seconds
fetchData();
function checkSystemStatus() {
    fetch('/get_data')
        .then(response => {
            if (!response.ok) throw new Error("Offline");
            return response.json();
        })
        .then(() => {
            document.querySelector('#system-status .badge').textContent = "🟢 System Online";
            document.querySelector('#system-status .badge').className = "badge bg-success";
        })
        .catch(() => {
            document.querySelector('#system-status .badge').textContent = "🔴 System Offline";
            document.querySelector('#system-status .badge').className = "badge bg-danger";
        });
}

setInterval(checkSystemStatus, 3000);  // Ping every 3 seconds
checkSystemStatus(); // Initial check
statusElement.textContent = "✅ Online";
statusElement.className = "status-online";
