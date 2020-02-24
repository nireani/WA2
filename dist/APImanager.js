class APIManager {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        let citiesData = await $.get('/cities')
        this.cityData = citiesData
    }

    async getCityData(cityName) {
        let city = await $.get(`/city/${cityName}`)
        this.cityData.unshift(city)
    }

    async saveCity(cityName) {
        for (let i = 0; i < this.cityData.length; i++) {
            if (this.cityData[i].name == cityName) {
                await $.post(`/city/`, this.cityData[i])

            }
        }
    }

    async removeCity(cityName) {
        for (let i = 0; i < this.cityData.length; i++) {
            if (this.cityData[i].name == cityName) {

               await $.ajax({
                    url: `/city`,
                    type: "DELETE",
                    data: this.cityData[i],
                    success:  () =>  {
                        console.log(`delete:${name}`);
                        this.cityData.splice(i,1)
                    }

                }

                )


            }
        }

    }
}




