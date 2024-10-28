import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import AlertDialog from "./AlertDialog";
import CloseIcon from "@mui/icons-material/Close";
import { cancelAppointment, fetchAppointments } from "../services/appointments"; // Updated import statement
import toast from "react-hot-toast";
import { AppointmentContext } from "../contexts/AppointmentContext";

const CancelAppointment = ({ appointment }) => {
  const [open, setOpen] = useState(false);
  const { setAppointments } = useContext(AppointmentContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelAppointment = () => {
    cancelAppointment(appointment.id, {
      ...appointment,
      status: "Cancelled",
    })
      .then(() => {
        toast.success("Appointment cancelled successfully");
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
      .catch(() => {
        toast.error("Couldn't cancel appointment, please try again");
      });
  };

  return (
    <>
      <Tooltip
        title={
          appointment.status.toLowerCase() === "cancelled"
            ? "Not Allowed"
            : "Cancel Appointment"
        }
      >
        <span>
          <IconButton
            color={
              appointment.status.toLowerCase() === "cancelled"
                ? "warning"
                : "error"
            }
            aria-label="expand row"
            size="small"
            onClick={handleClickOpen}
            disabled={appointment.status.toLowerCase() === "cancelled"}
          >
            <DoNotDisturbIcon />
            <p className="red"></p>
          </IconButton>
        </span>
      </Tooltip>
      <AlertDialog
        title="Cancel Appointment"
        open={open}
        handleClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this appointment?
          </DialogContentText>
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
              onClick={handleCancelAppointment}
              autoFocus
            >
              Yes, I'm sure
            </Button>
          </div>
        </DialogContent>
      </AlertDialog>
    </>
  );
};

export default CancelAppointment;
