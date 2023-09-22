import React from "react";
import {
  Stack,
  Box,
  Button,
  TextField,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
  // Chip,
  // OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useCreatePostMutation } from "../app/services/postApi";
import { createPost } from "../app/features/postSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const CreatePostPage = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [createPostMutation, { isLoading }] = useCreatePostMutation();

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setTags(typeof value === "string" ? value.split(",") : value);
  // };

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  // const [tags, setTags] = React.useState([]);
  const [cover, setCover] = React.useState(null);

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      var files = e.target.files;
      if (files[0]) setCover(files[0]);
    };
    input.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !cover) {
      alert("Please fill all the fields");
      return;
    }
    if (!cover.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", description);
    // formData.append("tags", tags);
    formData.append("cover", cover);

    createPostMutation(formData)
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(createPost(data?.post));
        setTitle("");
        setDescription("");
        // setTags([]);
        setCover(null);
        toast.success("Post created successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message || "Something went wrong");
      });
  };

  return (
    <>
      {isLoading && (
        <>
          {console.log("loading")}
          <Loader />
        </>
      )}
      <Box
        component={"form"}
        as={"form"}
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box sx={{ width: "100%", pt: 4 }}>
          <div
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              color: "#ccc",
              fontSize: "2rem",
              fontWeight: "bold",
              backgroundImage: `url(${
                cover ? URL.createObjectURL(cover) : ""
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={handleUploadClick}
          >
            {cover ? "" : "Upload Cover Image"}
          </div>
        </Box>

        <Box sx={{ width: "100%", padding: "0 8px" }}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              sx={{ fontSize: "2rem" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div
              data-color-mode={theme.palette.mode === "dark" ? "dark" : "light"}
            >
              <MarkdownEditor
                height={320}
                className="wmde-markdown-var"
                value={description}
                onChange={(value) => setDescription(value)}
                placeholder={"Description..."}
              />
            </div>
          </Stack>
        </Box>

        {/* <Box sx={{ width: "100%", padding: "0 8px" }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={tags}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, tags, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}

        <Box sx={{ width: "100%", padding: "0 8px" }}>
          <Button type="submit" variant="contained">
            Create Post
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreatePostPage;
