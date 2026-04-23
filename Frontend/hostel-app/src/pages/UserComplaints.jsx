import { useState } from "react";
import NewComplaint from "./NewComplaint";
import MyComplaints from "./MyComplaints";

function UserComplaints() {

const [active, setActive] = useState("new");

return (

<div>

<h3 className="mb-4">Complaints</h3>

<div className="mb-3">

<button 
className="btn btn-primary me-2"
onClick={() => setActive("new")}
>
New Complaint
</button>

<button 
className="btn btn-secondary"
onClick={() => setActive("my")}
>
My Complaints
</button>

</div>

{active === "new" && <NewComplaint />}
{active === "my" && <MyComplaints />}

</div>

);

}

export default UserComplaints;