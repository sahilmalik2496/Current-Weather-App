$(function(){
    // Ajax call for the coordinates //
  $.ajax({
    url: 'https://freegeoip.net/json/',
  type: 'GET',
  datatype: 'jsonp',
    success: function(data){
      var lat = data.latitude; // latitude coordinates
      var lon= data.longitude; // longitude coordinates
      var country = data.country_name;
      var city = data.city;
      $("#location").html(city+ ", " +country); // your city and country location 
     
      // Ajax call request for the Api
      $.ajax({
        url: "https://api.forecast.io/forecast/92fd0081530eebd7bd22a521aeac97ef/"+lat+","+lon,
        
        jsonp: "callback",
        dataType: "jsonp",
        success: function(data){
           var fTemp = data.currently.temperature ; // Temperature is in fahernheit
          var cTemp= Math.round((fTemp-32)* 5/9); // We convert the temperature in celcius 
          
          cTemp = cTemp+ " &#8451;"; 
          fTemp = fTemp + " &#8457;";
          var type = data.currently.summary; // type of the weather
          var humidity=data.currently.humidity; // humdidity condition
          var windSpeed=data.currently.windSpeed; 
          var icon = data.currently.icon; // fetching the icon data based on the weather type
          
          $("#temp").append(cTemp);
          $("#type").append("weather type: "+type);
          $("#wind").append("wind speed: "+windSpeed + "mps");
          $("#humidity").append("humidity: " + humidity);
          
          //functionn to switch between the temperature in celcius and faherenheit
          var swap =0;
          $("#temp").click(function(){
            if (swap == 0){
                $("#temp").html(fTemp);
                swap =1;
            }
            else{
                $("#temp").html(cTemp);
                swap =0;
            }
        });
        // function to add the weather based icons. Icons used are from the github repository of Erik Flower

        function chooseIcon(data){
          switch (icon) {
              case 'clear-day':
              $("#icon").addClass("wi wi-day-sunny");
                  break;
              case 'clear-night':
              $("#icon").addClass("wi wi-night-clear");
              break;
              case 'partly-cloudy-day':
              $("#icon").addClass("wi wi-day-cloudy");
              break;
              case 'partly-cloudy-night':
              $("#icon").addClass("wi wi-night-alt-cloudy");
              break;
              case 'cloudy':
              $("#icon").addClass("wi wi-cloudy");
              break;
              case 'rain':
              $("#icon").addClass("wi wi-rain");
              break;
              case 'sleet':
              $("#icon").addClass("wi wi-sleet");
              break;
              case 'snow':
              $("#icon").addClass("wi wi-snow");
              break;
              case 'snow':
              $("#icon").addClass("wi wi-snow");
              break;
              case 'wind':
              $("#icon").addClass("wi wi-strong-wind towards-23-deg");
              break;
              case 'snow':
              $("#icon").addClass("wi wi-snow");
              break;
              case 'fog':
              $("#icon").addClass("wi wi-day-fog");
              break;
              case 'mist':
              $("#icon").addClass("wi wi-windy");
              break;

          }
        }
        chooseIcon();
        }
      })
    }
  });
});