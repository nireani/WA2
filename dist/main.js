
const render = new Render()
const apiManager = new APIManager()

$(`#Searchb`).click(function () {
  handleSearch()
})

$(`.container`).on('click', '.fa-plus', async function () {
   const name = $(this).closest(".city").find(".name").text()
await apiManager.saveCity(name)
loadData()

// render.renderData(apiManager.cityData)
  
})



$(`.container`).on('click',`.fa-minus`,async function () {
  const name = $(this).closest(".city").find(".name").text()
  await apiManager.removeCity(name)
  render.renderData(apiManager.cityData)
})

async function loadData() {
  await apiManager.getDataFromDB()
  render.renderData(apiManager.cityData)
}

loadData()

async function handleSearch() {
  let city = $("#input").val()
  
    await apiManager.getCityData(city)
    
    render.renderData(apiManager.cityData)
  }
  
