import React, { useEffect } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import AddNewPizza from "../components/Admin/AddNewPizza";
import EditPizza from "../components/Admin/EditPizza";
import OrderList from "../components/Admin/OrderList";
import PizzasList from "../components/Admin/PizzasList";
import UserList from "../components/Admin/UserList";

const AdminScreen = () => {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.loginUserReducer);

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null || !currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center bg-dark text-light p-2">Admin Panel</h1>
          <Col md={2}>
            <ButtonGroup vertical style={{ minHeight: "400px" }}>
              <Button onClick={() => history.push("/admin/userlist")}>
                All Users
              </Button>
              <Button onClick={() => history.push("/admin/pizzalist")}>
                All Pizzas
              </Button>

              <Button onClick={() => history.push("/admin/addnewpizza")}>
                Add New Pizza
              </Button>
              <Button onClick={() => history.push("/admin/orderlist")}>
                All Orders
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={10}>
            <Switch>
              <Route exact path="/admin" component={UserList}></Route>
              <Route exact path="/admin/userlist" component={UserList}></Route>
              <Route
                exact
                path="/admin/editpizza/:pizzaId"
                component={EditPizza}
              ></Route>
              <Route
                exact
                path="/admin/pizzalist"
                component={PizzasList}
              ></Route>
              <Route
                exact
                path="/admin/addnewpizza"
                component={AddNewPizza}
              ></Route>
              <Route
                exact
                path="/admin/orderlist"
                component={OrderList}
              ></Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminScreen;
