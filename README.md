# REST API for Switzerlands BAG (Bundesamt für Gesundheit) COVID-19 data

Access the API here (might change): https://bag-covid-api.herokuapp.com/api/

Apps using this API (might change): http://bag-covid-visuals.surge.sh/

WebApp Repo: https://github.com/lackrobin/bag-covid-visuals

Starting the Server:

```npm install```

```npm run dev```
or ```npm run start``` for port 80

## API Documentation

```javascript
{

    "repo": "https://github.com/lackrobin/bag-covid-api",
    "api": [
        {
            "endpoint": "/data",
            "requestType": "get",
            "description": "get all available date values",
            "/": [
                {
                    "endpoint": "/{YYYY-MM-DD}",
                    "requestType": "get",
                    "description": "get official data from specific date",
                    "example": "/data/2020-04-02"
                },
                {
                    "endpoint": "/latest",
                    "requestType": "get",
                    "description": "get official data from latest date available",
                    "example": "/data/latest"
                }
            ]
        },
        {
            "endpoint": "/hospit",
            "requestType": "get",
            "description": "get TOTAL number of hospitalized patients for age groups as of date",
            "example": "/data/latest"
        },
        {
            "endpoint": "/death",
            "requestType": "get",
            "description": "get TOTAL number of deaths for age groups as of date",
            "example": "/data/latest"
        },
        {
            "endpoint": "/infection",
            "requestType": "get",
            "description": "get TOTAL number of infected patients for age groups as of date",
            "example": "/data/latest"
        }
    ]

}
```
## API Example request and resposes

Request: https://bag-covid-api.herokuapp.com/api/data/latest

Response: 

```javascript

{
    "date": "2020-04-09",
    "data": {
        "COVID19 Epikurve": [
            {
                "date": "2/24/20",
                "cases": "1"
            },
            ...
        ],
        "COVID19 Altersverteilung": [
            {
                "age": "0 - 9",
                "maleInfectionCount": "49",
                "malePercentage": "0.4",
                "malePer100k": "10.9",
                "femaleInfectionCount": "39",
                "femalePercentage": "0.3",
                "femalePer100k": "9.2",
                "totalInfectionCount": "88",
                "totalPercentage": "0.4"
            },
            ...
        ],
        "COVID19 Kantone": [
            {
                "canton": "AG",
                "infectionCount": "815",
                "per100k": "120.2"
            },
            ...
        ],
        "COVID19 Altersverteilung Hospit": [
            {
                "age": "0 - 9",
                "maleHospitalized": "16",
                "femaleHospitalized": "7",
                "TotalHospitalized": "23"
            },
            ...
        ],
        "COVID19 Altersverteilung TodF": [
            {
                "age": "30 - 39",
                "maleDeaths": "2",
                "femaleDeaths": "2",
                "TotalDeaths": "4"
            },
            ...
        ]
    }
}
```

Request: https://bag-covid-api.herokuapp.com/api/hospit

Respose:
```javascript
[
    {
        "date": "2020-03-28",
        "0 - 9": "15",
        "10 - 19": "9",
        "20 - 29": "49",
        "30 - 39": "60",
        "40 - 49": "96",
        "50 - 59": "206",
        "60 - 69": "223",
        "70 - 79": "329",
        "80+": "344"
    },
    ...
 ]
```
