## Diploma of Web Development - Major Project Part 1

This project was created as a Web Application for the first part of the Diplomas major project. The purpose of this project was to create a system in which managers will be able to assign and manage a project's tasks. The staff will be able to update the progress of the tasks they were assigned. This will allow for clear project management and visually update the team on the overall progress.  

### Languages/Frameworks
* **HTML** and **CSS** - Structure and Styling 
* **Javascript** - Frontend interface (ajax for asynchronous backend calls) 
* **PHP** - Backend API 
* **MySQL** - Database Management System

### Operational

Import webapp.sql file into MySQL or other relational database management system 

The database needs to be named: webapp

Username and password to the database can be whatever however if they are not username="root" and password=""
then the user will need to edit the model/db_classes.php file and change the respective fields inside the
__construct function at the top of the file 

To access the web app unpack the ux3 folder into localhost and navigate to it in the web browser:
http://localhost/ux3/

**Admin (all additional feature create new job type, create new employee etc.):**
Username=aash35
Password=aash35

**Normal Users:**  

Username=tester123  
Password=tester123  
  
Username=bigtest123  
Password=bigtest123  
  
Username=test123  
Password=(doesn't have a password login with this to see the create password feature)  
  
Username=test321  
Password=(doesn't have a password login with this to see the create password feature)  
  
Username=testerman  
Password=(doesn't have a password login with this to see the create password feature)  
  
### Roadmap  
1. Security on descriptions needs to be modified to protect against injects (currently doesn't restrict `<h1>` tags
   for example) 
2. Project displayer needs to display all projects for a manager so that deleting the projects can be done from 
   the one place allowing managers to better understand which projects they are deleting
3. A system that randomizes the backdrop of each project (could be done through an array with different colours 
   inside)
4. Coloured indicators on a task’s overall status (like a percentage bar that changes depending on how many 
   employees have completed the task 50% green, 50% red for example). 
5. A visual indication of which tasks you are 
   assigned so that the user doesn’t need to search for their task statuses.
6. Order system would restrict users from completing tasks unless the previous task was completed
7. Duration system would change the colour of the tasks depending on how close it is to its set "deadline"
8. Start/end data system would change the colour of the project depending on how close it is to the dateline
9. Implemented Web Sockets to allow for changes to the system to automatically update users other systems
10. Configure the application to be used on tablets, laptops and desktops (currently it is purely a mobile app)
