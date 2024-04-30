import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideBarMp from "../../Sidebar/SideBarMp";
import Loader from "../../Loader";
import "./styles.css";
import Button from "../../Button";

function EmployeeDetail({ id, setFlagg }) {
  // const [isParam, setIsParam] = useState(false);
  let { empId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({});
  const [flag, setFlag] = useState(false);
  let statusRef = useRef(null);
  let resignRef = useRef(null);
  let increementRef = useRef(null);
  let remarksRef = useRef(null);

  if (empId) {
    id = empId;
  }
  useEffect(() => {
    getData();
  }, [id]);

  async function getData() {
    setIsLoading(true);
    try {
      let token = sessionStorage.getItem("accessToken");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      let url = `https://sarkultechapi.onrender.com/api/v1/engineer/${id}`;

      let response = await axios.get(url, config);
      console.log("response.data.data");
      console.log(response.data.data);
      setObj(response.data.data);


      setIsLoading(false);
    } catch (error) {
      console.log("error found is: " + error);
      setIsLoading(false);
      setFlag(false);
      alert(error.response.data.message);
    }
  }




  async function handleUpdate(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      let token = sessionStorage.getItem("accessToken");
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      let url = `https://sarkultechapi.onrender.com/api/v1/engineer/${id}`;

      let data = {
        status: statusRef.current.value,
        resignedAt: resignRef.current.value,
        incrementDueDate: increementRef.current.value,
        remarks: remarksRef.current.value
      }
      let response = await axios.patch(url, data, config);
      console.log("updated...")
      console.log(response.data.data);
      setIsLoading(false);
      alert("updated successfully");

    }
    catch (error) {
      console.log("error while upfating emp");
      console.log(error.response.data.message);
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div>
        {/* <SideBarMp /> */}
        <h3 id="employee-detail-h3">Employee Details {id}</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="manpower-detail">
              <div className="manpower-left">
                <li className="item">
                  <label className="update-label call-detail-label">Name: </label>{" "}
                  {obj.employeeName}{" "}
                </li>

                <li className="item">
                  <label className="update-label call-detail-label">
                    Address:{" "}
                  </label>{" "}
                  {obj.employeeAddress}
                </li>
                {/* <label className='update-label call-detail-label'>Id Proof: </label> {}<br/><br/> */}
                <li className="item">
                  {" "}
                  <label className="update-label call-detail-label">
                    Designation:{" "}
                  </label>{" "}
                  {obj.employeeDesignation}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Joining Date:{" "}
                  </label>{" "}
                  {obj.joinDate?.slice(0, 10)}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">DOB: </label>{" "}
                  {obj.employeeDOB?.slice(0, 10)}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Sallary:{" "}
                  </label>{" "}
                  {obj.salary}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Experience:{" "}
                  </label>{" "}
                  {obj.experience} Yrs
                </li>
              </div>
              <div className="manpower-right">
                <li className="item">
                  <label className="update-label call-detail-label">
                    Qualification:{" "}
                  </label>{" "}
                  {obj.qualification}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Email:{" "}
                  </label>{" "}
                  {obj.employeeEmail}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Contact:{" "}
                  </label>{" "}
                  {obj.employeeContact}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Status:{" "}
                  </label>{" "}
                  {obj.status}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Reference:{" "}
                  </label>{" "}
                  {obj.reference}
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Certificate:{" "}
                  </label>{" "}
                  <a target="_blank"  href={obj.certificate} download>View</a>
                  { }
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Id Proof:{" "}
                  </label>{" "}
                  <a target="_blank" href={obj.idProof} download>View</a>
                  { }
                </li>
                <li className="item">
                  <label className="update-label call-detail-label">
                    Skills:{" "}
                  </label>{" "}
                 {obj.skills}
              
                  { }
                </li>
              </div>
            </div>
            {!flag ? (<div className="emp-update-btn" onClick={() => { setFlag(true) }}>
              <Button text={"Update"} outlined={true} />
            </div>) : (<form className="emp-update-form" onSubmit={handleUpdate}>
              <div className="emp-update-form-left">
                <label className="update-label call-detail-label">Status</label> <select id="dropdown" ref={statusRef} >
                  <option value="">-- Select --</option>
                  <option value="active">Active</option>
                  <option value="inactive">Left</option>
                </select><br />
                <label className="update-label call-detail-label">Resign Date: </label><input type="date" className="form-input" ref={resignRef} /><br /></div>
              <div className="emp-update-form-right">
                <label className="update-label call-detail-label">Increement Due Date: </label><input type="date" className="form-input" ref={increementRef} /><br />
                <label className="update-label call-detail-label">Remarks: </label> <input type="text" className="form-input" ref={remarksRef} /><br />
                <input type="submit" value='Submit Update' className="submit-btn submit-btn-emp" onSubmit={handleUpdate} />
              </div>

            </form>)}


          </div>

        )}
      </div>
    </div>
  );
}

export default EmployeeDetail;
