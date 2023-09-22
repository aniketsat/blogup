import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        // make the loader appear in the center of the screen
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
};

export default Loader;
