import React, { useEffect } from "react";
import { useState } from "react";
import { getUserToken } from "../utils/authToken";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardImg,
  Container,
  Row,
  Col,
} from "reactstrap";

const Fruit = () => {
  const [entry, setEntry] = useState([]);

  const token = getUserToken();
  const URL = "http://localhost:4000/";

  useEffect(() => {
    const getFruitEntries = async () => {
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
        const allEntries = await response.json();
        setEntry(allEntries);
      } catch (error) {
        console.error(error);
      }
    };
    getFruitEntries();
  }, [token]);

  return (
    <div>
      <Container fluid="sm">
        <Row>
          {entry?.map((fruitEntry) => {
            return (
              <Col md="6" lg="4">
                <div key={fruitEntry._id}>
                  <Card
                    outline
                    style={{
                      width: "18rem",
                    }}
                  >
                    <CardImg
                      alt={fruitEntry.subFruit}
                      src={fruitEntry.image}
                      fluid="true"
                      roundedcircle="true"
                      style={{ width: "100%", height: "150px", objectFit: "cover"}}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{fruitEntry.fruit}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {fruitEntry.season}
                      </CardSubtitle>
                      <CardText>{fruitEntry.explanation}</CardText>
                      <Button>Read More</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Fruit;
