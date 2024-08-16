import React, { useState, useEffect } from "react";
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
  const repOptions = [1, 2, 3, 4, 5, 10];
  useEffect(() => {
    function loading() {
      if (!props.allEntries || !props.title) {
        return <div>Loading...</div>; // Or some loading indicator
      }
    }
    loading();
  }, [props.allEntries]);


  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredEntries = selectedCategory
    ? props.allEntries.filter((p) => p.reps === selectedCategory)
    : props.allEntries;

  return (
    <div>
      <div>
        <h1>Organized</h1>
        <ul>
          {repOptions.map((repOpt) => (
            <li key={repOpt}>
              <a
                className="link view-by"
                href="#"
                onClick={() => setSelectedCategory(repOpt)}
              >
                {repOpt}
              </a>
            </li>
          ))}
        </ul>
        <div>
          {filteredEntries?.map((entry, index) => {
            return (
              <Col key={index} md="6" lg="4">
                <Link to={`/single-entry/${entry._id}`}>
                  <div key={index}>
                    <Card
                      outline
                      style={{
                        width: "18rem",
                      }}
                    >
                      <CardBody>
                        <CardTitle class="text-2xl font-bold">
                          {entry.weight} lbs
                        </CardTitle>
                        <p>{entry.reps} rep</p>
                        <CardSubtitle>{entry.date}</CardSubtitle>
                      </CardBody>
                    </Card>
                  </div>
                </Link>
              </Col>
            );
          })} 
        </div>
      </div>

      {/* <Container fluid="sm">
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
                        <CardTitle class="text-2xl font-bold">
                          {ent.weight} lbs
                        </CardTitle>
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
      </Container> */}
    </div>
  );
};

export default CatEntries;
