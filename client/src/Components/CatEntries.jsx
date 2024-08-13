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
                      <CardTitle tag="h5">{ent.weight} lbs</CardTitle>
                      <CardSubtitle tag="h6">{ent.date}</CardSubtitle>
                      <p>NOTES: {ent.notes}</p>
                      <p>REPS: {ent.reps}</p>
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
