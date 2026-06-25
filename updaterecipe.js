
/* Background Styling */
body {
  margin: 0;
  padding: 0;
  font-family: Bookman Old Style,Times New Roman;
  background: url('../images/back.jpg');
  background-repeat:no-repeat ;
  background-position:center fixed; 
  text-align:center;
}
/* Container */
.add-recipe-container {
  background-color: #ffe4c4;
  padding: 30px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
/* Heading */
/* Inputs and Textareas */
.add-recipe-container input[type="text"],
.add-recipe-container input[type="number"],
.add-recipe-container textarea {
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  resize: vertical;
  background-color: #f9f9f9;
  transition: border 0.2s;
}
.add-recipe-container input:focus,
.add-recipe-container textarea:focus {
  border-color: #3498db;
  outline: none;
}
/* Button */
.add-recipe-container button {
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
.add-recipe-container button:hover {
  background-color: #219150;
}
/* Responsive Design */
@media (max-width: 600px) {
  .add-recipe-container {
    padding: 20px;
    margin: 20px;
  }
}
