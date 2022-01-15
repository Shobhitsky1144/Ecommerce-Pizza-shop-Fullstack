import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Filters from "../components/Filters";
import Pizza from "../components/Pizza";
import { getAllPizzas } from "../redux/actions/pizzaAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const pizzastate = useSelector((state) => state.getAllPizzaReducer);
  const { loading, pizzas, error } = pizzastate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <>
      <Container>
        {loading ? (
          <h1>Loading ...</h1>
        ) : error ? (
          <h1>Error while fetching pizzas</h1>
        ) : (
          <Row>
            <Filters />
            {pizzas.map((pizza) => {
              return (
                <Col md={4} key={pizza._id}>
                  <Pizza pizza={pizza} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
