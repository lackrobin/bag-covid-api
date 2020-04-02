# REST API for Switzerlands BAG (Bundesamt für Gesundheit) COVID-19 data

Access the API here (might change): http://5.102.146.78/api/

Starting the Server:

1. > cd server
1. > npm install
1. > node server.js

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
                    "example": "/data/2020-04-02"
                }
            ]
        }
    ]

}
```