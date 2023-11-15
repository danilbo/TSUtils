# TSUtils  
Monitoring interface for Linux (Ubuntu) host  
-----------------------------------------------------------------  
- Implement REST API in Python using FastAPI that represents information for the host including: cpu load, memory load, network interfaces packets sent/received.  
- Create web page to represent the Linux host data by making time-based charts calling the API every 5 seconds.  
# Usage  
- Install Python 3.x with Pip  
- Install fastAPI following the instructions from [https://fastapi.tiangolo.com/tutorial/](https://fastapi.tiangolo.com/tutorial/)  
- To run application: ` uvicorn main:app --reload `  
- Open in browser  http://localhost:8000/static/index.html  
# The resulting webpage  
![perfomance](https://github.com/danilbo/TSUtils/assets/61252751/e7a15977-4116-4381-89e3-b23142503167)
![Screenshot 2023-11-15 191645](https://github.com/danilbo/TSUtils/assets/61252751/6ccb81d2-f47e-4dbc-a1aa-dcfb3b331682)
![Screenshot 2023-11-15 191656](https://github.com/danilbo/TSUtils/assets/61252751/74beff0c-3cdf-437a-8bb1-6585946b3956)

# Rest Service  

![image](https://github.com/danilbo/TSUtils/assets/61252751/0ac73a46-722d-470b-83bb-afa398c532a6)  

# Testing with Postman  

![image](https://github.com/danilbo/TSUtils/assets/61252751/eb5f12b3-fc9b-4593-996c-1c14537e997a)

