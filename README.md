# REST API for Switzerlands BAG (Bundesamt für Gesundheit) COVID-19 data

Access the API here (might change): https://bag-covid-api.herokuapp.com/api/

Apps using this API (might change): http://bag-covid-visuals.surge.sh/


Starting the Server:

```cd server```

```npm install```

```node server.js```
or ```node server.js prod``` for port 80

## API Documentation

```
{

    "api": [
        {
            "endpoint": "/data",
            "requestType": "get",
            "description": "get all available date values",
            "/": [
                {
                    "endpoint": "{YYYY-MM-DD}",
                    "requestType": "get",
                    "description": "get official data from specific date",
                    "example": "/data/2020-04-02"
                },
                {
                    "endpoint": "latest",
                    "requestType": "get",
                    "description": "get official data from latest date available",
                    "example": "/data/latest"
                }
            ]
        }
    ]

}
```
