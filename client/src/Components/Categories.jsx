import React, { useEffect, useState} from "react";
import { getUserToken } from "../utils/authToken";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState([]);

  const token = getUserToken();
  const URL = "http://localhost:4000/category";

  useEffect(() => {
    const getCategories = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      };

      try {
        const response = await fetch(URL, requestOptions);
        const allCategories = await response.json();
        setCategory(allCategories);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, [token]);

  return (
    <div>
      <Container fluid="sm">
        <Row>
          {category?.map((cat) => {
            return (
              <Col key={cat._id} md="6" lg="4">
              <Link to={`/entry/${cat._id}`}>
                <div key={cat._id}>
                  <Card
                    outline
                    style={{
                      width: "18rem",
                    }}
                  >
                    <CardBody>
                      <CardTitle tag="h5">{cat.name}</CardTitle>
                    </CardBody>
                  </Card>
                </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Categories;
