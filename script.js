document.addEventListener("DOMContentLoaded",function(){

    const searchButton = document.getElementById("search-btn")
    const usernameinput = document.getElementById("user-input")
    const easyProgressCircle = document.querySelector(".easy-progress")
    const mediumProgressCircle = document.querySelector(".medium-progress")
    const hardProgressCircle = document.querySelector(".hard-progress")
    const totalProgressCircle = document.querySelector(".total-progress")
    const easyLabel = document.getElementById("easy-level")
    const mediumLabel = document.getElementById("medium-level")
    const hardLabel = document.getElementById("hard-level")
    const totalLabel = document.getElementById("total-level")
    
    function updateProgress(solved, total, label, circle, percentLabel, color) {
        const progress = total > 0 ? Math.round((solved / total) * 100) : 0;
        percentLabel.textContent = `${progress}%`;
        let gradientColor;
        switch (color) {
            case 'green': gradientColor = '#4ade80'; break; // Tailwind green-400
            case 'yellow': gradientColor = '#facc15'; break; // Tailwind yellow-400
            case 'red': gradientColor = '#f87171'; break; // Tailwind red-400
            case 'indigo': gradientColor = '#818cf8'; break; // Tailwind indigo-400
            default: gradientColor = '#818cf8';
        }
        circle.style.background = `conic-gradient(${gradientColor} 0% ${progress}%, #f3f4f6 ${progress}% 100%)`;

    }

    function displayUserData(parsedData) {
        const Easytotal = parsedData.totalEasy;
        const Mediumtotal = parsedData.totalMedium;
        const Hardtotal = parsedData.totalHard;
        const Alltotal = parsedData.totalQuestions;
        const Easysolved = parsedData.easySolved;
        const Mediumsolved = parsedData.mediumSolved;
        const Hardsolved = parsedData.hardSolved;
        const Allsolved = parsedData.totalSolved;

        updateProgress(Easysolved, Easytotal, easyLabel, easyProgressCircle, document.getElementById('easy-percent'), 'green');
        updateProgress(Mediumsolved, Mediumtotal, mediumLabel, mediumProgressCircle, document.getElementById('medium-percent'), 'yellow');
        updateProgress(Hardsolved, Hardtotal, hardLabel, hardProgressCircle, document.getElementById('hard-percent'), 'red');
        updateProgress(Allsolved, Alltotal, totalLabel, totalProgressCircle, document.getElementById('total-percent'), 'indigo');

         
        document.getElementById('easy-count').textContent = `${Easysolved} / ${Easytotal}`;
        document.getElementById('medium-count').textContent = `${Mediumsolved} / ${Mediumtotal}`;
        document.getElementById('hard-count').textContent = `${Hardsolved} / ${Hardtotal}`;
        document.getElementById('total-count').textContent = `${Allsolved} / ${Alltotal}`;
    }

    function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty!!")
            return false
        }
        const regex = /^(?!.*[-_]{2})(?!.*[-_]$)(?!^[-_])[A-Za-z0-9-_]{4,20}$/
        const isMatching=regex.test(username)
        if(!isMatching){
            alert("Invalid Username")
        }
        return isMatching
    }
    
    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchButton.textContent = "Searching..."
            searchButton.disabled = true
            const response = await fetch(url)

            if(!response.ok){
                throw new Error("Unable to fetch User details");
            }
            const parsedData = await response.json()
            if (parsedData.status==="error"){
                throw new Error(parsedData.message)
            }
            displayUserData(parsedData)
        }
        catch(error){
            alert("User Doesnt exist")
        }
        finally{
            searchButton.textContent = "Search"
            searchButton.disabled = false
        }
    }

    searchButton.addEventListener('click',() => {
            const username = usernameinput.value
            console.log("logging username: ", username)
            if(validateUsername(username)){
                fetchUserDetails(username)
            }
    })
})