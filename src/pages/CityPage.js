import React, { useMemo } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import useCityPage from "./../hooks/useCityPage";
import Grid from "@material-ui/core/Grid";
import CityInfo from "./../components/CityInfo";
import Weather from "./../components/Weather";
import WeatherDetails from "./../components/WeatherDetails";
import ForecastChart from "./../components/ForecastChart";
import Forecast from "./../components/Forecast";
import AppFrame from "./../components/AppFrame";
import useCityList from "./../hooks/useCityList";
import { getCityCode } from "./../utils/utils";
import { getCountryName } from "./../utils/serviceCities";

const CityPage = ({ actions, data }) => {
  const { allWeather } = data;

  const { onSetAllWeather } = actions;

  const { city, countryCode, chartData, forecastItemList } = useCityPage();

  const cities = useMemo(() => [{ city, countryCode }], [city, countryCode]);

  useCityList(cities, onSetAllWeather, allWeather);

  const weather = allWeather[getCityCode(city, countryCode)];

  const country = countryCode && getCountryName(countryCode);
  const humidity = weather && weather.humidity;
  const wind = weather && weather.wind;
  const state = weather && weather.state;
  const temperature = weather && weather.temperature;

  return (
    <AppFrame>
      <Grid container justify="space-around" direction="column" spacing={2}>
        <Grid item container xs={12} justify="center" alingItems="flex-end">
          <CityInfo city={city} country={country}></CityInfo>
        </Grid>

        <Grid container item xs={12} justify="center">
          <Weather state={state} temperature={temperature} />
          {humidity && wind && (
            <WeatherDetails humidity={humidity} wind={wind} />
          )}
        </Grid>
        <Grid item>
          {!chartData && !forecastItemList && <LinearProgress />}
        </Grid>
        <Grid item>{chartData && <ForecastChart data={chartData} />}</Grid>

        <Grid item>
          {forecastItemList && <Forecast forecastItemList={forecastItemList} />}
        </Grid>
      </Grid>
    </AppFrame>
  );
};

export default CityPage;
