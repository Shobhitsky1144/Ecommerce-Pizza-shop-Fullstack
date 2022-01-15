import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Table, Button } from "react-bootstrap";
import {
  getAllUsers,
  deleteUser,
  ChangeUserType,
} from "../../redux/actions/userAction";
import Loader from "./../Loader";
import Error from "./../Error";

const UserList = () => {
  const userState = useSelector((state) => state.getAllUsersReducer);
  const { loading, error, users } = userState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div>
      <h1>User List</h1>
      {loading && <Loader />}
      {error && <Error error="Error While Fetching Users" />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <AiFillDelete
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {
                      dispatch(deleteUser(user._id));
                    }}
                  />
                </td>
                <td>
                  {console.log("user", user)}{" "}
                  {user.isAdmin ? (
                    <h6 className="text-success">Admin</h6>
                  ) : (
                    <>
                      <Button
                        className="btn-danger"
                        onClick={() => {
                          dispatch(ChangeUserType(user._id));
                        }}
                      >
                        Make Admin
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
