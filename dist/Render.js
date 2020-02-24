class Render {
    renderData= function(data){
        $(".container").empty()
        const source = $("#WAtemplate").html()
        const template = Handlebars.compile(source)
        const City = template({data})   
        $(".container").append(City)
    }
}

