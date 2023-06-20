import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";


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
      <div className="sign-up-container">
         <h2>Dont have an account?</h2>
         <span>sign up with your email and password</span>
         <form onSubmit={handleSubmit}>

            
            <FormInput type="text"
               label="Display Name"
               required
               onChange={handleChange}
               name="displayName"
               value={displayName}>
            </FormInput>

            
            <FormInput type="email"
               label="Email"
               required onChange={handleChange}
               name="email"
               value={email}>
            </FormInput>

            
            <FormInput type="password"
               label="Password"
               required onChange={handleChange}
               name="password"
               value={password}>
               </FormInput>
            
            
            <FormInput type="password"
               label="Confirm Password"
               required onChange={handleChange}
               name="confirmPassword"
               value={confirmPassword}>
               </FormInput>

            <Button type="submit"> Sign Up</Button>
            
         </form>
      </div>
   );
};
export default SignUpForm;