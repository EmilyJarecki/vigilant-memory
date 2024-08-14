import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  CardSubtitle,
  Button
} from "reactstrap";

const CatEntries = (props) => {
 if (!props.allEntries || !props.title) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return (
    <div>
      <Container fluid="sm">
        <Row>
          {props.allEntries?.map((ent) => {
            return (
              <Col key={ent._id} md="6" lg="4">
              <Link to={`/single-entry/${ent._id}`}>
                <div key={ent._id}>
                  <Card
                    outline
                    style={{
                      width: "18rem",
                    }}
                  >
                    <CardBody>
                      <CardTitle class="text-2xl font-bold">{ent.weight} lbs</CardTitle>
                      <p>{ent.reps} rep</p>
                      <CardSubtitle>{ent.date}</CardSubtitle>
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

export default CatEntries;
