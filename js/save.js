const prefix = "dms7827-";
const searchIDKey = prefix + "search";
const yearKey = prefix + "year";
const monthKey = prefix + "month"

const storedSearchID = localStorage.getItem(searchIDKey);
const storedYear = localStorage.getItem(yearKey);
const storedMonth = localStorage.getItem(monthKey);

function saveLocalStoredData(){
    localStorage.setItem(searchIDKey, app.selected.satId);
    localStorage.setItem(yearKey, app.selectedYear)
    localStorage.setItem(monthKey, app.selectedMonth)
}
