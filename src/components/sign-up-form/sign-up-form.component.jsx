import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

//creating objects for the form text fields
const defaultFormFields = {
   displayName: "",
   email: "",
   password: "",
   confirmPassword: ""
};

const SignUpForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { displayName, email, password, confirmPassword } = formFields;

   console.log(formFields);
   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   }
      

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (password !== confirmPassword) {
         alert("passwords dont match");
         return;
      }

      try {
         const {user} = await createAuthUserWithEmailAndPassword(
            email,
            password
         );
         
         await createUserDocumentFromAuth(user, { displayName });
         resetFormFields();
      }
      catch (error) {
         if (error.code ='auth/email-alredy-in-use') {
            alert('Cannont create user,email already in use');
         }
         else{
            console.log('user encounter an error', error);
         }
      }
   };

   //function thats gonna handle the change of the text inside the text fields
   const handleChange = (event) => {
      const { name, value } = event.target;

      setFormFields({ ...formFields, [name]: value });
   };


   return (
      <div>
         <h1>sign up with your email and password</h1>
         <form onSubmit={handleSubmit}>

            <label>Display Name</label>
            <input type="text"
               required
               onChange={handleChange}
               name="displayName"
               value={displayName}>
            </input>

            <label>Email</label>
            <input type="email"
               required onChange={handleChange}
               name="email"
               value={email}>
            </input>

            <label>Password</label>
            <input type="password"
               required onChange={handleChange}
               name="password"
               value={password}>
               </input>
            
            <label>Confirm Password </label>
            <input type="password"
               required onChange={handleChange}
               name="confirmPassword"
               value={confirmPassword}>
               </input>

            <button type="submit"> Sign Up</button>
            
         </form>
      </div>
   );
};
export default SignUpForm;