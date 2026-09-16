const control_admin_btn=document.getElementById("admin");
const contol_adminlogin_section=document.getElementById("admin-login");
const control_user_responses_section=document.getElementById("user-response");

control_admin_btn.addEventListener("click", function(){
  contol_adminlogin_section.style.display = "block"; //none is changed to block
});

const control_toggle_btn=document.getElementById("theme");

control_toggle_btn.addEventListener("click", function(){
  document.body.classList.toggle("dark-theme");
});

const db_url = "https://script.google.com/macros/s/AKfycbwngBOXsrQIUR0EDV-VTIGzUrwRdfkaVGSO2ON5P1qu76eWmirMt_z89QjG13zXPNDc/exec" //API


const control_contact_form=document.getElementById("contact-form");

control_contact_form.addEventListener("submit", async function(event){
  event.preventDefault();
  let name = document.getElementById("input-name").value;
  let email=document.getElementById("input-email").value;
  let msg=document.getElementById("input-msg").value;
  // let date= new Date().toLocalString();
  // let time= new Time().toLocalString();
  

try{
  let response = await fetch (
    db_url,
    {
      method:"POST",
      headers:{
        "Content-Type":
          "text/plain;charset=utf-8" //metadata
      },
      body:JSON.stringify({
        action: "save_message",
        name:name,
        email:email,
        msg:msg
      })
    }
  );
  let result = await response.json();
  if (result.success){
    alert("Message submitted, will get back to you shortly!");
  }
  else{
    alert("Message could not be saved!");
  }
}
  catch(error){
    console.error(error);
    alert("There was a problem submitting the message!");
  }
});

let control_admin_form=document.getElementById("admin-form");
control_admin_form.addEventListener("submit",async function(event){
  let username = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;

try{
  let response = await fetch (
    db_url,
    {
      method:"POST",
      headers:{
        "Content-Type":
          "text/plain;charset=utf-8" //metadata
      },
      body:JSON.stringify({
        action: "login",
        username:username,
        password:password
      })
    }
  );
  let result = await response.json();
  if (result.success){
    alert("Login successful!");
    contol_adminlogin_section.style.display = "none";
    control_user_responses_section.style.display = "block";
    getUserMessages();
  }
  else{
    alert("Access denied , please try again!");
  }
}
  catch(error){
    console.error(error);
    alert("There was a problem loging in!");
  }
});

async function getUserMessages(){
  try{
    let response = await fetch(
      db_url
    );
    let result = await response.json();
    if(!result.success){
      alert("Could not fetch the messages!");
      return;
    }
    const control_user_messages=document.getElementById("user-messages");
    result.messages.forEach(
      responses =>{
        let control_new_div= document.createElement("div"); //creates when ever there is a new messages
        let nameParagraph = document.createElement("P");
        nameParagraph.textContent ="Name: "+responses.name;
        let emailParagraph = document.createElement("P");
        emailParagraph.textContent ="Email: "+responses.email;
        let messageParagraph = document.createElement("P");
        messageParagraph.textContent ="Message: "+responses.msg;
        let dateParagraph = document.createElement("P");
        dateParagraph.textContent ="Date: "+responses.date;
        let separater = document.createElement("hr");
        control_new_div.appendChild(nameParagraph); //tells where the name should be placed
        control_new_div.appendChild(emailParagraph);//tells where the email should be placed
        control_new_div.appendChild(messageParagraph);//tells where the message should be placed
        control_new_div.appendChild(dateParagraph);//tells where the date should be placed
        control_new_div.appendChild(separater);
        control_user_messages.appendChild(control_new_div);
      }
    )
  }
  catch(error){
    console.error(error);
    alert("There was a problem in fetching the messages!");
  }
}