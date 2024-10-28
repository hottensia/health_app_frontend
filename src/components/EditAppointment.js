import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialog from "./AlertDialog";
import CloseIcon from "@mui/icons-material/Close";
import AppointmentForm from "./AppointmentForm";
import { fetchAppointments, updateAppointment } from "../services/appointments"; // Updated import statement
import toast from "react-hot-toast";
import { AppointmentContext } from "../contexts/AppointmentContext";

const EditAppointment = ({ appointment }) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(appointment.notes);
  const [duration, setDuration] = useState(appointment.duration);
  const [isLoading, setIsLoading] = useState(false);
  const { setAppointments } = useContext(AppointmentContext);
  const [time, setTime] = useState(() => {
    if (appointment && appointment.date_time) {
      const appointmentDate = new Date(appointment.date_time);
      appointmentDate.setMinutes(
        appointmentDate.getMinutes() - appointmentDate.getTimezoneOffset()
      );
      return appointmentDate.toISOString().split("T")[0];
    }
    return "";
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formattedDate = new Date(time);
    const data = {
      date_time: time,
      duration,
      notes,
      patient_id: appointment.patient_id,
      therapist_id: appointment.id,
    };
    updateAppointment(appointment.id, data)
      .then(() => {
        toast.success("Appointment updated");
        setOpen(false);
        fetchAppointments()
          .then((res) => {
            console.log("res.data", res.data);
            setAppointments(res.data);
          })
          .catch((err) => {
            toast.error("Couldn't fetch appointments");
          });
      })
      .catch((err) => {
        console.log("err", err.response);
        toast.error("Couldn't update appointment");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Tooltip
        title={
          appointment.status.toLowerCase() === "cancelled"
            ? "Not Allowed"
            : "Edit Appointment"
        }
      >
        <span>
          <IconButton
            color={
              appointment.status.toLowerCase() === "cancelled"
                ? "warning"
                : "primary"
            }
            aria-label="expand row"
            size="small"
            onClick={handleClickOpen}
            disabled={appointment.status.toLowerCase() === "cancelled"}
          >
            <EditIcon />
          </IconButton>
        </span>
      </Tooltip>
      <AlertDialog
        title={`Update Appointment with ${appointment.therapist.name}`}
        open={open}
        handleClose={handleClose}
      >
        <DialogContent>
          <form
            className="p-4 rounded-md mt-4 border-gray-300 border-[1px] space-y-4 "
            onSubmit={handleSubmit} 
          >
            <div className="flex flex-col">
              <label htmlFor="appointment">Select an appointment time </label>
              <input
                className="border-gray-300 border-[1px] p-2 rounded-md"
                name="appointment"
                value={time}
                type="date"
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="duration">Duration in Minutes </label>
              <input
                className="border-gray-300 border-[1px] p-2 rounded-md"
                name="duration"
                type="number"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="notes">Notes </label>
              <textarea
                className="border-gray-300 border-[1px] p-2 rounded-md"
                name="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>
          </form>
          <div
            className="mt-4 justify-between flex"
            sx={{ justifyContent: "space-between" }}
          >
            <Button
              startIcon={<CloseIcon />}
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              No
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={handleSubmit} 
              autoFocus
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </AlertDialog>
    </>
  );
};

export default EditAppointment;
