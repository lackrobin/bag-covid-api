# REST API for Switzerlands BAG (Bundesamt für Gesundheit) COVID-19 data

Access the API here (might change): https://bag-covid-api.herokuapp.com/api/

Apps using this API (might change): http://bag-covid-visuals.surge.sh/

WebApp Repo: https://github.com/lackrobin/bag-covid-visuals

Starting the Server:

```npm install```

```npm run dev```
or ```npm run start``` for port 80

## API Documentation

```
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
