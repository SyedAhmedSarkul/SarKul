import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Box,
  Divider,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Cake as CakeIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Description as DescriptionIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";

function EmployeeDetail({ id, setFlagg }) {
  const { empId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({});
  const [flag, setFlag] = useState(false);

  const statusRef = useRef(null);
  const resignRef = useRef(null);
  const incrementRef = useRef(null);
  const remarksRef = useRef(null);
  const increementAmountRef = useRef(null);
  const newCTCRef = useRef(null);
  const newDesignationRef = useRef(null);

  if (empId) {
    id = empId;
  }

  useEffect(() => {
    getData();
  }, [id]);

  async function getData() {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const url = `https://sarkultechapi.onrender.com/api/v1/engineer/${id}`;
      const response = await axios.get(url, config);
      setObj(response.data.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const url = `https://sarkultechapi.onrender.com/api/v1/engineer/${id}`;
      const data = {
        status: statusRef.current.value,
        resignedAt: resignRef.current.value,
        incrementDueDate: incrementRef.current.value,
        remarks: remarksRef.current.value,
        revisedSalary: newCTCRef.current.value,
        revisedDesignation: newDesignationRef.current.value,
        increementAmount: increementAmountRef.current.value,
      };
      await axios.patch(url, data, config);
      alert("Updated successfully");
      setFlag(false);
      getData();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, pl: 20 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: "primary.main" }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {obj.employeeName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {obj.employeeDesignation}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: obj.status === "active" ? "success.light" : "error.light",
                  color: "#fff",
                  // fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                {obj.status?.toUpperCase()}
              </Box>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <WorkIcon sx={{ mr: 1 }} /> Professional Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }} >
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Designation </Typography>
                  <Typography alignContent={'center'}>{obj.employeeDesignation}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Experience</Typography>
                  <Typography alignContent={'center'} >{obj.experience} Years</Typography>
                </Box>

                {obj.increementAmount && <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Increement Amount</Typography>
                  <Typography alignContent={'center'} textAlign={'center'} >
                    ₹{obj.increementAmount}
                  </Typography>
                </Box>
                }

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Salary</Typography>
                  <Typography alignContent={'center'} textAlign={'center'} >
                    ₹{obj.salary}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Joining Date</Typography>
                  <Typography alignContent={'center'} display="flex" justifyContent="center">
                    <EventIcon sx={{ fontSize: 16, mr: 0.5 }} /> {obj.joinDate?.slice(0, 10)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} >
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Skills</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1} alignContent={'center'} justifyContent={'center'} >
                    {obj.skills?.map((skill, index) => (
                      <Box
                        key={index}
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: "primary.light",
                          color: "#fff",
                          fontSize: 12,
                        }}
                      >
                        {skill}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon sx={{ mr: 1 }} /> Personal Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Date of Birth</Typography>
                  <Typography alignContent={'center'} display="flex" justifyContent="center">
                    <CakeIcon sx={{ fontSize: 16, mr: 0.5 }} /> {obj.employeeDOB?.slice(0, 10)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Address</Typography>
                  <Typography alignContent={'center'} display="flex" justifyContent="center">
                    <HomeIcon sx={{ fontSize: 16, mr: 0.5 }} /> {obj.employeeAddress}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Email</Typography>
                  <Typography alignContent={'center'} display="flex" justifyContent="center">
                    <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} /> {obj.employeeEmail}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Contact</Typography>
                  <Typography alignContent={'center'} display="flex" justifyContent="center">
                    <PhoneIcon sx={{ fontSize: 16, mr: 0.5 }} /> {obj.employeeContact}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2, flexDirection: 'row', gap: 2 }}>
                  <Typography sx={{ alignContent: 'center', width: '90px', textAlign: 'start' }} variant="body2" color="text.secondary">Reference</Typography>
                  <Typography alignContent={'center'} >{obj.reference}</Typography>
                </Box>

                <Box display="flex" gap={2} mt={3}>
                  <Button
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    component="a"
                    href={obj.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    Certificate
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<BadgeIcon />}
                    component="a"
                    href={obj.idProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    ID Proof
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        {!flag ? (
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={() => setFlag(true)}
              sx={{ px: 4, py: 1.5 }}
            >
              Update Employee Details
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleUpdate}>
            <Typography variant="h6" gutterBottom mb={3}>
              Update Employee Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    inputRef={statusRef}
                    defaultValue={obj.status || ""}
                    label="Status"
                    fullWidth
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  inputRef={resignRef}
                  type="date"
                  label="Resign Date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={obj.resignedAt?.slice(0, 10)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  inputRef={incrementRef}
                  type="date"
                  label="Increment Due Date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  inputRef={increementAmountRef}
                  label="Increement Amount (in Rs)"
                // defaultValue={obj.remarks || ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  inputRef={newCTCRef}
                  label="New CTC"
                // defaultValue={obj.remarks || ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  inputRef={newDesignationRef}
                  label="New Designation"
                // defaultValue={obj.remarks || ""}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  inputRef={remarksRef}
                  label="Remarks"
                  defaultValue={obj.remarks || ""}
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => setFlag(false)}
                  sx={{ px: 4 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 4 }}
                >
                  Submit Update
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Box>
  );
}

export default EmployeeDetail;