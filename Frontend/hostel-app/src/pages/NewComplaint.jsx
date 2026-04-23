import { useState } from "react";
import axios from "axios";

function NewComplaint() {

const [description, setDescription] = useState("");

const handleSubmit = async () => {

try {

const token = localStorage.getItem("token");

console.log("TOKEN SENT:", token);

await axios.post(
"http://localhost:9988/userComplaintsController/raisecomplaint",
null,
{
params: {
description: description
},
headers: {
Authorization: `Bearer ${token}`
}
}
);

alert("Complaint Submitted Successfully");
setDescription("");

} catch (error) {
console.error(error);
}

};

return (

<div>

<h4>New Complaint</h4>

<textarea
className="form-control mb-3"
rows="5"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>

<button 
className="btn btn-primary"
onClick={handleSubmit}
>
Submit Complaint
</button>

</div>

);

}

export default NewComplaint;