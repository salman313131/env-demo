// toggle navigation
const dailyLink = document.getElementById('dailyLink')
const monthlyLink = document.getElementById('monthlyLink')
const yearlyLink = document.getElementById('yearlyLink')
const myForm  = document.getElementById('myForm')
myForm.addEventListener('submit',onSubmit)
dailyLink.addEventListener('click',handleNavigation)
monthlyLink.addEventListener('click',handleNavigation)
yearlyLink.addEventListener('click',handleNavigation)
const spendingSelect = document.getElementById('spending')
const subCategoryContainer = document.getElementById('subCategoryContainer')
const categorySelect = document.getElementById('categorySelect')
const daily = document.getElementById('daily')
const monthly = document.getElementById('monthly')
const yearly = document.getElementById('yearly')
const hiddenMessage = document.getElementById('hidden_message')

function handleNavigation(event) {
    event.preventDefault();
    const path = event.target.getAttribute("href");
    loadContent(path);
    history.pushState(null, null, path);
}
function loadContent(url){
    if(url==='daily'){
        monthly.style.display = 'none'
        monthlyLink.classList.remove('active')
        yearly.style.display = 'none'
        yearlyLink.classList.remove('active')
        dailyLink.classList.add('active')
        daily.style.display = ''
    }
    else if(url==='monthly'){
        monthly.style.display = ''
        monthlyLink.classList.add('active')
        yearly.style.display = 'none'
        yearlyLink.classList.remove('active')
        dailyLink.classList.remove('active')
        daily.style.display = 'none'
    }
    else{
        monthly.style.display = 'none'
        monthlyLink.classList.remove('active')
        yearly.style.display = ''
        yearlyLink.classList.add('active')
        dailyLink.classList.remove('active')
        daily.style.display = 'none'
    }
}



spendingSelect.addEventListener('change', ()=>{
    const selectSpending = spendingSelect.value;
    populateCategory(selectSpending)
})

function populateCategory(selectSpending){
    categorySelect.innerHTML = ''
    const categories = (selectSpending === 'salary')?['daily','hourly','weekly','monthly']:['food','entertainment','study','hobbies','travel','others']
    for(const category of categories){
        const option = document.createElement('option')
        option.value = category
        option.textContent = category
        categorySelect.appendChild(option)
    }
}

window.addEventListener('popstate', (event) =>{
    const path = location.pathname;
    loadContent(path.substring(1));
});

document.addEventListener('DOMContentLoaded',()=>{
    populateCategory(spendingSelect.value)
})

async function onSubmit(e){
    e.preventDefault();
    const dateData = document.getElementById('datePicker')
    const salaryData = document.getElementById('salSpe')
    const spendingSelect = document.getElementById('spending')
    let salary = salaryData.value
    let spending = salaryData.value
    if(spendingSelect.value === 'salary'){
        spending = 0
    }
    else{
        salary = 0
    }
    try {
        const selectedDate = new Date(dateData.value);
        const dayOfWeek = selectedDate.getDay();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const sendData = {
            day: daysOfWeek[dayOfWeek],
            date: selectedDate.getDate(),
            month: selectedDate.getMonth() + 1, 
            year: selectedDate.getFullYear(),
            salary: salary,
            spending: spending,
            category: categorySelect.value
        };
        await axios.post('/api/v1/expense/add',sendData)
        onPostDisplay(selectedDate.getDate(),selectedDate.getMonth() + 1,selectedDate.getFullYear())
        hiddenMessage.style.display = ''
        setTimeout(() => {
            hiddenMessage.style.display = 'none';
        }, 3000);
        salaryData.value=''
    } catch (error) {
        console.log(error)
    }
}

// displaying details
const displayDate = document.getElementById('selectDate')
displayDate.addEventListener('change',onDisplay)

function clearPrevious(){
    const incomeDisplay = document.getElementById('income_list')
    const expenditureDisplay = document.getElementById('expenditure_list')
    while(incomeDisplay.firstChild){
        incomeDisplay.removeChild(incomeDisplay.firstChild)
    }
    while(expenditureDisplay.firstChild){
        expenditureDisplay.removeChild(expenditureDisplay.firstChild)
    }
}

function showDailyDisplay(dailyData){
    const incomeDisplay = document.getElementById('income_list')
    const expenditureDisplay = document.getElementById('expenditure_list')
    const incomeTotal = document.getElementById('income_total')
    const expenditureTotal = document.getElementById('expenditure_total')
    let totalIncome = 0
    let totalExpense = 0
    if(dailyData.salary === 0){
        const li = document.createElement('li')
        li.textContent = `${dailyData.category}       ${dailyData.spending}`
        expenditureDisplay.appendChild(li)
        totalExpense+=Number(dailyData.spending)
    }
    else{
        const li = document.createElement('li')
        li.textContent = `${dailyData.salary}`
        incomeDisplay.appendChild(li)
        totalIncome+=Number(dailyData.salary)
    }
    incomeTotal.textContent = `Total = ${totalIncome}`
    expenditureTotal.textContent = `Total = ${totalExpense}`
}

async function onDisplay(){
    const selectedDateDisplay = new Date(displayDate.value)
    const date = selectedDateDisplay.getDate()
    const month = selectedDateDisplay.getMonth()+1
    const year = selectedDateDisplay.getFullYear()
    try {
        const resDisplay = await axios.get(`/api/v1/expense/?date=${date}&month=${month}&year=${year}`)
        clearPrevious()
        for(let i=0;i<resDisplay.data.length;i++){
            console.log(resDisplay.data[i])
            showDailyDisplay(resDisplay.data[i])
        }
    } catch (error) {
        console.log(error)
    }
}

async function onPostDisplay(date,month,year){
    try {
        const resDisplay = await axios.get(`/api/v1/expense/?date=${date}&month=${month}&year=${year}`)
        clearPrevious()
        for(let i=0;i<resDisplay.data.length;i++){
            showDailyDisplay(resDisplay.data[i])
        }
    } catch (error) {
        console.log(error)
    }
}

//monthly 
const yearSelect = document.getElementById('yearSelect')
for(let i=1990;i<=2099;i++){
    const option = document.createElement('option')
    option.textContent = i
    option.value = i
    yearSelect.appendChild(option)
}