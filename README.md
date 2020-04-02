# REST API for Switzerlands BAG (Bundesamt für Gesundheit) COVID-19 data

Access the API here (might change): http://5.102.146.78/api/

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
            "description": "get all date values",
            "/": [
                {
                    "endpoint": "{YYYY-MM-DD}",
                    "requestType": "get",
                    "description": "get official data from specific date",
                    "example": "/api/data/2020-04-02"
                }
            ]
        }
    ]

}
```
