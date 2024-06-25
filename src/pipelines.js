const pipelines = [
    {
        "collection": "companies",
        "steps": [
            {
                "status": "lead"
            },
            {
                "status": "prospect",
                "require": {
                    "email": {
                        "$ne": ""
                    },
                    "phone": {
                        "$ne": ""
                    },
                    "location.address": {
                        "$ne": ""
                    },
                    "jobs": {
                        "$ne": []
                    },
                    "recruiters": {
                        "$ne": []
                    }
                }
            }
        ]
    }
]

export default pipelines