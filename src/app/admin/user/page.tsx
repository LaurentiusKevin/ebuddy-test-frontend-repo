"use client";

import { User, UserCreateDto, UserUpdateDto } from "@/apis/user";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useUser } from "@/hooks/useUser";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  Grid2,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function UserPage() {
  const { fetchUsers, createUser, updateUser, loading, error } = useUser();
  const [rows, setRows] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<
    User | UserUpdateDto | UserCreateDto
  >();
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleFetchUsers = async () => {
    try {
      const data = await fetchUsers();
      setRows(data as User[]);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      setSelectedUser(undefined);
    }
    setisDrawerOpen(!isDrawerOpen);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    toggleDrawer();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (selectedUser?.id) {
        await updateUser(selectedUser as UserUpdateDto);
      } else {
        await createUser(selectedUser as UserCreateDto);
      }

      toggleDrawer();
      showSnackbar("User updated", "success");
      handleFetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
      showSnackbar("Failed to update user", "error");
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" sx={{ marginY: 4 }}>
        <Typography variant="h5" fontWeight={600}>
          Users
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            toggleDrawer();
          }}
        >
          Create
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell rowSpan={2}>Table empty</TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      handleSelectUser(row);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer anchor={"right"} open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, marginY: 10, marginX: 4 }}>
          <Typography variant="h6">
            {selectedUser?.id !== undefined ? "Edit" : "Create"} User
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ marginTop: 3 }}>
              <Grid2 container spacing={2} columns={1}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  size="medium"
                  defaultValue={selectedUser?.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="medium"
                  defaultValue={selectedUser?.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  size="medium"
                  defaultValue={selectedUser?.password}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid2>
              <Grid2 container spacing={1} columns={1} sx={{ marginTop: 3 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
                {selectedUser?.id !== undefined && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    fullWidth
                  >
                    Delete
                  </Button>
                )}
              </Grid2>
            </FormControl>
          </form>
        </Box>
      </Drawer>
    </Box>
  );
}
