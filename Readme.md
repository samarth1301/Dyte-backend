# Welcome to this DYTE Task!

Hi! I'm Samarth Singh from **VIT VELLORE** and this is my DYTE backend task repo.

# Project

About this project, so this project is written in **Typescript**, and uses POSTGRES, NODEJS, and EXPRESS.

# Installation
If you are wondering how we you can start this project, follow the simple steps:

- Clone this repository in your local computer using 
	##### git clone https://github.com/samarth1301/Dyte-backend.git
- Move into the respective folder using
	##### cd Dyte-backend
- Install all required dependencies using 
	#### npm i
- you are ready to start the application in the development mode using following command:
	#### npm run dev
- Your product is running on **http://localhost:3000**
- For your reference you can use these two authentication tokens:
- **Student Token**: 
bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwYmNlMDY5MiIsImlhdCI6MTY3NzkzMzM0N30.RlZuSGz8sHkMojQwv90RtzieCsNVbOQgYFlwrPJenUo
-  **Admin Token**: 

	bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjc3OTI2MjY1fQ.oQIQfsPSOys7Gcf1QrN29cw6zd1Uw3wyIZGd2F8dKLA


# 
- In case these tokens fails, which they actually should not because I never set any expiry, you can create new token by hitting these two endpoints:
- **Student**: /student/login
	- Body:
				

			{
			"id":"20bce0692",

			"password":"12345"(default)
			}
- **Admin**: /admin/login
	- Body:

			{
			"username":"admin",

			"password":"admin"
			}
