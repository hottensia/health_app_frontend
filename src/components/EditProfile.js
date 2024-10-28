import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialog from "./AlertDialog";
import CloseIcon from "@mui/icons-material/Close";
import {
  fetchAppointments,
  updateAppointment,
} from "../services/appointments"; // Keep this for appointment-related functions
import {
  updateUserProfile,
  getUserProfile,
} from "../services/users"; // Corrected import for user profile functions
import toast from "react-hot-toast";
import { AppointmentContext } from "../contexts/AppointmentContext";
import { fileToBase64 } from "../services/helpers";
import { AuthContext } from "../contexts/AuthContext";

const EditProfile = ({ profile }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(profile.email);
  const [fullName, setFullName] = useState(profile.full_name);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {}, [image]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      full_name: fullName,
    };

    if (image) {
      data.image_url = await fileToBase64(image);
    }

    try {
      const response = await updateUserProfile(profile.id, data);
      console.log("response.data", response.data);
      setAuthState({ ...authState, user: response.data });
      toast.success("Profile updated");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Button
        color="success"
        variant="outlined"
        onClick={handleClickOpen}
        autoFocus
        startIcon={<EditIcon />}
      >
        Update Profile
      </Button>
      <AlertDialog
        title="Edit Your Profile Information"
        open={open}
        handleClose={handleClose}
      >
        <DialogContent>
          <form
            className="p-4 rounded-md mt-4 border-gray-300 border-[1px] space-y-4 "
            onSubmit={handleSubmit} // Handle form submission
          >
            <div className="flex flex-col">
              <label htmlFor="fullName">Full Name </label>
              <input
                className="border-gray-300 border-[1px] p-2 rounded-md"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email Address </label>
              <input
                className="border-gray-300 border-[1px] p-2 rounded-md"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image">Profile Photo </label>
              <input
                className="border-gray-300 border-[1px] p-2 rounded-md"
                name="image"
                type="file"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                  setPreview(URL.createObjectURL(event.target.files[0]));
                }}
                required
              />
              {preview && (
                <div className="py-2 items-center grid place-items-center ">
                  <img
                    className="object-cover"
                    height={200}
                    width={200}
                    src={preview}
                    alt={profile.full_name}
                  />
                </div>
              )}
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
              Cancel
            </Button>
            <Button
              type="submit"
              color="success"
              variant="outlined"
              onClick={handleSubmit}
              autoFocus
            >
              Confirm Changes
            </Button>
          </div>
        </DialogContent>
      </AlertDialog>
    </>
  );
};

export default EditProfile;
