import React, { useEffect, useState} from "react";
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
import { Link } from "react-router-dom";

const Lift = () => {
  const [entry, setEntry] = useState([]);

  const token = getUserToken();
  const URL = "http://localhost:4000/";

  useEffect(() => {
    const getLiftEntries = async () => {
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
    getLiftEntries();
  }, [token]);

  return (
    <div>
      <Container fluid="sm">
        <Row>
          {entry?.map((liftEntry) => {
            return (
              <Col key={liftEntry._id} md="6" lg="4">
              <Link to={`/entry/${liftEntry._id}`}>
                <div key={liftEntry._id}>
                  <Card
                    outline
                    style={{
                      width: "18rem",
                    }}
                  >
                    <CardBody>
                      <CardTitle tag="h5">{liftEntry.lift}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {liftEntry.weight}
                      </CardSubtitle>
                      <CardText>{liftEntry.notes}</CardText>
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

export default Lift;
