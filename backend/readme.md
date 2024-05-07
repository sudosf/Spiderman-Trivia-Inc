[![SpiderMan Trivia API](https://github.com/Spiderman-Trivia-Inc/Spiderman-Trivia-Inc/actions/workflows/deploy-api.yml/badge.svg?branch=main)](https://github.com/Spiderman-Trivia-Inc/Spiderman-Trivia-Inc/actions/workflows/deploy-api.yml)

# API documentation


**base url: http://spiderman-trivia-api.eu-west-1.elasticbeanstalk.com/api**

### Authentication
**Login with GitHub OAuth**

Endpoint: /auth/github

Method: GET

Responses:

302 Found: Redirects to GitHub OAuth login page.

### User Management
**Get User Details**

Endpoint: /users/me

Method: GET

response:
```
 {
    "status": "success",
    "data": {
        "user_id": "1",
        "username": "tebza",
        "github_id": "gittyhub-id-goes-here"
    }
}
```

### Subjects Management
**List All Subjects**

Endpoint: /subjects

Method: GET

response:
```
{
    "status": "success",
    "data": [
        {
            "subject_id": "1",
            "name": "Classic",
            "image_url": "assets/images/classic.png"
        },
        {
            "subject_id": "2",
            "name": "Amazing",
            "image_url": "assets/images/amazing.png"
        },
        {
            "subject_id": "3",
            "name": "MCU",
            "image_url": "assets/images/mcu.png"
        },
        {
            "subject_id": "4",
            "name": "Next-Gen",
            "image_url": "assets/images/nextgen.png"
        }
    ]
}
```


### Quiz Management
**Start Quiz**

Endpoint: /quiz/start/{subject_id}

Method: GET

response: 
```
{
    "status": "success",
    "data": [
        {
            "question_id": "62",
            "question": "What happens to Dr. Connors at the end of \"The Amazing Spider-Man\"?",
            "options": [
                "He escapes",
                "He dies",
                "He's arrested",
                "He turns back into a lizard"
            ],
            "answer": "He's arrested"
        },
        ....  the rest of the questions
        {
            "question_id": "78",
            "question": "In \"The Amazing Spider-Man\", what does Peter buy at the convenience store?",
            "options": [
                "Chocolate milk",
                "A sandwich",
                "A lottery ticket",
                "Soda"
            ],
            "answer": "Chocolate milk"
        }
    ]
}
```


### Attempts Management
**list All Attempts**

Endpoint: /attempts

Method: GET

response:
```
{
    "status": "success",
    "data": [
        {
            "attempt_id": "1",
            "subject_id": "1",
            "user_id": "1",
            "timestamp": "2024-05-01T07:07:48.882Z",
            "score": 10
        },
        {
            "attempt_id": "2",
            "subject_id": "1",
            "user_id": "1",
            "timestamp": "2024-05-01T09:10:19.626Z",
            "score": 10
        }
    ]
}
```

**List User Attempts**

Endpoint: /attempts/me

Method: GET

response:
```
{
    "status": "success",
    "data": [
        {
            "attempt_id": "1",
            "subject_id": "1",
            "user_id": "1",
            "timestamp": "2024-05-01T07:07:48.882Z",
            "score": 10
        },
        {
            "attempt_id": "2",
            "subject_id": "1",
            "user_id": "1",
            "timestamp": "2024-05-01T09:10:19.626Z",
            "score": 10
        }
    ]
}
```
**Create Quiz Attempt**
Endpoint: /attempts

Method: POST

request:
```
{
    "subject_id":1,
    "score": 10
}
```
response:
```
{
    "status": "success",
    "data": {
        "attempt_id": "2",
        "subject_id": "1",
        "score": 10,
        "user_id": "1",
        "timestamp": "2024-05-01T09:10:19.626Z"
    }
}
```

