### I'm looking to create a real-world application using the COVID public API to display all vaccine appointments in each state. I'm looking towards expanding from this intial UI and to create more functionalities from here on. 


Initial deploy:
https://covid-vaccine-dashboard.netlify.app/


### 4/4/21 - 4/5:
For this task, I set up Azure Functions  which will act as an API to pull the secret key from Key Vault. The Key Vault uses managed identity which Azure will create AD users of this key and the app will then authenticate using Azure Active Directory. Along with setting CORS access policy for the domain, even if the secret is exposed and someone tries to access the key, they won't be able to get anything from the key since the only person who can communicate with the key is this app. I also set up API Management for this app and found another way to access the secret safely.
![azure1](https://user-images.githubusercontent.com/5561950/113644610-26108180-9653-11eb-81f7-51deaae7bc6e.PNG)
![azure2](https://user-images.githubusercontent.com/5561950/113652457-d1c0ce00-9661-11eb-8d48-d10255beb3f9.PNG)



### 4/2/21 - 4/3-21:
I learned how CI/CD works in Azure DevOps platform. I hosted this project in Azure by importing it from GitHub and then seting up the trigger, build pipeline, and release pipeline so that each time I make a commit to GitHub, it will automatically build and deploy the newest commit from GitHub.

Public Azure Repo:  
https://dev.azure.com/lamb2/REACT_AZURE_DEMO2/_build?definitionId=4

Automatic build and deployed to App Services at: https://brianlamreactazuredemo2.azurewebsites.net/
<img src="https://user-images.githubusercontent.com/5561950/113490448-ee110f00-9497-11eb-98e8-2fb331eb6cc2.PNG" width="800px" >
