# Parent Trap

### Project Proposal

**Objective:** Aiming to eliminate the struggles parents experience with getting kids to and from sporting events, school activities etc. By creating an application where kids in a household can post specific requests and parents can approve or deny them based on availability, we hope to eliminate miscommunication, overscheduling and emergencies.

**Server:** 
Node/Express

**Database:** 
MongoDB

**New Tech:**
Email invites, Firebase Authentication, UI kits and special animations 

**User Flow:**

- When a user lands on Parent Trap they will be asked to log in or create a new account. 
- Once they are through authentication they will be directed to the Create a Household screen. Here we will capture the information for the other users:		First Name	Last Name	Email
- After they submit a new household they will be brought to dashboard 
- Once the are tasks available/created the users will be able to see three different views
  	Assigned to themselves	Available events 	All events
- The user will be able to create a new event by clicking an on screen ‘ + ‘  sign This is where we will capture event details: 
  	Type		Ride/Task	Title	Time		Date/Start/Duration	Location	Description
- After an event is created it will be posted to a community board where anyone can take the event add it to their dashboard	
- When a user takes an event or task that clashes with something they have already claimed it will give them an error message that asks if they would like to continue claiming the event. 
- The user will also have access to view the household and make changes to the family members information at anytime


	 