import { LoadingButton } from "@mui/lab"
import { Box, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"


const App = () => {

  const [city, setCity]= useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    error:false,
    message:""
  })
  const [weather, setWeather] = useState({
    city:"",
    country:"",
    temp:"",
    condition:"",
    icon:"",
    conditionText:"",
  })

  const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`;

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError({
      error:false,
      message:''
    })
   try {
    if(!city.trim()) throw{
      message:'El campo ciudad es obligatorio'
    }
    const response = await fetch(`${API_WEATHER}${city}`)
    const data = await response.json();

    if(data.error) throw {message: data.error.message}
    setWeather({
      city:data.location.name,
      country:data.location.country,
      temp:data.current.temp_c,
      condition:data.current.condition.code,
      icon:data.current.condition.icon,
      conditionText:data.current.condition.text,
    })

   } catch (error) {
    console.log(error)
    setError({
      error:true,
      message:error.message
    })
   }finally{
    setLoading(false)
   }
  }


  return (
    <Container
      maxWidth="xs"
      sx={{mt:2}}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >Weather-React</Typography>
      <Box
        sx={{display:"grid", gap:2}}
        component="form"
        autoComplete= "off"
        onSubmit={onSubmit}
      >
        <TextField
          id="city"
          label="Ciudad"
          variant="outlined"
          size="small"
          required
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
        />
        <LoadingButton
        type="submit"
        variant="contained"
        loading={loading}
        loadingIndicator="viendo como esta afuera..."
        >
          Buscar
        </LoadingButton>
      </Box>

      {
        weather.city && (
          <Box sx={{mt:2, display:'grid', gap:2, textAlign:'center'}}>
            <Typography 
              variant="h4"
              component="h2"
            >
              {weather.city} - {weather.country}
            </Typography>
            <Box
              component="img"
              alt={weather.conditionText}
              src={weather.icon}
              sx={{margin:"0 auto"}}
            />
            <Typography 
              variant="h5"
              component="h3"
            >
              {weather.temp} cº
            </Typography>   
            <Typography 
              variant="h5"
              component="h3"
            >
              {weather.conditionText}
            </Typography>     


          </Box>
        )}



      <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
      >
        Powered by:{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  )
}

export default App